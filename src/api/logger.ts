import http from "./axios.config";
import {AxiosResponse} from "axios";

export interface ILog {
  logId: number;
  applicationId: number;
  applicationType: string;
  actionType: string;
  actionDetails: null;
  creationTimestamp: string;
}

export const getLogs = (): Promise<AxiosResponse<{result: {auditLog: ILog[]}}>> => {
  return http.get("/a2fbc23e-069e-4ba5-954c-cd910986f40f");
};
