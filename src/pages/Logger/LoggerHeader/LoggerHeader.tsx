import React from "react";
import { Button, Col, DatePicker, Input, Row, Select, Typography } from "antd";

import "./LoggerHeader.scss";

interface ILoggerHeaderProps {

}

export const LoggerHeader: React.FC<ILoggerHeaderProps> = (): JSX.Element => {
  return (
    <Row className="logger-header" gutter={ [24, 12] } align="bottom">
      <Col className="logger-header__group" md={ 3 }>
        <Typography.Text>Employee Name</Typography.Text>

        <Input placeholder="e.g. Admin.User" />
      </Col>

      <Col className="logger-header__group" md={ 3 }>
        <Typography.Text>Action Type</Typography.Text>

        <Select />
      </Col>

      <Col className="logger-header__group" md={ 3 }>
        <Typography.Text>Application Type</Typography.Text>

        <Select />
      </Col>

      <Col className="logger-header__group" md={ 3 }>
        <Typography.Text>From Date</Typography.Text>

        <DatePicker />
      </Col>

      <Col className="logger-header__group" md={ 3 }>
        <Typography.Text>To Date</Typography.Text>

        <DatePicker />
      </Col>

      <Col className="logger-header__group" md={ 3 }>
        <Typography.Text>Application ID</Typography.Text>

        <Input placeholder="e.g. 219841/2021" />
      </Col>

      <Col md={ 6 }>
        <Button type="primary" block>
          Search Logger
        </Button>
      </Col>
    </Row>
  );
};
