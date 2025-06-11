import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IGuardTable } from '@/types/guard';
import { GuardsTableRow } from '@/components/guards/table/guards-table-row';

interface IProps {
    guards: IGuardTable[];
    reload(): void;
}

export function GuardsTable({ guards, reload }: IProps) {
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Licenses</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {guards.map((guard) => (
                        <GuardsTableRow key={guard.uuid} guard={guard} reload={reload} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
