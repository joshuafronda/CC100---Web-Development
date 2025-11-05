import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Content from './components/Content';
import CompilerModal from './components/CompilerModal';
import { reviewerContent } from './constants';

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

function App() {
    const [isCompilerOpen, setIsCompilerOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-300 font-sans transition-colors duration-300">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
                <Content sections={reviewerContent} />
            </main>
            
            <button
                onClick={() => setIsCompilerOpen(true)}
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-10 lg:right-10 bg-accent hover:bg-blue-500 text-white font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex items-center space-x-2 z-40 text-sm sm:text-base"
                aria-label="Open Code Editor"
            >
                <CodeIcon />
                <span className="hidden sm:inline">Try It Live</span>
            </button>

            {isCompilerOpen && (
                <CompilerModal onClose={() => setIsCompilerOpen(false)} />
            )}
        </div>
    );
}

export default App;