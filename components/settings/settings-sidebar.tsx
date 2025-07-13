'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Building2, Monitor, UserCog } from 'lucide-react';

const sidebarNavItems = [
    {
        title: 'Company Information',
        href: '/settings',
        icon: Building2,
    },
    {
        title: 'Account',
        href: '/settings/account',
        icon: UserCog,
    },
    {
        title: 'Appearance',
        href: '/settings/appearance',
        icon: Monitor,
    }
];

export function SettingsSidebar() {
    const pathname = usePathname();

    return (
        <aside className="-mx-4 lg:w-1/5">
            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                {sidebarNavItems.map((item) => (
                    <Button
                        key={item.href}
                        variant={pathname === item.href ? 'secondary' : 'ghost'}
                        className="justify-start"
                        asChild
                    >
                        <Link href={item.href}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.title}
                        </Link>
                    </Button>
                ))}
            </nav>
        </aside>
    );
}
