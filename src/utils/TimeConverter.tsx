function convertMinutesToHoursAndMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 1) return `${hours} hours ${remainingMinutes.toFixed(0)} mins`;
  if (hours <= 1) return `${hours} hour ${remainingMinutes.toFixed(0)} mins`;
}
export { convertMinutesToHoursAndMinutes };
