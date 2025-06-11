'use client';

import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Guards</h1>
            </div>

            <div className="flex items-center gap-4">
                <Link href="/guards/add-new">
                    <Button>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Add Guard
                    </Button>
                </Link>
            </div>
        </div>
    );
}
