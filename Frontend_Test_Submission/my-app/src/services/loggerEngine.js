const eventLogs = [];

export function recordLog(category, content) {
  const entry = {
    time: new Date().toISOString(),
    category,
    content,
  };
  eventLogs.push(entry);
}

export function fetchLogs() {
  return eventLogs;
}
