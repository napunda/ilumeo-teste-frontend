import { Worklog } from "./worklog";
export interface Shift {
  id: string;
  date: string;
  duration: number;
  workLogs: Worklog[];
}
