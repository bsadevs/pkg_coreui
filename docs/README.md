## 🔧 Setup

### 1. Install dependencies

```bash
npm install vue primevue primeicons tailwindcss
```

### 2. Configure your app

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import BsaCoreUI from '@bsa/core-ui';
import PrimeVue from 'primevue/config';

// Import styles
import '@bsa/core-ui/styles';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue);
app.use(BsaCoreUI);

app.mount('#app');
```

### 3. Configure TailwindCSS

```javascript
// tailwind.config.js
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/@bsa/core-ui/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

## 📚 Component Overview

### Base Components

#### Inputs

- `BsaInputText` - Text input with validation and icons
- `BsaInputSelect` - Dropdown select with options
- `BsaInputSearch` - Search input with debouncing
- `BsaInputDate` - Date/time picker

#### Buttons

- `BsaButtonDefault` - Standard button with variants (primary, secondary, success, warning, danger)
- `BsaButtonIcon` - Icon-only button
- `BsaButtonPanel` - Button group container

#### Modals

- `BsaModalDialog` - Modal/dialog with customizable header, body, and footer

### Form Components

- `BsaForm` - Complete form with validation
- `BsaFormHeader` - Form header section
- `BsaFormFooter` - Form footer with action buttons
- `BsaFormRow` - Grid row for form layout
- `BsaFormRegister` - Pre-built registration form example

### Table Components

- `BsaDataTable` - Full-featured data table with sorting, filtering, pagination (PrimeVue)
- `BsaTableActions` - Action buttons for table rows (icon-only, label shown as tooltip)

### Layout Components

- `BsaPageContainer` - Page wrapper with breadcrumbs and header
- `BsaCard` - Card container with header, body, footer
- `BsaSection` - Content section with title

## 🎯 Quick Start Example

### Simple Data Table

The DataTable displays columns in this order: **Actions | ID | Product | Status | Included**.
Action buttons are icon-only (Edit ✏️ and Delete 🗑️), with labels shown as tooltips on hover.

**Visual Result:**

```
┌─────────┬────┬────────────────────┬──────────┬─────────────────┐
│ Actions │ ID │ Product            │ Status   │ Included        │
├─────────┼────┼────────────────────┼──────────┼─────────────────┤
│ ✏️  🗑️ │ 1  │ Laptop Dell XPS 15 │ Active   │ Charger, Mouse  │
│ ✏️  🗑️ │ 2  │ iPhone 14 Pro      │ Active   │ Cable, Earphones│
│ ✏️  🗑️ │ 3  │ Samsung Monitor    │ Inactive │ HDMI Cable      │
└─────────┴────┴────────────────────┴──────────┴─────────────────┘
```

```vue
<template>
    <BsaDataTable :data="products" :columns="columns" :actions="actions" paginator :rows="10" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BsaDataTable } from '@bsa/core-ui';

// Data structure: id, product, status, included
const products = ref([
    { id: 1, product: 'Laptop Dell XPS 15', status: 'Active', included: 'Charger, Mouse, Bag' },
    { id: 2, product: 'iPhone 14 Pro', status: 'Active', included: 'Cable, Earphones' },
    { id: 3, product: 'Samsung Monitor 27"', status: 'Inactive', included: 'HDMI Cable, Stand' },
]);

// Columns: ID, Product, Status, Included (Actions column is added automatically as first column)
const columns = [
    { field: 'id', header: 'ID', sortable: true, width: '80px' },
    { field: 'product', header: 'Product', sortable: true, filterable: true },
    { field: 'status', header: 'Status', sortable: true },
    { field: 'included', header: 'Included' },
];

// Actions appear as FIRST column (icon-only buttons)
const actions = [
    {
        label: 'Edit', // Tooltip text
        icon: 'pi pi-pencil', // Icon only (no text shown)
        variant: 'primary',
        onClick: (row) => console.log('Edit', row),
    },
    {
        label: 'Delete', // Tooltip text
        icon: 'pi pi-trash', // Icon only (no text shown)
        variant: 'danger',
        onClick: (row) => console.log('Delete', row),
    },
];

// Result: Table columns from left to right: Actions | ID | Product | Status | Included
</script>
```

### Form with Validation

```vue
<template>
    <BsaForm v-model="formData" title="User Information" @submit="onSubmit">
        <BsaFormRow :columns="2">
            <BsaInputText v-model="formData.firstName" label="First Name" required />
            <BsaInputText v-model="formData.lastName" label="Last Name" required />
        </BsaFormRow>

        <BsaFormRow :columns="1">
            <BsaInputText v-model="formData.email" label="Email" type="email" required />
        </BsaFormRow>
    </BsaForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BsaForm, BsaFormRow, BsaInputText } from '@bsa/core-ui';

const formData = ref({
    firstName: '',
    lastName: '',
    email: '',
});

const onSubmit = (data) => {
    console.log('Form submitted:', data);
};
</script>
```

## 🔨 Composables

### useCrud - CRUD Operations

```typescript
import { useCrud } from '@bsa/core-ui';

const { items, loading, fetchAll, create, update, remove } = useCrud({
    entityName: 'users',
    apiEndpoint: '/api/users',
});

// Fetch all items
await fetchAll();

// Create new item
await create({ name: 'John', email: 'john@example.com' });

// Update item
await update(1, { name: 'Jane' });

// Delete item
await remove(1);
```

### useCrudPagination - Pagination & Filtering

```typescript
import { useCrudPagination } from '@bsa/core-ui';

const { items, loading, page, totalPages, fetchData, nextPage, setSort, setFilter } = useCrudPagination({
    apiEndpoint: '/api/users',
    initialPageSize: 10,
});
```

### useFormValidation - Form Validation

```typescript
import { useFormValidation, email, required, minLength } from '@bsa/core-ui';

const { validateField, validateAll, errors, getFieldError } = useFormValidation({
    email: { ...required(), ...email() },
    password: { ...required(), ...minLength(8) },
    name: { ...required(), ...minLength(3) },
});
```

## 🛠 Utilities

### Formatters

```typescript
import { formatCurrency, formatDate, formatString } from '@bsa/core-ui';

formatCurrency(1234.56); // "$1,234.56"
formatDate(new Date(), 'medium'); // "Jan 1, 2024"
capitalize('hello world'); // "Hello World"
```

### Validators

```typescript
import { isEmail, isPhone, isStrongPassword, isCreditCard } from '@bsa/core-ui';

isEmail('test@example.com'); // true
isPhone('+1234567890'); // true
isStrongPassword('SecureP@ss123'); // true
```

## 📖 Documentation

For detailed documentation and examples, see [src/docs/README.md](src/docs/README.md)

## 🧪 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build library
npm run build

# Run tests
npm run test

# Type check
npm run type-check
```

## 🎨 Customization

All components use TailwindCSS classes and can be easily customized through Tailwind configuration or by overriding component classes.

## 🙏 Credits

Built with:

- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [PrimeVue](https://primevue.org/)
- [Vite](https://vitejs.dev/)
