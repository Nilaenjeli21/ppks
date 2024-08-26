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
  email?: string;
  perpetrator?: string;
  incidentDate: Date;
  incidentLocation?: string;
  Recommendation?: {
    id: number;
    link: string;
    originalName: string;
  }[];
}
