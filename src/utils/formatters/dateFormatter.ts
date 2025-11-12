export type DateFormat =
    | 'short' // 1/1/2025
    | 'medium' // Jan 1, 2025
    | 'long' // January 1, 2025
    | 'full' // Monday, January 1, 2025
    | 'iso' // 2025-01-01
    | 'datetime' // Jan 1, 2025, 12:00 PM
    | 'time' // 12:00 PM
    | 'relative'; // 2 hours ago

export function formatDate(
    date: Date | string | number,
    format: DateFormat = 'medium',
    locale: string = 'en-US',
): string {
    const dateObj = date instanceof Date ? date : new Date(date);

    if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
    }

    switch (format) {
        case 'short':
            return new Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            }).format(dateObj);

        case 'medium':
            return new Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            }).format(dateObj);

        case 'long':
            return new Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(dateObj);

        case 'full':
            return new Intl.DateTimeFormat(locale, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(dateObj);

        case 'iso':
            return dateObj.toISOString().split('T')[0];

        case 'datetime':
            return new Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }).format(dateObj);

        case 'time':
            return new Intl.DateTimeFormat(locale, {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }).format(dateObj);

        case 'relative':
            return formatRelativeTime(dateObj);

        default:
            return dateObj.toLocaleDateString(locale);
    }
}

export function formatRelativeTime(date: Date | string | number): string {
    const dateObj = date instanceof Date ? date : new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
        return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
        return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

export function parseDate(dateString: string): Date | null {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
}

export function isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
}

export function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

export function addYears(date: Date, years: number): Date {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
}

export function getDaysDifference(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
