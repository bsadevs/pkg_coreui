export function capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function capitalizeWords(str: string): string {
    if (!str) return '';
    return str
        .split(' ')
        .map((word) => capitalize(word))
        .join(' ');
}

export function camelCase(str: string): string {
    if (!str) return '';
    return str
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[A-Z]/, (chr) => chr.toLowerCase());
}

export function snakeCase(str: string): string {
    if (!str) return '';
    return str
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '')
        .replace(/\s+/g, '_');
}

export function kebabCase(str: string): string {
    if (!str) return '';
    return str
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '')
        .replace(/\s+/g, '-');
}

export function pascalCase(str: string): string {
    if (!str) return '';
    const camel = camelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
}

export function truncate(str: string, length: number, suffix: string = '...'): string {
    if (!str || str.length <= length) return str;
    return str.substring(0, length) + suffix;
}

export function slugify(str: string): string {
    if (!str) return '';
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function ellipsis(str: string, maxLength: number, position: 'start' | 'middle' | 'end' = 'end'): string {
    if (!str || str.length <= maxLength) return str;

    switch (position) {
        case 'start':
            return '...' + str.slice(str.length - maxLength + 3);
        case 'middle':
            const half = Math.floor((maxLength - 3) / 2);
            return str.slice(0, half) + '...' + str.slice(str.length - half);
        case 'end':
        default:
            return str.slice(0, maxLength - 3) + '...';
    }
}

export function removeWhitespace(str: string): string {
    if (!str) return '';
    return str.replace(/\s+/g, '');
}

export function normalizeWhitespace(str: string): string {
    if (!str) return '';
    return str.replace(/\s+/g, ' ').trim();
}

export function stripHtml(str: string): string {
    if (!str) return '';
    return str.replace(/<[^>]*>/g, '');
}

export function escapeHtml(str: string): string {
    if (!str) return '';
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return str.replace(/[&<>"']/g, (m) => map[m]);
}

export function unescapeHtml(str: string): string {
    if (!str) return '';
    const map: Record<string, string> = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
    };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, (m) => map[m]);
}

export function mask(str: string, start: number = 0, end?: number, maskChar: string = '*'): string {
    if (!str) return '';
    const endIndex = end || str.length;
    const masked = maskChar.repeat(endIndex - start);
    return str.substring(0, start) + masked + str.substring(endIndex);
}

export function reverse(str: string): string {
    if (!str) return '';
    return str.split('').reverse().join('');
}

export function wordCount(str: string): number {
    if (!str) return 0;
    return str.trim().split(/\s+/).length;
}

export function excerpt(str: string, length: number = 100): string {
    if (!str || str.length <= length) return str;

    const trimmed = str.substring(0, length);
    const lastSpace = trimmed.lastIndexOf(' ');

    return lastSpace > 0 ? trimmed.substring(0, lastSpace) + '...' : trimmed + '...';
}
