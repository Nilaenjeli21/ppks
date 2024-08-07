import { ComplaintStatus } from "@common/constant/Enum";

export interface Complaint {
  id: number;
  name: string;
  major: string;
  program: string;
  position: string;
  status: ComplaintStatus;
  reporter: string;
  description: string;
  contact: string;
  link?: string;
  reportDate: Date;
  Recommendation?: {
    id: number;
    link: string;
    originalName: string;
  }[];
}
