import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const asciiArt = `
%c
██████╗ ██████╗  █████╗ ██████╗ ██╗   ██╗██╗   ██╗███╗   ███╗███╗   ██╗
██╔══██╗██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝██║   ██║████╗ ████║████╗  ██║
██████╔╝██████╔╝███████║██║  ██║ ╚████╔╝ ██║   ██║██╔████╔██║██╔██╗ ██║
██╔═══╝ ██╔══██╗██╔══██║██║  ██║  ╚██╔╝  ██║   ██║██║╚██╔╝██║██║╚██╗██║
██║     ██║  ██║██║  ██║██████╔╝   ██║   ╚██████╔╝██║ ╚═╝ ██║██║ ╚████║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝    ╚═╝    ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═══╝
                    // THE ARCHIVIST
`;
console.log(
  asciiArt,
  'color: #c8a96e; font-family: monospace; font-size: 10px;'
);
console.log(
  '%c⚠ YOU HAVE ACCESSED THE SOURCE LAYER.',
  'color: #c8a96e; font-family: monospace; font-size: 13px; font-weight: bold; letter-spacing: 0.2em;'
);
console.log(
  '%cIF YOU ARE READING THIS, YOU KNOW WHAT YOU ARE DOING.',
  'color: rgba(200,169,110,0.6); font-family: monospace; font-size: 11px; letter-spacing: 0.15em;'
);
console.log(
  '%cHIRE ME → pradyumnkrshukla.4672@gmail.com',
  'color: rgba(200,169,110,0.9); font-family: monospace; font-size: 12px; letter-spacing: 0.1em; text-decoration: underline;'
);
console.log(
  '%c// ARCHIVE DEPTH: CLASSIFIED // NODE: ACTIVE //',
  'color: rgba(200,169,110,0.3); font-family: monospace; font-size: 9px; letter-spacing: 0.2em;'
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
