import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isBefore, isAfter, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, formatStr = 'MM/dd/yyyy'): string {
    if (date) {
        const parsedDate = typeof date === 'string' ? parseISO(date) : date;
        return format(parsedDate, formatStr);
    }

    return '';
}

export function isDateBefore(date1: string | Date, date2: string | Date): boolean {
    const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
    const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
    return isBefore(d1, d2);
}

export function isDateAfter(date1: string | Date, date2: string | Date): boolean {
    const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
    const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
    return isAfter(d1, d2);
}

export function sanitizeFormData<T extends Record<string, any>>(data: T): T {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value ?? ''])) as T;
}
