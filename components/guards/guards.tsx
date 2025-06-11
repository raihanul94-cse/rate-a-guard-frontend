'use client';

import { Header } from '@/components/guards/header';
import { Filters } from '@/components/guards/filters';
import { useTable } from '@/hooks/use-table';
import { IGuardTable } from '@/types/guard';
import { GuardsTable } from '@/components/guards/table/guards-table';
import { Paginate } from '@/components/common/paginate';
import { GuardTableSkeleton } from '@/components/guards/table/guard-table-skeleton';

export function Guards() {
    const { data, isLoading, count, page, setPage, query, setQuery, filter, setFilter, reload } = useTable<IGuardTable>(
        {
            apiUrl: '/api/user/guards',
            limit: 10,
            initialQuery: '',
            initialFilter: {
                type: '',
                state: '',
                status: '',
            },
        }
    );

    return (
        <div className="space-y-8">
            <Header />
            <Filters query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} />
            {isLoading ? <GuardTableSkeleton /> : <GuardsTable guards={data} reload={reload} />}

            <Paginate count={count} page={page} perPage={10} onPageChange={(newPage) => setPage(newPage)} />
        </div>
    );
}
