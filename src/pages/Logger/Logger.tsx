import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useQuery} from "react-query";
import moment from "moment";
import {message, Table, TablePaginationConfig, Typography} from "antd";

import {getLogs, ILog} from "../../api/logger";
import LoggerHeader, {IBaseOption} from "./LoggerHeader";

import "./Logger.scss";

export interface IFilters {
  logId: string | null;
  actionType: string | null;
  appType: string | null;
  fromDate: string | null;
  toDate: string | null;
  appId: string | null;
}

const PAGE_SIZE = 10;

const Logger: React.FC = () => {
  const [logs, setLogs] = useState<ILog[]>([]);

  const {data, isLoading, isSuccess, isError, error} = useQuery("logger", getLogs, {staleTime: Infinity});

  const paginationConfig = useMemo((): TablePaginationConfig => ({
    pageSize: PAGE_SIZE,
    position: ["bottomCenter"],
    showSizeChanger: false,
  }), []);

  const applicationTypes = useMemo((): IBaseOption[] => {
    if (!data) return [];

    const appTypes = [...new Set(data.map(({applicationType}) => applicationType))];

    return appTypes.filter((applicationType) => !!applicationType).map((applicationType): IBaseOption => ({
      label: applicationType,
      value: applicationType,
    }));
  }, [data]);

  const actionTypes = useMemo((): IBaseOption[] => {
    if (!data) return [];

    const actionTypes = [...new Set(data.map(({actionType}) => actionType))];

    return actionTypes.filter((applicationType) => !!applicationType).map((applicationType): IBaseOption => ({
      label: applicationType,
      value: applicationType,
    }));
  }, [data]);

  const onSearchLogger = useCallback((filters: IFilters) => {
    if (Object.values(filters).every((value) => !value)) return;

    const filteredLogs = data!.filter((log) => {
      const allValid: boolean[] = [];

      if (filters.fromDate && !filters.toDate) {
        allValid.push(moment(log.creationTimestamp).isSame(filters.fromDate.toString(), "date"));
      }

      if (filters.fromDate && filters.toDate) {
        allValid.push(moment(log.creationTimestamp).isBetween(filters.fromDate.toString(), filters.toDate.toString(), "date"));
      }

      if (filters.logId) allValid.push(log.logId.toString().startsWith(filters.logId));

      if (filters.appId) allValid.push(log.applicationId?.toString().startsWith(filters.appId));

      if (filters.actionType) allValid.push(filters.actionType === log.actionType);

      if (filters.appType) allValid.push(filters.appType === log.applicationType);

      return allValid.every(Boolean);
    });

    setLogs(filteredLogs);
  }, [data]);

  const onClearLogger = useCallback(() => {
    if (!data) return;

    setLogs(data);
  }, [data]);

  useEffect(() => {
    if (isSuccess) setLogs(data!);
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) message.error((error as Error).message);
  }, [isError, error]);

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

export default Logger;
