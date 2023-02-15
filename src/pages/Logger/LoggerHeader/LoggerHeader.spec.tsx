import {fireEvent, render, screen} from "@testing-library/react";
import LoggerHeader, {ILoggerHeaderProps} from "./LoggerHeader";

describe("<LoggerHeader /> Test", () => {
  const getLogIdInput = () => screen.getByPlaceholderText<HTMLInputElement>("e.g. 920345");
  const getAppIdInput = () => screen.getByPlaceholderText<HTMLInputElement>("e.g. 219841");

  const props: ILoggerHeaderProps = {
    actionTypes: [{label: "action #1", value: "action #1"}],
    applicationTypes: [{label: "app #1", value: "app #1"}],
    onSearchLogger: jest.fn(),
    onClearLogger: jest.fn(),
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

    screen.getByTestId("action-type");
  });

  it("should have the Application-Type select box", () => {
    render(<LoggerHeader {...props} />);

    screen.getByTestId("application-type");
  });

  it("should have the Date inputs", () => {
    render(<LoggerHeader {...props} />);

    expect(screen.getAllByPlaceholderText("Select date").length).toEqual(2);
  });

  it("should change the From-Date input value to the selected date", () => {
    render(<LoggerHeader {...props} />);

    fireEvent.change(screen.getAllByPlaceholderText("Select date")[0], {target: {value: new Date(2023, 10)}});

    screen.getByDisplayValue("Wed Nov 01 2023 00:00:00 GMT+0300 (GMT+03:00)");
  });

  it("should change the To-Date input value to the selected date", () => {
    render(<LoggerHeader {...props} />);

    fireEvent.change(screen.getAllByPlaceholderText("Select date")[1], {target: {value: new Date(2024, 10)}});

    screen.getByDisplayValue("Fri Nov 01 2024 00:00:00 GMT+0300 (GMT+03:00)");
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
    fireEvent.change(screen.getAllByPlaceholderText("Select date")[0]);
    fireEvent.change(screen.getAllByPlaceholderText("Select date")[1]);

    fireEvent.click(screen.getByRole("button", {name: "Search Logger"}));

    expect(props.onSearchLogger).toBeCalledWith({
      logId: 9950,
      appId: 5202,
      actionType: null,
      appType: null,
      fromDate: null,
      toDate: null,
    });
  });

  it("should have the clear-filters button", () => {
    render(<LoggerHeader {...props} />);

    screen.getByRole("button", {name: "↻"});
  });

  it("should clear the inputs sate & call the (clear-filters prop) when the clear-filters button clicked", () => {
    render(<LoggerHeader {...props} />);

    fireEvent.change(getLogIdInput(), {target: {value: "9950"}});
    fireEvent.change(getAppIdInput(), {target: {value: "5202"}});

    fireEvent.click(screen.getByRole("button", {name: "↻"}));

    expect(getLogIdInput().value).toEqual("");
    expect(getAppIdInput().value).toEqual("");

    expect(props.onClearLogger).toBeCalled();
  });
});
