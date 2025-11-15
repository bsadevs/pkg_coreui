# Bsa CoreUI Components Documentation

## 🧩 Composables

Reusable Vue composables for CRUD, forms, modals, and tables.

---

### ⚙️ CRUD

#### useCrudv

Handles create, read, update, delete operations for an entity.

- Example: `const { items, fetchAll, create, update, remove } = useCrud({ entityName: 'users', apiEndpoint: '/api/users' })`

#### useCrudPagination.ts

Provides pagination and filtering support for table data.

- Example: `const { items, page, totalPages, fetchData } = useCrudPagination({ apiEndpoint: '/api/users', initialPageSize: 10 })`

#### useFormValidation

Form validation composable with reusable rules.

- Example: `const { validateField, validateAll, errors } = useFormValidation({ email: { required, email }, password: { required, minLength: 8 } })`

- **index.ts** – Exports all CRUD composables.

---

### 📝 Form

Form-specific composables.

- **useFormModel.ts** – Handles form reactive models.
- **useFormValidation.ts** – Form validation logic.
- **index.ts** – Exports all form composables.

---

### 📦 Modal

Modal handling composables.

- **useModal.ts** – Open, close, and manage modals.
- **index.ts** – Exports all modal composables.

---

### 📋 Table

DataTable helpers for filtering and persistence.

- **useTableFilters.ts** – Filter handling for tables.
- **useTablePersistence.ts** – Persist table state (sorting, filters, pagination).
- **index.ts** – Exports all table composables.

### 📋 Table Composables

Helpers for persisting and managing table data.

---

### 🗄️ useTablePersistence

Persists table data to `localStorage` or `sessionStorage` and restores it on mount.

- **Features**:
    - Automatic persistence on data change
    - Restore data on component mount
    - Supports `localStorage` (default) or `sessionStorage`
    - Type-safe with TypeScript

- **Example Usage**:

```ts
import { ref, onMounted } from 'vue';
import { useTablePersistence } from '@bsasolutions/coreui';

const users = ref([{ id: 1, name: 'John' }]);
const { restore, clear } = useTablePersistence(users, { key: 'my-users', storage: 'local' });

onMounted(() => restore());
```
