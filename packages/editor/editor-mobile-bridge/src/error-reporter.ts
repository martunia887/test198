// Global error listener
window.addEventListener('error', event => {
  console.error(event);
  const { message, filename, lineno: line, colno: col, error } = event;

  const stackTrace =
    (error &&
      error.stack &&
      error.stack.split('\n').map((trace: string) => trace.trim())) ||
    [];

  window.nativeBridge.sendError(message, filename || '', line, col, stackTrace);
});
