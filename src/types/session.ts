import { Workshop } from "./workshop";

export interface Session {
  id: string,
  idx: number,
  title: string,
  content: string,
  duration: number,
  videoUrl: string | null,
  workshopId: string,
  workshop: Workshop,
}