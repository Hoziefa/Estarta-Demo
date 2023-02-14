import React, {useCallback, useState} from "react";
import {Button, Col, DatePicker, Input, Row, Select, Typography} from "antd";

import "./LoggerHeader.scss";

export interface IBaseOption {
  label: string;
  value: string;
}

interface ILoggerHeaderProps {
  applicationTypes: IBaseOption[];
  actionTypes: IBaseOption[];
  onSearchLogger: (filters: object) => React.MouseEventHandler;
  onClearLogger: () => void;
}

export const LoggerHeader: React.FC<ILoggerHeaderProps> = (props) => {
  const [logId, setLogId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<string | null>(null);
  const [appType, setAppType] = useState<string | null>(null);
  const [appId, setAppId] = useState<string | null>(null);
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
  }, [props.onClearLogger]);

  return (
    <Row className="logger-header" gutter={[24, 12]} align="bottom">
      <Col className="logger-header__group" md={3}>
        <Typography.Text>Log ID</Typography.Text>

        <Input placeholder="e.g. 920345" value={logId!} onChange={({target: {value}}) => setLogId(value)} />
      </Col>

      <Col className="logger-header__group" md={3}>
        <Typography.Text>Action Type</Typography.Text>

        <Select options={props.actionTypes} value={actionType} onChange={setActionType} />
      </Col>

      <Col className="logger-header__group" md={3}>
        <Typography.Text>Application Type</Typography.Text>

        <Select options={props.applicationTypes} value={appType} onChange={setAppType} />
      </Col>

      <Col className="logger-header__group" md={3}>
        <Typography.Text>From Date</Typography.Text>

        <DatePicker value={fromDate} onChange={setFromDate} />
      </Col>

      <Col className="logger-header__group" md={3}>
        <Typography.Text>To Date</Typography.Text>

        <DatePicker value={toDate} onChange={setToDate} />
      </Col>

      <Col className="logger-header__group" md={3}>
        <Typography.Text>Application ID</Typography.Text>

        <Input placeholder="e.g. 219841/2021" value={appId!} onChange={({target: {value}}) => setAppId(value)} />
      </Col>

      <Col md={6} className="logger-header__actions">
        <Button
          type="primary"
          className="logger-header__search-action"
          onClick={props.onSearchLogger({logId, actionType, appType, appId, fromDate, toDate})}
        >
          Search Logger
        </Button>

        <Button
          className="logger-header__clear-action"
          type="primary"
          ghost
          onClick={onClearFilters}
          title="Clear logger filters"
        >
          &#x21bb;
        </Button>
      </Col>
    </Row>
  );
};
