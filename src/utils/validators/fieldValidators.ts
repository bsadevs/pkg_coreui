export function isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

export function isUrl(value: string): boolean {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

export function isPhone(value: string): boolean {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(value);
}

export function isNumeric(value: string | number): boolean {
    return !isNaN(Number(value)) && isFinite(Number(value));
}

export function isAlphanumeric(value: string): boolean {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(value);
}

export function isAlphabetic(value: string): boolean {
    const alphabeticRegex = /^[a-zA-Z]+$/;
    return alphabeticRegex.test(value);
}

export function isEmpty(value: any): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
}

export function isNotEmpty(value: any): boolean {
    return !isEmpty(value);
}

export function isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

export function isLength(value: string, min: number, max?: number): boolean {
    if (max !== undefined) {
        return value.length >= min && value.length <= max;
    }
    return value.length >= min;
}

export function isDate(value: any): boolean {
    const date = new Date(value);
    return !isNaN(date.getTime());
}

export function isFutureDate(value: any): boolean {
    const date = new Date(value);
    const now = new Date();
    return isDate(value) && date > now;
}

export function isPastDate(value: any): boolean {
    const date = new Date(value);
    const now = new Date();
    return isDate(value) && date < now;
}

export function isEqual(value1: any, value2: any): boolean {
    return value1 === value2;
}

export function isStrongPassword(value: string): boolean {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(value);
}

export function isWeakPassword(value: string): boolean {
    return value.length < 8;
}

export function isCreditCard(value: string): boolean {
    // Luhn algorithm
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return false;

    let sum = 0;
    let isEven = false;

    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i]);

        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

export function isIPv4(value: string): boolean {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipv4Regex.test(value)) return false;

    const parts = value.split('.');
    return parts.every((part) => {
        const num = parseInt(part);
        return num >= 0 && num <= 255;
    });
}

export function isIPv6(value: string): boolean {
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv6Regex.test(value);
}

export function isHexColor(value: string): boolean {
    const hexColorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    return hexColorRegex.test(value);
}

export function isJSON(value: string): boolean {
    try {
        JSON.parse(value);
        return true;
    } catch {
        return false;
    }
}

export function isBase64(value: string): boolean {
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    return base64Regex.test(value);
}

export function isMACAddress(value: string): boolean {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(value);
}

export function isSlug(value: string): boolean {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(value);
}

export function isUUID(value: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
}

export function isPostalCode(value: string, country: 'US' | 'CA' | 'UK' = 'US'): boolean {
    const patterns = {
        US: /^\d{5}(-\d{4})?$/,
        CA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
        UK: /^[A-Z]{1,2}\d{1,2} \d[A-Z]{2}$/,
    };
    return patterns[country].test(value);
}
