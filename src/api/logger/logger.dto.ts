import {ILog} from "./logger.api";

export const loggerDTO = (data: {data: {result: {auditLog: ILog[]}}}) => {
  if (!data) return null;

  return data.data.result.auditLog;
};
