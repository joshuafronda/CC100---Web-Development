import React, { useState, useEffect } from 'react';

interface CompilerModalProps {
    onClose: () => void;
}

const STORAGE_KEY_HTML = 'compiler_html_code';
const STORAGE_KEY_CSS = 'compiler_css_code';

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

// Load saved code from localStorage or return default
const loadSavedCode = (key: string, defaultValue: string): string => {
    try {
        const saved = localStorage.getItem(key);
        return saved || defaultValue;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return defaultValue;
    }
};

// Save code to localStorage
const saveCode = (key: string, value: string): void => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

// Download file function
const downloadFile = (content: string, filename: string, mimeType: string): void => {
    try {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading file:', error);
        alert('Failed to download file. Please try again.');
    }
};

// Icons
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const CompilerModal: React.FC<CompilerModalProps> = ({ onClose }) => {
    // Load saved code from localStorage on mount, or use defaults
    const [htmlCode, setHtmlCode] = useState(() => loadSavedCode(STORAGE_KEY_HTML, defaultHtml));
    const [cssCode, setCssCode] = useState(() => loadSavedCode(STORAGE_KEY_CSS, defaultCss));
    const [srcDoc, setSrcDoc] = useState('');
    const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
    const [showDownloadMenu, setShowDownloadMenu] = useState(false);

    // Save to localStorage whenever code changes
    useEffect(() => {
        saveCode(STORAGE_KEY_HTML, htmlCode);
    }, [htmlCode]);

    useEffect(() => {
        saveCode(STORAGE_KEY_CSS, cssCode);
    }, [cssCode]);

    // Update preview with debounce
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

    // Download handlers
    const handleDownloadHTML = () => {
        const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My HTML Page</title>
    <style>
${cssCode}
    </style>
</head>
<body>
${htmlCode}
</body>
</html>`;
        downloadFile(fullHtml, 'index.html', 'text/html');
    };

    const handleDownloadCSS = () => {
        downloadFile(cssCode, 'styles.css', 'text/css');
    };

    const handleDownloadHTMLOnly = () => {
        const htmlOnly = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My HTML Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
${htmlCode}
</body>
</html>`;
        downloadFile(htmlOnly, 'index.html', 'text/html');
    };

    // Close download menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.relative.group')) {
                setShowDownloadMenu(false);
            }
        };

        if (showDownloadMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showDownloadMenu]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-50 flex items-center justify-center p-0 sm:p-2 md:p-4 transition-opacity" onClick={onClose}>
            <div className="bg-white dark:bg-neutral w-full h-full sm:max-w-7xl sm:rounded-lg sm:shadow-2xl flex flex-col overflow-hidden transition-colors duration-300" onClick={(e) => e.stopPropagation()}>
                <header className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 p-3 sm:p-4 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <CodeIcon />
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white truncate">Live HTML/CSS Editor</h3>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        {/* Download Buttons */}
                        <div className="hidden sm:flex items-center gap-2">
                            <button
                                onClick={handleDownloadHTML}
                                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                                title="Download complete HTML file"
                            >
                                <DownloadIcon />
                                <span className="hidden md:inline">Download</span>
                            </button>
                            <div className="relative group">
                                <button
                                    onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-600 hover:bg-gray-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                                    title="Download options"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                                <div className={`absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 transition-all duration-200 z-20 ${showDownloadMenu ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
                                    <button
                                        onClick={() => {
                                            handleDownloadHTMLOnly();
                                            setShowDownloadMenu(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-t-lg flex items-center gap-2 transition-colors"
                                    >
                                        <CodeIcon />
                                        HTML Only
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDownloadCSS();
                                            setShowDownloadMenu(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-b-lg flex items-center gap-2 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                        </svg>
                                        CSS Only
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Mobile Download Button */}
                        <button
                            onClick={handleDownloadHTML}
                            className="sm:hidden flex items-center gap-1 px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-all duration-200 shadow-sm active:scale-95"
                            title="Download HTML file"
                        >
                            <DownloadIcon />
                        </button>
                        <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex-shrink-0 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 active:scale-95" aria-label="Close editor">
                            <CloseIcon />
                        </button>
                    </div>
                </header>

                <div className="flex-grow flex flex-col lg:flex-row h-full min-h-0">
                    {/* Editor Panel */}
                    <div className="w-full lg:w-1/2 flex flex-col bg-gray-50 dark:bg-slate-900 min-h-0 border-r-0 lg:border-r border-gray-200 dark:border-slate-700">
                        <div className="flex border-b border-gray-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-slate-800">
                            <button 
                                className={`py-3 sm:py-2.5 px-4 sm:px-6 font-semibold text-sm transition-all flex-1 min-h-[48px] sm:min-h-[44px] flex items-center justify-center gap-2 ${activeTab === 'html' 
                                    ? 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-info border-b-2 border-blue-600 dark:border-info shadow-sm' 
                                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/70 active:bg-gray-100 dark:active:bg-slate-700'}`}
                                onClick={() => setActiveTab('html')}
                            >
                                <CodeIcon />
                                <span>HTML</span>
                            </button>
                            <button 
                                className={`py-3 sm:py-2.5 px-4 sm:px-6 font-semibold text-sm transition-all flex-1 min-h-[48px] sm:min-h-[44px] flex items-center justify-center gap-2 ${activeTab === 'css' 
                                    ? 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-info border-b-2 border-blue-600 dark:border-info shadow-sm' 
                                    : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/70 active:bg-gray-100 dark:active:bg-slate-700'}`}
                                onClick={() => setActiveTab('css')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                                <span>CSS</span>
                            </button>
                        </div>
                        {/* Mobile Download Buttons */}
                        <div className="sm:hidden flex items-center gap-2 p-2 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 flex-shrink-0">
                            <button
                                onClick={handleDownloadHTMLOnly}
                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md transition-all active:scale-95"
                            >
                                <CodeIcon />
                                HTML
                            </button>
                            <button
                                onClick={handleDownloadCSS}
                                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md transition-all active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                                CSS
                            </button>
                        </div>
                        <div className="flex-grow relative min-h-0">
                           <textarea
                                hidden={activeTab !== 'html'}
                                value={htmlCode}
                                onChange={(e) => setHtmlCode(e.target.value)}
                                className="w-full h-full p-4 sm:p-5 bg-transparent text-gray-800 dark:text-slate-300 font-mono text-sm sm:text-sm resize-none focus:outline-none absolute inset-0 overflow-auto leading-relaxed"
                                placeholder="<!-- Write your HTML code here -->"
                                spellCheck="false"
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="off"
                                data-gramm="false"
                                data-gramm_editor="false"
                                data-enable-grammarly="false"
                            />
                             <textarea
                                hidden={activeTab !== 'css'}
                                value={cssCode}
                                onChange={(e) => setCssCode(e.target.value)}
                                className="w-full h-full p-4 sm:p-5 bg-transparent text-gray-800 dark:text-slate-300 font-mono text-sm sm:text-sm resize-none focus:outline-none absolute inset-0 overflow-auto leading-relaxed"
                                placeholder="/* Write your CSS code here */"
                                spellCheck="false"
                                autoCapitalize="off"
                                autoCorrect="off"
                                autoComplete="off"
                                data-gramm="false"
                                data-gramm_editor="false"
                                data-enable-grammarly="false"
                            />
                        </div>
                    </div>
                    
                    {/* Preview Panel */}
                    <div className="w-full lg:w-1/2 h-[35vh] min-h-[250px] sm:h-[42vh] md:h-[45vh] lg:h-full lg:min-h-0 border-t-4 lg:border-t-0 lg:border-l-4 border-gray-300 dark:border-slate-700 flex-shrink-0 lg:flex-shrink bg-gray-100 dark:bg-slate-950">
                        <div className="w-full h-full relative">
                            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 px-2 py-1 bg-white dark:bg-slate-800 rounded-md shadow-sm border border-gray-200 dark:border-slate-700">
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Live Preview</span>
                            </div>
                            <iframe
                                srcDoc={srcDoc}
                                title="Live Preview"
                                sandbox="allow-scripts"
                                frameBorder="0"
                                className="w-full h-full bg-white absolute inset-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompilerModal;