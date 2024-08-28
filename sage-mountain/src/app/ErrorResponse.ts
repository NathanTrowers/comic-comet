interface ErrorResponse {
    status: number;
    message: string;
    errorCodes: number[],
}

export default ErrorResponse;
