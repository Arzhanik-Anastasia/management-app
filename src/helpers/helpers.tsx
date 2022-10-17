export function getTimeOfDay(hour: number) {
  let timeOfDay;
  if (hour < 6) {
    timeOfDay = 'Good nigth';
  } else if (hour >= 6 && hour < 12) {
    timeOfDay = 'Good morning';
  } else if (hour >= 12 && hour < 19) {
    timeOfDay = 'Good afternoon';
  } else {
    timeOfDay = 'Good evening';
  }
  return timeOfDay;
}
