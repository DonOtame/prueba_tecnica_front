import { ToastService } from '@app/core/services';
import { handleError } from './common.utils';

export const handleAsync = async <T>(
  promise: Promise<T>,
  toast: ToastService,
  errorMessage: string
): Promise<T | undefined> => {
  try {
    return await promise;
  } catch (error: unknown) {
    handleError(error, toast, errorMessage);
    return undefined;
  }
};
