import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as AppComponents from './App';
import './index.css';

// दोनों तरीक़ों (default या named) को सपोर्ट करेगा ताकि कभी एरर न आए
const AppComponent = AppComponents.default || (AppComponents as any).App;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppComponent />
  </StrictMode>
);
