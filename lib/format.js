const dateTime = new Intl.DateTimeFormat("az-AZ", {
  timeZone: "Asia/Baku",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const formatDateTime = (value) => dateTime.format(new Date(value));

export function formatRelative(value) {
  const diff = (Date.now() - new Date(value).getTime()) / 1000;
  if (diff < 60) return "indicə";
  if (diff < 3600) return `${Math.floor(diff / 60)} dəq əvvəl`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} saat əvvəl`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)} gün əvvəl`;
  return formatDateTime(value);
}
