import React, {useCallback, useMemo, useState} from "react";
import {Button, Col, DatePicker, Input, Row, Select, Typography} from "antd";

import "./LoggerHeader.scss";

export interface IBaseOption {
  label: string;
  value: string;
}

export interface IFilters {
  logId: string;
  actionType: string;
  appType: string;
  fromDate: string;
  toDate: string;
  appId: string;
}

export interface ILoggerHeaderProps {
  applicationTypes: IBaseOption[];
  actionTypes: IBaseOption[];
  searchParams: URLSearchParams;
  onSearchLogger: (filters: IFilters) => void;
  onClearLogger: () => void;
}

const LoggerHeader: React.FC<ILoggerHeaderProps> = (props) => {
  const [logId, setLogId] = useState<string | null>(props.searchParams.get("logId"));
  const [actionType, setActionType] = useState<string | null>(props.searchParams.get("actionType"));
  const [appType, setAppType] = useState<string | null>(props.searchParams.get("appType"));
  const [appId, setAppId] = useState<string | null>(props.searchParams.get("appId"));
  const [fromDate, setFromDate] = useState<any | null>(null);
  const [toDate, setToDate] = useState<any | null>(null);

  const filters = useMemo<IFilters>(() => {
    const filtersMap = {} as IFilters;

    logId && (filtersMap.logId = logId);
    appId && (filtersMap.appId = appId);
    appType && (filtersMap.appType = appType);
    actionType && (filtersMap.actionType = actionType);
    fromDate && (filtersMap.fromDate = fromDate);
    toDate && (filtersMap.toDate = toDate);

    return filtersMap;
  }, [actionType, appId, appType, fromDate, logId, toDate]);

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
    <Row className="logger-header" data-testid="logger-header" gutter={[24, 12]} align="bottom">
      <Col md={3}>
        <Typography.Text>Log ID</Typography.Text>

        <Input placeholder="e.g. 920345" value={logId!} onChange={({target: {value}}) => setLogId(value)} />
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

        <Input placeholder="e.g. 219841" value={appId!} onChange={({target: {value}}) => setAppId(value)} />
      </Col>

      <Col md={6} className="logger-header__actions">
        <Button
          type="primary"
          className="logger-header__search-action"
          onClick={() => Object.keys(filters).length > 0 && props.onSearchLogger(filters)}
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
