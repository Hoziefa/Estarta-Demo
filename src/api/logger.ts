import apiConfig from "./axios.config";
import { AxiosResponse } from "axios";

export interface ILog {
  logId: number;
  applicationId: number;
  applicationType: string;
  actionType: string;
  actionDetails: null;
  creationTimestamp: string;
}

/*
                "logId": 906468196730134,
                "applicationId": null,
                "applicationType": null,
                "companyId": null,
                "actionType": "DARI_REFRESH_TOKEN",
                "ip": "10.11.0.89",
                "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36",
                "userId": 115678,
                "source": null,
                "ownerId": null,
                "logInfo": null,
                "creationTimestamp": "2022-01-31 17:29:00"
 */

export const getLogs = (): Promise<AxiosResponse<{result: {auditLog: ILog[]}}>> => {
  return apiConfig.get("/a2fbc23e-069e-4ba5-954c-cd910986f40f");
};
