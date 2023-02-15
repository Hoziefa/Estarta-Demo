import http from "../axios.config";
import {loggerDTO} from "./logger.dto";

export interface ILog {
  logId: number;
  applicationId: number;
  applicationType: string;
  actionType: string;
  actionDetails: null;
  creationTimestamp: string;
}

export const getLogs = (): Promise<ILog[] | null> => {
  return http.get("/a2fbc23e-069e-4ba5-954c-cd910986f40f").then(loggerDTO);
};
