import React, {useCallback, useState} from "react";
import {Button, Col, DatePicker, Input, Row, Select, Typography} from "antd";
import {IFilters} from "../Logger";

import "./LoggerHeader.scss";

export interface IBaseOption {
  label: string;
  value: string;
}

export interface ILoggerHeaderProps {
  applicationTypes: IBaseOption[];
  actionTypes: IBaseOption[];
  onSearchLogger: (filters: IFilters) => void;
  onClearLogger: () => void;
}

const LoggerHeader: React.FC<ILoggerHeaderProps> = (props) => {
  const [logId, setLogId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<string | null>(null);
  const [appType, setAppType] = useState<string | null>(null);
  const [appId, setAppId] = useState<number | null>(null);
  const [fromDate, setFromDate] = useState<any | null>(null);
  const [toDate, setToDate] = useState<any | null>(null);

  const onClearFilters = useCallback(() => {
    setLogId(null);
    setActionType(null);
    setAppType(null);
    setAppId(null);
    setFromDate(null);
    setToDate(null);

    props.onClearLogger();
  }, [props]);

  return (
    <Row className="logger-header" gutter={[24, 12]} align="bottom">
      <Col md={3}>
        <Typography.Text>Log ID</Typography.Text>

        <Input placeholder="e.g. 920345" value={logId!} onChange={({target: {value}}) => setLogId(+value)} />
      </Col>

      <Col md={3}>
        <Typography.Text>Action Type</Typography.Text>

        <Select data-testid="action-type" options={props.actionTypes} value={actionType} onChange={setActionType} />
      </Col>

      <Col md={3}>
        <Typography.Text>Application Type</Typography.Text>

        <Select data-testid="application-type" options={props.applicationTypes} value={appType} onChange={setAppType} />
      </Col>

      <Col md={3}>
        <Typography.Text>From Date</Typography.Text>

        <DatePicker value={fromDate} onChange={setFromDate} />
      </Col>

      <Col md={3}>
        <Typography.Text>To Date</Typography.Text>

        <DatePicker value={toDate} onChange={setToDate} />
      </Col>

      <Col md={3}>
        <Typography.Text>Application ID</Typography.Text>

        <Input placeholder="e.g. 219841" value={appId!} onChange={({target: {value}}) => setAppId(+value)} />
      </Col>

      <Col md={6} className="logger-header__actions">
        <Button
          type="primary"
          className="logger-header__search-action"
          onClick={() => props.onSearchLogger({logId, actionType, appType, appId, fromDate, toDate})}
        >
          Search Logger
        </Button>

        <Button
          className="logger-header__clear-action"
          type="primary"
          onClick={onClearFilters}
          title="Clear logger filters"
        >
          &#x21bb;
        </Button>
      </Col>
    </Row>
  );
};

export default LoggerHeader;
