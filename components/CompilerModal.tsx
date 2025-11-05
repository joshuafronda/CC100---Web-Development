import React, { useState, useEffect } from 'react';

interface CompilerModalProps {
    onClose: () => void;
}

const defaultHtml = `<!-- Welcome to the Live Editor! -->
<!-- Edit the HTML here -->
<div class="container">
  <h1>Hello, World!</h1>
  <p>You can write HTML and CSS here and see the result live.</p>
  <button class="button">Click Me</button>
</div>
`;

const defaultCss = `/* Edit the CSS here */
body {
  font-family: sans-serif;
  background-color: #f0f4f8;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.button {
  background-color: #3b82f6; /* Tailwind's blue-500 */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #2563eb; /* Tailwind's blue-600 */
}
`;

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CompilerModal: React.FC<CompilerModalProps> = ({ onClose }) => {
    const [htmlCode, setHtmlCode] = useState(defaultHtml);
    const [cssCode, setCssCode] = useState(defaultCss);
    const [srcDoc, setSrcDoc] = useState('');
    const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <head>
                        <style>${cssCode}</style>
                    </head>
                    <body>${htmlCode}</body>
                </html>
            `);
        }, 250);

        return () => clearTimeout(timeout);
    }, [htmlCode, cssCode]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 flex items-center justify-center p-4 transition-opacity" onClick={onClose}>
            <div className="bg-white dark:bg-neutral w-full h-full max-w-7xl rounded-lg shadow-2xl flex flex-col overflow-hidden transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
                <header className="flex items-center justify-between bg-gray-50 dark:bg-slate-800 p-3 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Live HTML/CSS Editor</h3>
                    <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <CloseIcon />
                    </button>
                </header>

                <div className="flex-grow flex flex-col md:flex-row h-full min-h-0">
                    {/* Editor Panel */}
                    <div className="w-full md:w-1/2 flex flex-col bg-gray-100 dark:bg-slate-900">
                        <div className="flex border-b border-gray-200 dark:border-slate-700">
                            <button 
                                className={`py-2 px-4 font-medium text-sm transition-all ${activeTab === 'html' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-info border-b-2 border-blue-600 dark:border-info' : 'text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-800/50'}`}
                                onClick={() => setActiveTab('html')}
                            >
                                HTML
                            </button>
                             <button 
                                className={`py-2 px-4 font-medium text-sm transition-all ${activeTab === 'css' ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-info border-b-2 border-blue-600 dark:border-info' : 'text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-800/50'}`}
                                onClick={() => setActiveTab('css')}
                            >
                                CSS
                            </button>
                        </div>
                        <div className="flex-grow relative">
                           <textarea
                                hidden={activeTab !== 'html'}
                                value={htmlCode}
                                onChange={(e) => setHtmlCode(e.target.value)}
                                className="w-full h-full p-4 bg-transparent text-gray-800 dark:text-slate-300 font-mono text-sm resize-none focus:outline-none absolute inset-0"
                                placeholder="HTML Code"
                                spellCheck="false"
                            />
                             <textarea
                                hidden={activeTab !== 'css'}
                                value={cssCode}
                                onChange={(e) => setCssCode(e.target.value)}
                                className="w-full h-full p-4 bg-transparent text-gray-800 dark:text-slate-300 font-mono text-sm resize-none focus:outline-none absolute inset-0"
                                placeholder="CSS Code"
                                spellCheck="false"
                            />
                        </div>
                    </div>
                    
                    {/* Preview Panel */}
                    <div className="w-full md:w-1/2 h-1/2 md:h-full border-t-4 md:border-t-0 md:border-l-4 border-gray-300 dark:border-slate-700">
                        <iframe
                            srcDoc={srcDoc}
                            title="Live Preview"
                            sandbox="allow-scripts"
                            frameBorder="0"
                            className="w-full h-full bg-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompilerModal;