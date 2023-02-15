import {render, screen} from "@testing-library/react";
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
            applicationType: "Mock app type",
            actionType: "Mock action type",
            actionDetails: null,
            creationTimestamp: "2022-01-31 17:29:00",
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

    await screen.findByText("Mock app type");
  });

  it("should have the App-ID column (label & value)", async () => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Application ID"});

    await screen.findByText("5050");
  });

  it("should have the Action-Type column (label & value)", async () => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Action"});

    await screen.findByText("Mock action type");
  });

  it("should have the Action-Details column (label & value)", async () => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Action Details"});

    await screen.findByText("-/-");
  });

  it("should have the Date:Time column (label & value)", async () => {
    renderWithQuery(queryClient);

    screen.getByRole("columnheader", {name: "Date : Time"});

    await screen.findByText("2022-01-31 17:29:00");
  });
});
