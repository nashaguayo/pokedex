export function logError(functionName, message, error) {
  console.error(`[Error at ${functionName}()] ${message}`, error);
}
