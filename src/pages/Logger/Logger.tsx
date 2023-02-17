import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {useQuery} from "react-query";
import {message, Table, TablePaginationConfig, Typography} from "antd";
import moment from "moment";

import LoggerHeader, {IBaseOption, IFilters} from "./LoggerHeader";
import {getLogs, ILog} from "../../api/logger";

import "./Logger.scss";

const PAGE_SIZE = 10;

const Logger: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const onSearchLogger = useCallback((filters: Map<keyof IFilters, string>) => {
    const filteredLogs = data!.filter((log) => {
      const allValid: boolean[] = [];

      if (filters.get("fromDate") && !filters.get("toDate")) {
        allValid.push(moment(log.creationTimestamp).isSame(filters.get("fromDate"), "date"));
      }

      if (filters.get("fromDate") && filters.get("toDate")) {
        allValid.push(moment(log.creationTimestamp).isBetween(filters.get("fromDate"), filters.get("toDate"), "date"));
      }

      if (filters.get("logId")) allValid.push(log.logId.toString().startsWith(filters.get("logId")!));

      if (filters.get("appId")) allValid.push(log.applicationId?.toString().startsWith(filters.get("appId")!));

      if (filters.get("actionType")) allValid.push(filters.get("actionType") === log.actionType);

      if (filters.get("appType")) allValid.push(filters.get("appType") === log.applicationType);

      return allValid.every(Boolean);
    });

    // setSearchParams(filters.entries());
    setLogs(filteredLogs);
  }, [data, setSearchParams]);

  const onClearLogger = useCallback(() => {
    if (!data) return;

    setSearchParams({});
    setLogs(data);
  }, [data, setSearchParams]);

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
          searchParams={searchParams}
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
