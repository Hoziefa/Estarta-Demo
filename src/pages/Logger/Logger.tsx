import React, { useMemo } from "react";

import "./Logger.scss";
import { Table, TablePaginationConfig, Typography } from "antd";
import { useQuery } from "react-query";
import { getLogs, ILog } from "../../api/logger";

const PAGE_SIZE = 10;

export const Logger: React.FC = (): JSX.Element => {
  const { isLoading, data: logs } = useQuery("logs", getLogs);

  const paginationConfig = useMemo((): TablePaginationConfig => ({
    pageSize: PAGE_SIZE,
    position: ["bottomCenter"],
    showSizeChanger: false,
  }), []);

  return (
    <Table
      rowKey="logId"
      className="logger-table"
      dataSource={ logs?.data.result.auditLog! }
      loading={ isLoading }
      pagination={ paginationConfig }
    >
      <Table.Column
        title="Log ID"
        sorter={ (a: ILog, b: ILog): number => a.logId - b.logId }
        render={ (_, record: ILog): JSX.Element => <Typography.Text>{ record.logId }</Typography.Text> }
      />

      <Table.Column
        title="Application Type"
        sorter={ (a: ILog, b: ILog): number => a.applicationType?.localeCompare(b.applicationType) }
        render={ (_, record: ILog): JSX.Element => <Typography.Text>{ record.applicationType }</Typography.Text> }
      />

      <Table.Column
        title="Application ID"
        sorter={ (a: ILog, b: ILog): number => a.applicationId - b.applicationId }
        render={ (_, record: ILog): JSX.Element => <Typography.Text>{ record.applicationId }</Typography.Text> }
      />

      <Table.Column
        title="Action"
        sorter={ (a: ILog, b: ILog): number => a.actionType.localeCompare(b.actionType) }
        render={ (_, record: ILog): JSX.Element => <Typography.Text>{ record.actionType }</Typography.Text> }
      />

      <Table.Column
        title="Action Details"
        render={ (): JSX.Element => <Typography.Text>-/-</Typography.Text> }
      />

      <Table.Column
        title="Date : Time"
        sorter={ (a: ILog, b: ILog): number => a.creationTimestamp.localeCompare(b.creationTimestamp) }
        render={ (_, record: ILog): JSX.Element => <Typography.Text>{ record.creationTimestamp }</Typography.Text> }
      />
    </Table>
  );
};
