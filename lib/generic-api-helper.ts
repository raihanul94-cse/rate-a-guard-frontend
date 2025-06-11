import axios, { AxiosError } from 'axios';
import { ApiError } from './api-error';

type TRequestPayload<T> = {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
    data?: T;
    params?: T;
};

export const genericClient = async <T>(payload: TRequestPayload<T>) => {
    try {
        const response = await axios.post('/api/generic', payload, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as { details: object; error: string };
        const statusCode = err.response?.status ?? 500;
        const message = data.error || err.message || 'Unknown error';
        throw new ApiError(message, statusCode, data.details);
    }
};
