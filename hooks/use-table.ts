'use client';
import { genericClient } from '@/lib/generic-api-helper';
import { useEffect, useRef, useState } from 'react';

interface UseTableOptions {
    apiUrl: string;
    limit?: number;
    initialQuery?: string;
    initialFilter?: Partial<Record<string, string>>;
    initialOrder?: Record<string, string>;
}

export interface UseTableResult<T> {
    data: T[];
    isLoading: boolean;
    error: string | null;
    page: number;
    count: number;
    setPage: (page: number) => void;
    query: string;
    setQuery: (query: string) => void;
    filter: Partial<Record<string, string>>;
    setFilter: (filter: Partial<Record<string, string>>) => void;
    order: Record<string, string>;
    setOrder: (order: Record<string, string>) => void;
    reload: () => void;
}

export function useTable<T>({
    apiUrl,
    limit = 10,
    initialQuery = '',
    initialFilter = {},
    initialOrder = {},
}: UseTableOptions): UseTableResult<T> {
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState(initialQuery);
    const [filter, setFilter] = useState<Partial<Record<string, string>>>(initialFilter);
    const [order, setOrder] = useState<Record<string, string>>(initialOrder);
    const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [count, setCount] = useState(1);
    const [lastKey, setLastKey] = useState('');
    const isMountingRef = useRef(false);

    const fetchData = async (pageToUse: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await genericClient({
                url: apiUrl,
                method: 'get',
                params: {
                    page: pageToUse,
                    limit,
                    query: debouncedQuery || undefined,
                    filter: Object.keys(filter).length > 0 ? filter : undefined,
                    order: Object.keys(order).length > 0 ? order : undefined,
                },
            });

            if (response.status === 'success') {
                setData(response.data);
                setCount(response.metadata.count);
            } else {
                setError('Unexpected response format');
            }
        } catch (err) {
            setError(err.message || 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        isMountingRef.current = true;
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);
        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (!isMountingRef.current) {
            const key = JSON.stringify({ debouncedQuery, filter, order });
            if (key !== lastKey) {
                setLastKey(key);
                if (page !== 1) {
                    setPage(1);
                } else {
                    fetchData(1);
                }
            }
        } else {
            isMountingRef.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQuery, filter, order]);

    useEffect(() => {
        fetchData(page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const reload = () => fetchData(page);

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
        order,
        setOrder,
        reload,
    };
}
