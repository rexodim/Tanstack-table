export enum Status {
  Draft = "Draft",
  Complete = "Complete",
  Pending = "Pending",
}

export interface IRequest {
  id: number;
  status: Status;
  item: string;
  createdAt: string;
}
