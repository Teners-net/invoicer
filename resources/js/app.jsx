import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/inertia-react';
import { createRoot } from 'react-dom/client'
import { AppProvider } from './context';
import Confirmation from './Components/Modals/Confirmation';
import { Worker } from '@react-pdf-viewer/core';

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

    root.render(
      <AppProvider>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <App {...props} />
        </Worker>

        <Confirmation />
      </AppProvider>
    );
  },
}).then(cleanApp)
