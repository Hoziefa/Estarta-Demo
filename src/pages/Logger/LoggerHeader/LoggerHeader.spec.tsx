import {render, screen} from "@testing-library/react";
import LoggerHeader, {ILoggerHeaderProps} from "./LoggerHeader";

describe("LoggerHeader Test", () => {
  const props: ILoggerHeaderProps = {
    actionTypes: [],
    applicationTypes: [],
    onSearchLogger: jest.fn(),
    onClearLogger: jest.fn(),
  };

  it("should have the LOG ID field", () => {
    render(<LoggerHeader {...props} />);

    screen.getByRole("combobox");
  });
});
