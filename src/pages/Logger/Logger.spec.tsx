import {fireEvent, render, screen} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from "react-query";
import {rest} from "msw";
import {setupServer} from "msw/node";

import Logger from "./Logger";
import {ILog} from "../../api/logger";

const logsHandler = rest.get("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f", (req, res, ctx) => {
  return res(
    ctx.status(202),
    ctx.json<{result: {auditLog: ILog[]}}>({
      result: {
        auditLog: [
          {
            logId: 9099,
            applicationId: 5050,
            applicationType: "Mock app type #1",
            actionType: "Mock action type #1",
            actionDetails: null,
            creationTimestamp: "2022-01-31 17:29:00",
          },
          {
            logId: 1010,
            applicationId: 1515,
            applicationType: "Mock app type #2",
            actionType: "Mock action type #2",
            actionDetails: null,
            creationTimestamp: "2023-01-31 17:29:00",
          },
        ],
      },
    }),
  );
});

const server = setupServer(logsHandler);

const renderWithQuery = (queryClient: QueryClient) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <Logger />
    </QueryClientProvider>,
  );
};

describe("<Logger /> Test", () => {
  const queryClient = new QueryClient();

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it("should integrate with the LoggerHeader", () => {
    renderWithQuery(queryClient);

    screen.getByTestId("logger-header");
  });

  it("should have the LOG-ID column (label & value)", async () => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Log ID"});

    await screen.findByText("9099");
  });

  it("should have the Application-Type column (label & value)", async () => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Application Type"});

    await screen.findByText("Mock app type #1");
  });

  it("should have the App-ID column (label & value)", async () => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Application ID"});

    await screen.findByText("5050");
  });

  it("should have the Action-Type column (label & value)", async () => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Action"});

    await screen.findByText("Mock action type #1");
  });

  it("should have the Action-Details column (label & value)", async () => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Action Details"});

    await screen.findAllByText("-/-");
  });

  it("should have the Date:Time column (label & value)", async () => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Date : Time"});

    await screen.findByText("2022-01-31 17:29:00");
  });

  it("should sort the Log-ID column", async () => {
    renderWithQuery(queryClient);

    expect(screen.getAllByRole("cell")[0].textContent).toEqual("9099");

    fireEvent.click(screen.getByRole("columnheader", {name: "Log ID"}));

    expect(screen.getAllByRole("cell")[0].textContent).toEqual("1010");
  });

  it("should sort the App-Type column", async () => {
    renderWithQuery(queryClient);

    expect(screen.getAllByRole("cell")[1].textContent).toEqual("Mock app type #1");

    fireEvent.click(screen.getByRole("columnheader", {name: "Application ID"}));

    expect(screen.getAllByRole("cell")[1].textContent).toEqual("Mock app type #2");
  });

  it("should sort the App-ID column", async () => {
    renderWithQuery(queryClient);

    expect(screen.getAllByRole("cell")[2].textContent).toEqual("5050");

    fireEvent.click(screen.getByRole("columnheader", {name: "Application ID"}));

    expect(screen.getAllByRole("cell")[2].textContent).toEqual("1515");
  });

  it("should sort the Action-Type column", async () => {
    renderWithQuery(queryClient);

    expect(screen.getAllByRole("cell")[3].textContent).toEqual("Mock action type #1");

    fireEvent.click(screen.getByRole("columnheader", {name: "Application ID"}));

    expect(screen.getAllByRole("cell")[3].textContent).toEqual("Mock action type #2");
  });

  it("should sort the Date-Time column", async () => {
    renderWithQuery(queryClient);

    expect(screen.getAllByRole("cell")[5].textContent).toEqual("2022-01-31 17:29:00");

    fireEvent.click(screen.getByRole("columnheader", {name: "Application ID"}));

    expect(screen.getAllByRole("cell")[5].textContent).toEqual("2023-01-31 17:29:00");
  });
});
