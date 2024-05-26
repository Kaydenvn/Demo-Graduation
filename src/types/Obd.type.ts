export interface IObd {
  _id: string;
  title: string;
  description: string;
  createDate: Date;
  status: string;
  doneDate: Date | null | string;
}
