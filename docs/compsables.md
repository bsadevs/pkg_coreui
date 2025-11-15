# Table Composables

This directory contains composables for managing table functionality.

## useTablePersistence

A composable for persisting table data to browser storage (localStorage or sessionStorage), ensuring that add/edit/delete operations survive page refreshes.

### Features

- **Automatic Persistence**: Automatically saves data to storage whenever it changes
- **Flexible Storage**: Choose between localStorage (persistent) or sessionStorage (session-only)
- **Restore on Mount**: Easily restore saved data when component mounts
- **Type-Safe**: Full TypeScript support with generics

### Basic Usage

```typescript
import { ref, onMounted } from 'vue';
import { useTablePersistence } from '@bsa/core-ui';

interface User {
    id: number;
    name: string;
    email: string;
}

const users = ref<User[]>([{ id: 1, name: 'John Doe', email: 'john@example.com' }]);

// Initialize persistence
const { restore, clear, hasStoredData } = useTablePersistence(users, {
    key: 'my-app-users',
    storage: 'local', // or 'session'
});

// Restore data on mount
onMounted(() => {
    restore();
});
```

### API

#### `useTablePersistence<T>(data: Ref<T[]>, config: PersistenceConfig)`

**Parameters:**

- `data` - A reactive ref containing an array of data to persist
- `config` - Configuration object:
    - `key` (required): Unique storage key for your data
    - `storage` (optional): Storage type - `'local'` (default) or `'session'`

**Returns:**

- `save()` - Manually save data to storage (auto-saves on changes)
- `restore()` - Load data from storage, returns `true` if data was found
- `clear()` - Remove data from storage
- `hasStoredData()` - Check if data exists in storage

### Complete Example

```vue
<template>
    <div>
        <BsaDataTable :data="users" :columns="columns" @add="handleAdd" @edit="handleEdit" @delete="handleDelete" />

        <!-- Reset button to clear stored data -->
        <button @click="resetToDefaults">Reset to Defaults</button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BsaDataTable, useTablePersistence } from '@bsa/core-ui';

interface User {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'inactive';
}

// Default data
const defaultUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
];

// Initialize with default data
const users = ref<User[]>([...defaultUsers]);

// Set up persistence
const { restore, clear, hasStoredData } = useTablePersistence(users, {
    key: 'my-app-users-table',
    storage: 'local', // Data persists across browser sessions
});

// Restore on mount
onMounted(() => {
    const restored = restore();
    if (restored) {
        console.log('✓ Data restored from localStorage');
    } else {
        console.log('ℹ Using default data');
    }
});

// Add new user
const handleAdd = (newUser: User) => {
    users.value.push(newUser);
    // Data automatically saved via watch in composable
};

// Edit existing user
const handleEdit = (id: number, updates: Partial<User>) => {
    const index = users.value.findIndex((u) => u.id === id);
    if (index !== -1) {
        users.value[index] = { ...users.value[index], ...updates };
        // Data automatically saved
    }
};

// Delete user
const handleDelete = (id: number) => {
    users.value = users.value.filter((u) => u.id !== id);
    // Data automatically saved
};

// Reset to defaults
const resetToDefaults = () => {
    clear(); // Clear storage
    users.value = [...defaultUsers]; // Reset to defaults
    console.log('✓ Data reset to defaults');
};

const columns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'status', header: 'Status' },
];
</script>
```

### Storage Options

#### localStorage (default)

- Data persists across browser sessions
- Survives page refreshes and browser restarts
- Shared across all tabs/windows of the same origin
- Use for data that should be remembered long-term

```typescript
useTablePersistence(data, {
    key: 'my-data',
    storage: 'local',
});
```

#### sessionStorage

- Data persists only for the current browser tab
- Cleared when tab is closed
- Not shared between tabs
- Use for temporary session data

```typescript
useTablePersistence(data, {
    key: 'my-temp-data',
    storage: 'session',
});
```

### Best Practices

1. **Unique Keys**: Use descriptive, unique keys to avoid conflicts

    ```typescript
    key: 'myapp-users-admin-table'; // Good
    key: 'data'; // Bad - too generic
    ```

2. **Handle Errors**: The composable catches errors internally, but check console for warnings

3. **Reset Option**: Always provide a way for users to reset to defaults

    ```typescript
    const resetData = () => {
        clear();
        data.value = [...defaultData];
    };
    ```

4. **Sensitive Data**: Don't persist sensitive information like passwords or tokens

    ```typescript
    // Bad - don't persist sensitive data
    const users = ref([{ id: 1, password: 'secret' }]);

    // Good - sanitize before storing
    const users = ref([{ id: 1, name: 'John' }]);
    ```

5. **Storage Limits**: Browser storage has size limits (~5-10MB)
    - Consider pagination for large datasets
    - Store only necessary data

### Testing

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useTablePersistence } from './useTablePersistence';

describe('useTablePersistence', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should save and restore data', () => {
        const data = ref([{ id: 1, name: 'Test' }]);
        const { restore, hasStoredData } = useTablePersistence(data, {
            key: 'test-key',
        });

        // Initially no stored data
        expect(hasStoredData()).toBe(true); // Auto-saved on init

        // Modify data
        data.value.push({ id: 2, name: 'Test 2' });

        // Create new instance and restore
        const newData = ref([]);
        const persistence = useTablePersistence(newData, { key: 'test-key' });
        persistence.restore();

        expect(newData.value).toHaveLength(2);
        expect(newData.value[1].name).toBe('Test 2');
    });
});
```

### Troubleshooting

**Data not persisting?**

- Check browser console for errors
- Verify storage key is unique
- Check browser storage limits
- Ensure data is JSON-serializable

**Data not restoring?**

- Call `restore()` in `onMounted()`
- Check storage key matches
- Verify browser has storage enabled

**Performance issues?**

- Debounce rapid updates if needed
- Consider storing only IDs for large datasets
- Use sessionStorage for temporary data
