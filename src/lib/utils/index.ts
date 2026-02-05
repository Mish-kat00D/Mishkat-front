export const formatDuration = (mins: number) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")}:00`;
};
