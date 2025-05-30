'use client';
import { genericClient } from '@/lib/generic-api-helper';
import { useEffect, useState } from 'react';

interface UseTableOptions<F> {
    apiUrl: string;
    limit?: number;
    initialQuery?: string;
    initialFilter?: F;
}

export interface UseTableResult<T, F> {
    data: T[];
    isLoading: boolean;
    error: string | null;
    page: number;
    count: number;
    setPage: (page: number) => void;
    query: string;
    setQuery: (query: string) => void;
    filter: Partial<F>;
    setFilter: (filter: Partial<F>) => void;
    reload: () => void;
}

export function useTable<T, F>({
    apiUrl,
    limit = 10,
    initialQuery = '',
    initialFilter = null as unknown as F,
}: UseTableOptions<F>): UseTableResult<T, F> {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState(initialQuery);
    const [filter, setFilter] = useState<Partial<F>>(initialFilter);
    const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [count, setCount] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await genericClient({
                url: apiUrl,
                method: 'get',
                params: {
                    page,
                    limit,
                    query: debouncedQuery,
                    filter,
                },
            });

            if (response.status === 'success') {
                setData(response.data);
                setCount(response.metadata.count);
            }
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, debouncedQuery, filter]);

    const reload = () => fetchData();

    return {
        data,
        isLoading,
        error,
        page,
        count,
        setPage,
        query,
        setQuery,
        filter,
        setFilter,
        reload,
    };
}
