import {fireEvent, render, screen} from "@testing-library/react";
import LoggerHeader, {ILoggerHeaderProps} from "./LoggerHeader";

describe("<LoggerHeader /> Test", () => {
  const getLogIdInput = () => screen.getByPlaceholderText<HTMLInputElement>("e.g. 920345");
  const getAppIdInput = () => screen.getByPlaceholderText<HTMLInputElement>("e.g. 219841");
  const getActionTypeInput = () => screen.getAllByRole<HTMLSelectElement>("combobox")[0];
  const getAppTypeInput = () => screen.getAllByRole<HTMLSelectElement>("combobox")[1];
  const getFromDateInput = () => screen.getAllByPlaceholderText<HTMLInputElement>("Select date")[0];
  const getToDateInput = () => screen.getAllByPlaceholderText<HTMLInputElement>("Select date")[1];

  const props: ILoggerHeaderProps = {
    actionTypes: [{label: "ADD_EMPLOYEE", value: "ADD_EMPLOYEE"}, {label: "ADD_EMPLOYEE 2", value: "ADD_EMPLOYEE 2"}],
    applicationTypes: [{label: "ADD_COMPANY", value: "ADD_COMPANY"}],
    onSearchLogger: jest.fn(),
    onClearLogger: jest.fn(),
    searchParams: new URLSearchParams(),
  };

  it("should have the LOG ID input", () => {
    render(<LoggerHeader {...props} />);

    getLogIdInput();
  });

  it("should change the LOG ID input value accordingly when a change occur", () => {
    render(<LoggerHeader {...props} />);

    fireEvent.change(getLogIdInput(), {target: {value: "9950"}});

    screen.getByDisplayValue("9950");
  });

  it("should have the Action-Type select box", () => {
    render(<LoggerHeader {...props} />);

    getActionTypeInput();
  });

  it("should change the selected Action-Type option to the chosen one", () => {
    render(<LoggerHeader {...props} />);

    fireEvent.change(getActionTypeInput(), {target: {value: props.actionTypes[0].value}});

    expect(getActionTypeInput().value).toEqual(props.actionTypes[0].value);
  });

  it("should have the Application-Type select box", () => {
    render(<LoggerHeader {...props} />);

    getAppTypeInput();
  });

  it("should change the selected Application-Type option to the chosen one", () => {
    render(<LoggerHeader {...props} />);

    fireEvent.change(getAppTypeInput(), {target: {value: props.applicationTypes[0].value}});

    expect(getAppTypeInput().value).toEqual(props.applicationTypes[0].value);
  });

  it("should have the Date inputs", () => {
    render(<LoggerHeader {...props} />);

    expect(screen.getAllByPlaceholderText("Select date").length).toEqual(2);
  });

  it("should change the From-Date input value to the selected date", () => {
    render(<LoggerHeader {...props} />);

    fireEvent.change(getFromDateInput(), {target: {value: "25/01/2023"}});

    screen.getByDisplayValue("25/01/2023");
  });

  it("should change the To-Date input value to the selected date", () => {
    render(<LoggerHeader {...props} />);

    fireEvent.change(getToDateInput(), {target: {value: "25/01/2024"}});

    screen.getByDisplayValue("25/01/2024");
  });

  it("should have the APP ID input", () => {
    render(<LoggerHeader {...props} />);

    getLogIdInput();
  });

  it("should change the APP ID input value accordingly when a change occur", () => {
    render(<LoggerHeader {...props} />);

    fireEvent.change(getAppIdInput(), {target: {value: "5202"}});

    screen.getByDisplayValue("5202");
  });

  it("should have the search-filters button", () => {
    render(<LoggerHeader {...props} />);

    screen.getByRole("button", {name: "Search Logger"});
  });

  it("should call the (search-files prop) with the filters when the search-filters button clicked", () => {
    render(<LoggerHeader {...props} />);

    fireEvent.change(getLogIdInput(), {target: {value: "9950"}});
    fireEvent.change(getAppIdInput(), {target: {value: "5202"}});
    fireEvent.change(getActionTypeInput(), {target: {value: props.actionTypes[0].value}});
    fireEvent.change(getAppTypeInput(), {target: {value: props.applicationTypes[0].value}});

    fireEvent.click(screen.getByRole("button", {name: "Search Logger"}));

    expect(props.onSearchLogger).toBeCalledWith({
      logId: "9950",
      appId: "5202",
      actionType: props.actionTypes[0].value,
      appType: props.applicationTypes[0].value,
    });
  });

  it("should have the clear-filters button", () => {
    render(<LoggerHeader {...props} />);

    screen.getByRole("button", {name: "↻"});
  });

  it("should clear the inputs sate & call the (clear-filters prop) when the clear-filters button clicked", () => {
    render(<LoggerHeader {...props} />);

    fireEvent.change(getLogIdInput(), {target: {value: "505"}});
    fireEvent.change(getAppIdInput(), {target: {value: "520"}});

    fireEvent.click(screen.getByRole("button", {name: "↻"}));

    expect(getLogIdInput().value).toEqual("");
    expect(getAppIdInput().value).toEqual("");

    expect(props.onClearLogger).toBeCalled();
  });

  it("should assure that the fields are initiated with the desired initial values that are coming from the (searchParams prop)", () => {
    props.searchParams.append("logId", "9090");
    props.searchParams.append("appId", "5050");
    props.searchParams.append("actionType", "ADD_EMPLOYEE");
    props.searchParams.append("appType", "ADD_COMPANY");

    render(<LoggerHeader {...props} />);

    expect(getLogIdInput().value).toEqual("9090");
    expect(getAppIdInput().value).toEqual("5050");
    expect(getActionTypeInput().value).toEqual("ADD_EMPLOYEE");
    expect(getAppTypeInput().value).toEqual("ADD_COMPANY");
  });
});
