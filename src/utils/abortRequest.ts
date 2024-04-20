export function newAbortSignal(timeoutMs: number = 0) {
  console.log(timeoutMs);

  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs);

  return abortController.signal;
}
