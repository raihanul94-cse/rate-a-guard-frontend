'use client';
import { genericClient } from '@/lib/generic-api-helper';
import { useEffect, useRef, useState } from 'react';
import { ApiError } from '@/lib/api-error';

interface UseFetchOptions {
    apiUrl: string;
}

export interface UseFetchResult<T> {
    data: T;
    isLoading: boolean;
    error: ApiError | null;
    reload: () => void;
}

export function useFetch<T>({ apiUrl }: UseFetchOptions): UseFetchResult<T> {
    const [data, setData] = useState<T>(null as unknown as T);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);
    const isMountingRef = useRef(false);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await genericClient({
                url: apiUrl,
                method: 'get',
            });

            if (response.status === 'success') {
                setData(response.data as T);
            }
        } catch (error: unknown) {
            if (error instanceof ApiError) {
                setError(error);
            } else {
                setError(new ApiError('Unknown error', 500));
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isMountingRef.current) {
            fetchData();
        } else {
            isMountingRef.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        isMountingRef.current = true;
    }, []);

    const reload = () => fetchData();

    return {
        data,
        isLoading,
        error,
        reload,
    };
}
