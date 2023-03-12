import React from "react";

jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  const returnOptionSelect = (props: any) => {
    const ReactChildren = require("react");

    const isChildrenElement = props.children?.length > 0 ? ReactChildren.isValidElement(props.children[0]) : false;

    return isChildrenElement ?
      props.children.map((v: any) => {
        return (
          <option
            data-testid={`${v.props["data-testid"] || props["data-testid"]}-${v.props.title || v.props.value}`}
            key={v.props.children}
            value={v.props.title || v.props.value}
            disabled={v.props.disabled && "disabled"}
            // selected={v.props.value === props.value}
          >
            {v.props.title}
          </option>
        );
      }) :
      props.children || props.options?.map((v: any) => {
        return (
          <option
            data-testid={`${props["data-testid"]}-option`}
            key={v.value}
            value={v.value}
            disabled={v.disabled && "disabled"}
            // selected={v.value === props.value}
          >
            {v.label}
          </option>
        );
      });
  };

  const Select = (props: any) => {
    const multiple = ["tags", "multiple"].includes(props.mode);

    return (
      <select
        value={props.value}
        //defaultValue={props.defaultValue}
        multiple={multiple}
        placeholder={props.placeholder}
        disabled={props.disabled}
        data-testid={`${props["data-testid"]}${props.loading ? "-loading" : ""}`}
        className={props.className}
        onChange={(e) =>
          props.onChange && props.onChange(multiple ? Array.from(e.target.selectedOptions).map((option) => option.value) : e.target.value)
        }
      >
        {returnOptionSelect(props)}
      </select>
    );
  };

  Select.Option = ({children, ...otherProps}: any) => <option {...otherProps}>{children}</option>;
  Select.OptGroup = ({children, ...otherProps}: any) => <optgroup {...otherProps}>{children}</optgroup>;

  return {
    __esModule: true,
    ...antd,
    Select,
  };
});
