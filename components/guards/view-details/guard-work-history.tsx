import { IGuardTable, IGuardWithCompany } from '@/types/guard';
import { Building2 } from 'lucide-react';
import { useFetch } from '@/hooks/use-fetch';
import { Spinner } from '@/components/ui/spinner';
import { formatDate } from '@/lib/utils';

export function GuardWorkHistory({ guard }: { guard: IGuardTable }) {
    const { isLoading, data, error } = useFetch<IGuardWithCompany[]>({
        apiUrl: `/api/guards/${guard.uuid}/job-history`,
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return null;
    }

    return (
        <div className="relative">
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-200"></div>

            <div className="space-y-3">
                {data.map((experience, index) => (
                    <div key={index} className="flex items-start gap-3 relative">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm relative z-10 border-2 border-white shadow-sm">
                            <Building2 className="h-5 w-5 text-gray-600" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">
                                {experience.company.companyName}
                            </h4>
                            <p className="text-xs text-gray-600 mt-0.5">
                                {formatDate(experience.joiningDate as string, 'yyyy')} -{' '}
                                {formatDate(experience.resignationDate as string, 'yyyy') || '[Unavailable]'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
