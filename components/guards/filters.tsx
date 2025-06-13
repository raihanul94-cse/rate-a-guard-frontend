'use client';

import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { GUARD_LICENSE_TYPE, US_STATES } from '@/lib/enums';

interface IProps {
    query: string;
    setQuery: (query: string) => void;
    filter: Partial<Record<string, string>>;
    setFilter: (filter: Partial<Record<string, string>>) => void;
}

export function Filters({ query, setQuery, filter, setFilter }: IProps) {
    return (
        <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search guards..."
                    className="pl-10"
                />
            </div>
            <Select value={filter.type} onValueChange={(value) => setFilter({ ...filter, type: value })}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {GUARD_LICENSE_TYPE.map((state) => (
                        <SelectItem key={state.abbreviation} value={state.abbreviation}>
                            {state.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={filter.state} onValueChange={(value) => setFilter({ ...filter, state: value })}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                    {US_STATES.map((state) => (
                        <SelectItem key={state.abbreviation} value={state.abbreviation}>
                            {state.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select value={filter.status} onValueChange={(value) => setFilter({ ...filter, status: value })}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="license-expired">License Expired</SelectItem>
                    <SelectItem value="resigned">Resigned</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
