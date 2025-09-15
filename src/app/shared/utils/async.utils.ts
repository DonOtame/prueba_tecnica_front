// import { ToastService } from '@app/core/services';
// import { handleError } from './common.utils';
import { ErrorResponse } from '@app/core/models';

export const handleAsync = async <T>(
  promise: Promise<T>
  // toast: ToastService,
  // errorMessage: string
): Promise<T | ErrorResponse> => {
  try {
    return await promise;
  } catch (error: unknown) {
    // handleError(error, toast, errorMessage);
    const err = error as any;

    const errorResponse: ErrorResponse = {
      status: err.status ?? err.response?.status ?? null,
      message: err.error?.message ?? err.message ?? null,
      errors: err.error?.errors ?? null,
    };

    return errorResponse;
  }
};
