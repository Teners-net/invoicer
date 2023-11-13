import './bootstrap';
import '../css/app.css';

// import { createInertiaApp } from '@inertiajs/react'
import { createInertiaApp } from '@inertiajs/inertia-react';
import { createRoot } from 'react-dom/client'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

const cleanApp = () => {
  document.getElementById('app').removeAttribute('data-page')
}
document.addEventListener('inertia:finish', cleanApp)

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    return pages[`./Pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
}).then(cleanApp)