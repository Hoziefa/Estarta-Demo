import { render, screen } from "@testing-library/react";
import Logger from "./Logger";

describe("Logger Test", (): void => {
  it("should have the logger", (): void => {
    render(<Logger />);

    screen.getByText("Logger");
  });
});
