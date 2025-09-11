export const wait = (ms: number): Promise<void> => {
  return new Promise((res) => setTimeout(res, ms));
};

export const handleError = (
  error: unknown,
  toast: { show: (msg: string, type: 'error') => void },
  defaultMessage: string
): void => {
  const message = error instanceof Error ? error.message : defaultMessage;
  toast.show(message, 'error');
};
