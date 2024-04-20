export function newAbortSignal(timeoutMs?: number) {
  const abortController = new AbortController();

  if (!timeoutMs) return abortController.signal;

  setTimeout(() => abortController.abort(), timeoutMs);

  return abortController.signal;
}
