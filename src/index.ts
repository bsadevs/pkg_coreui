import type { App } from 'vue';
import './styles/core-ui.scss';
import * as components from './components';
export * from './components';

export function install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
        app.component(name, component as any);
    });
}

export default { install };
