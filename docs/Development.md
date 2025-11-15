# Bsa CoreUI Components Documentation

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
import BsaCoreui from '@bsasolutions/coreui';
import PrimeVue from 'primevue/config';

// Import styles
import '@bsasolutions/coreui/styles';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue);
app.use(BsaCoreui);

app.mount('#app');
```

### 3. Configure TailwindCSS

```javascript
// tailwind.config.js
export default {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
        './node_modules/@bsasolutions/coreui/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

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
