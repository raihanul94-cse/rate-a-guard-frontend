'use client';

import { useEffect } from 'react';
import { UserPlus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function Header() {
    const router = useRouter();
    const addNewPath = '/guards/add-new';

    useEffect(() => {
        router.prefetch(addNewPath);
    }, [router]);

    const handleAddGuard = () => {
        router.push(addNewPath);
    };

    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Guards</h1>
                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>Active 1</span>
                    </div>
                    <span>•</span>
                    <span>Inactive 0</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button onClick={handleAddGuard}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Guard
                </Button>
            </div>
        </div>
    );
}
