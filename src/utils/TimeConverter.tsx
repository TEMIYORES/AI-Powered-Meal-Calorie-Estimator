function convertMinutesToHoursAndMinutes(minutes: number) {
  const newMinutes = Math.round(minutes);
  const hours = Math.floor(newMinutes / 60);
  const remainingMinutes = newMinutes % 60;
  if (hours > 1) return `${hours} hours ${remainingMinutes.toFixed(0)} mins`;
  if (hours <= 1) return `${hours} hour ${remainingMinutes.toFixed(0)} mins`;
}
export { convertMinutesToHoursAndMinutes };
