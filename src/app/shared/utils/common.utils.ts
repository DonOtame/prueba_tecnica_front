import { ToastService } from '@app/core/services';
import { ErrorResponse } from '@app/core/models';

export const wait = (ms: number): Promise<void> => {
  return new Promise((res) => setTimeout(res, ms));
};

const DEFAULT_ERROR_CODES = [401, 403, 404, 409];

export const handleError = (error: ErrorResponse, toast: ToastService, context: string) => {
  const status = error.status ?? 0;

  const statusKey = (() => {
    if (!DEFAULT_ERROR_CODES.includes(status)) return 'UNKNOWN';

    switch (status) {
      case 401:
        return 'UNAUTHORIZED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      case 409:
        return 'CONFLICT';
      default:
        return 'UNKNOWN';
    }
  })();

  const messageKey = `TOAST.${context}_ERROR_${statusKey}`;

  toast.show(messageKey, 'error');
  console.error(`${context} error:`, error);
};
