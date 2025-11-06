export const SuccessResponse = (message, data = {}) => {
    return {
        data,
        message,
        success: true,
        error: {},
    }
};

export const ErrorResponse = (message, error = 'error') => {
    return {
        data: {},
        success: false,
        error,
        message,
    }
};