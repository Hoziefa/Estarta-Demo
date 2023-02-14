import React, {useCallback, useEffect, useMemo, useState} from "react";

import "./Logger.scss";
import {Table, TablePaginationConfig, Typography} from "antd";
import {useQuery} from "react-query";
import {getLogs, ILog} from "../../api/logger";
import {IBaseOption, LoggerHeader} from "./LoggerHeader/LoggerHeader";
import moment from "moment";

export interface IFilters {
  logId?: number;
  actionType?: string;
  appType?: string;
  fromDate?: string;
  toDate?: string;
  appId?: number;
}

const PAGE_SIZE = 10;

export const Logger: React.FC = () => {
  const [logs, setLogs] = useState<ILog[]>([]);

  const {isLoading, data, isSuccess} = useQuery("logger", getLogs, {staleTime: Infinity});

  const paginationConfig = useMemo((): TablePaginationConfig => ({
    pageSize: PAGE_SIZE,
    position: ["bottomCenter"],
    showSizeChanger: false,
  }), []);

  const applicationTypes = useMemo((): IBaseOption[] => {
    if (!data) return [];

    const appTypes = [...new Set(data.data.result.auditLog.map(({applicationType}) => applicationType))];

    return appTypes.filter((applicationType) => !!applicationType).map((applicationType): IBaseOption => ({
      label: applicationType,
      value: applicationType,
    }));
  }, [data]);

  const actionTypes = useMemo((): IBaseOption[] => {
    if (!data) return [];

    const actionTypes = [...new Set(data.data.result.auditLog.map(({actionType}) => actionType))];

    return actionTypes.filter((applicationType) => !!applicationType).map((applicationType): IBaseOption => ({
      label: applicationType,
      value: applicationType,
    }));
  }, [data]);

  const onSearchLogger = useCallback((filters: IFilters): React.MouseEventHandler => () => {
    if (Object.values(filters).every((value) => !value)) return;

    const filteredLogs = data!.data.result.auditLog.filter((log) => {
      let isValid = false;

      if (filters.fromDate && filters.toDate) {
        isValid = moment(log.creationTimestamp).isBetween(filters.fromDate, filters.toDate);
      }

      if (filters.logId && filters.logId === log.logId) isValid = true;

      if (filters.appId && filters.appId === log.applicationId) isValid = true;

      if (filters.actionType && filters.actionType === log.actionType) isValid = true;

      if (filters.appType && filters.appType === log.applicationType) isValid = true;

      return isValid;
    });

    setLogs(filteredLogs);
  }, [data]);

  const onClearLogger = useCallback(() => {
    if (!data) return;

    setLogs(data.data.result.auditLog);
  }, [data]);

  useEffect(() => {
    if (isSuccess) setLogs(data.data.result.auditLog);
  }, [data?.data.result.auditLog, isSuccess]);

  return (
    <Table
      rowKey="logId"
      className="logger-table"
      dataSource={logs}
      loading={isLoading}
      pagination={paginationConfig}
      caption={(
        <LoggerHeader
          actionTypes={actionTypes}
          applicationTypes={applicationTypes}
          onSearchLogger={onSearchLogger}
          onClearLogger={onClearLogger}
        />
      )}
    >
      <Table.Column
        title="Log ID"
        sorter={(a: ILog, b: ILog) => a.logId - b.logId}
        render={(_, record: ILog) => <Typography.Text>{record.logId}</Typography.Text>}
      />

      <Table.Column
        title="Application Type"
        sorter={(a: ILog, b: ILog): number => a.applicationType?.localeCompare(b.applicationType)}
        render={(_, record: ILog) => <Typography.Text>{record.applicationType}</Typography.Text>}
      />

      <Table.Column
        title="Application ID"
        sorter={(a: ILog, b: ILog) => a.applicationId - b.applicationId}
        render={(_, record: ILog) => <Typography.Text>{record.applicationId}</Typography.Text>}
      />

      <Table.Column
        title="Action"
        sorter={(a: ILog, b: ILog): number => a.actionType.localeCompare(b.actionType)}
        render={(_, record: ILog) => <Typography.Text>{record.actionType}</Typography.Text>}
      />

      <Table.Column
        title="Action Details"
        render={() => <Typography.Text className="logger-table__action-details">-/-</Typography.Text>}
      />

      <Table.Column
        title="Date : Time"
        sorter={(a: ILog, b: ILog): number => a.creationTimestamp.localeCompare(b.creationTimestamp)}
        render={(_, record: ILog) => <Typography.Text>{record.creationTimestamp}</Typography.Text>}
      />
    </Table>
  );
};
