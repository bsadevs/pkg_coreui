# Bsa CoreUI Components Documentation

### 🧩 Utils

Reusable utility functions for formatting and validation.

---

### 🪄 Formatters

Helpers for formatting data.

- **currencyFormatter.ts** – Format numbers as currency.
- **dateFormatter.ts** – Format dates in various patterns.
- **stringFormatter.ts** – String manipulation and formatting.
- **index.ts** – Exports all formatter utilities.

```typescript
import { formatCurrency, formatDate, formatString } from '@bsasolutions/coreui';
formatCurrency(1234.56); // "$1,234.56"
formatDate(new Date(), 'medium'); // "Jan 1, 2024"
capitalize('hello world'); // "Hello World"
```

---

### ✅ Validators

Field and form validation helpers.

- **fieldValidators.ts** – Validation rules for individual fields.
- **formValidators.ts** – Validation rules for entire forms.
- **index.ts** – Exports all validator utilities.

```typescript
import { isEmail, isPhone, isStrongPassword, isCreditCard } from '@bsasolutions/coreui';
isEmail('test@example.com'); // true
isPhone('+1234567890'); // true
isStrongPassword('SecureP@ss123'); // true
```
