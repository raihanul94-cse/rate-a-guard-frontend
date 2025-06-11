import * as React from 'react';
import Link from 'next/link';
import { Menu, User, BarChart2, Settings, HelpCircle, LogOut } from 'lucide-react';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export async function HomeNavbar() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access-token');
    const isAuthenticated = !!accessToken;

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between mx-auto px-4">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/rag.svg"
                            alt=""
                            width={150}
                            height={100}
                            style={{ height: 'auto', width: 'auto' }}
                        />
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center space-x-6">
                        {isAuthenticated && (
                            <Link href="/search-license" className="text-sm font-medium">
                                Search License
                            </Link>
                        )}

                        {isAuthenticated && (
                            <Link href="/dashboard" className="text-sm font-medium">
                                Dashboard
                            </Link>
                        )}

                        {isAuthenticated && (
                            <Link href="/guards" className="text-sm font-medium">
                                My Guards
                            </Link>
                        )}

                        {!isAuthenticated && (
                            <Link href="/register" className="text-sm font-medium">
                                Register
                            </Link>
                        )}

                        {!isAuthenticated && (
                            <Link href="/login" className="text-sm font-medium">
                                Login
                            </Link>
                        )}
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuLabel>Menu</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/analytics">
                                    <BarChart2 className="mr-2 h-4 w-4" />
                                    Analytics
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/settings">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/support">
                                    <HelpCircle className="mr-2 h-4 w-4" />
                                    Support
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/login">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign In
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {isAuthenticated && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="hidden md:flex">
                                    <User className="h-5 w-5" />
                                    <span className="sr-only">Toggle user menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/settings">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/logout">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log Out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </div>
        </nav>
    );
}
