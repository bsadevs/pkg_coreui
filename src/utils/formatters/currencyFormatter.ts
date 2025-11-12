export interface CurrencyOptions {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
}

export function formatCurrency(value: number | string, options: CurrencyOptions = {}): string {
    const { locale = 'en-US', currency = 'USD', minimumFractionDigits = 2, maximumFractionDigits = 2 } = options;

    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numValue)) {
        return '0.00';
    }

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
    }).format(numValue);
}

export function parseCurrency(value: string): number {
    // Remove currency symbols and spaces
    const cleaned = value.replace(/[^\d.,-]/g, '');

    // Handle different decimal separators
    const normalized = cleaned.replace(',', '.');

    return parseFloat(normalized) || 0;
}

export function formatNumber(
    value: number | string,
    locale: string = 'en-US',
    options: Intl.NumberFormatOptions = {},
): string {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numValue)) {
        return '0';
    }

    return new Intl.NumberFormat(locale, options).format(numValue);
}

export function formatPercentage(value: number, decimals: number = 2): string {
    return `${value.toFixed(decimals)}%`;
}

export function abbreviateNumber(value: number): string {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + value).length / 3);
    let shortValue: number | string = parseFloat(
        (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(3),
    );

    if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(1);
    }

    return shortValue + suffixes[suffixNum];
}
