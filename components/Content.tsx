import React from 'react';
import { Section, ContentItem } from '../types';

interface ContentProps {
    sections: Section[];
}

// Helper function to safely parse markdown-style bold text into <strong> elements
const parseBoldText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) => {
        // Every second part is the one that was between **
        if (i % 2 === 1) {
            return <strong key={i}>{part}</strong>;
        }
        return part;
    });
};

const renderContentItem = (item: ContentItem, index: number) => {
    switch (item.type) {
        case 'paragraph':
            return <p key={index} className="mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{parseBoldText(item.content as string)}</p>;
        case 'list':
            return (
                <ul key={index} className="list-disc list-inside mb-3 sm:mb-4 pl-2 sm:pl-4 space-y-1 sm:space-y-2 text-sm sm:text-base">
                    {(item.content as string[]).map((li, i) => (
                        <li key={i}>{parseBoldText(li)}</li>
                    ))}
                </ul>
            );
        case 'code':
            const { language, code } = item.content as { language: string; code: string };
            return (
                <div key={index} className="bg-gray-100 dark:bg-slate-800 rounded-lg my-3 sm:my-4 shadow-inner overflow-hidden">
                    <div className="bg-gray-200 dark:bg-slate-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-t-lg text-xs sm:text-sm text-gray-600 dark:text-slate-400 font-semibold">{language}</div>
                    <pre className="p-3 sm:p-4 text-xs sm:text-sm overflow-x-auto text-gray-800 dark:text-slate-300">
                        <code>{code}</code>
                    </pre>
                </div>
            );
        case 'quote':
            const { text, source } = item.content as { text: string; source?: string };
            return (
                 <blockquote key={index} className="my-3 sm:my-4 p-3 sm:p-4 border-l-4 border-accent bg-blue-50 dark:bg-slate-800 italic text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    <p className="mb-2">"{text}"</p>
                    {source && <footer className="text-right text-xs sm:text-sm text-gray-500 dark:text-slate-400">- {source}</footer>}
                </blockquote>
            );
        case 'table':
             const rows = item.content as string[][];
             const header = rows[0];
             const body = rows.slice(1);
             return (
                <div key={index} className="my-3 sm:my-4 overflow-x-auto -mx-4 sm:mx-0">
                    <table className="w-full text-left border-collapse bg-white dark:bg-slate-800 rounded-lg shadow-sm min-w-full">
                        <thead>
                            <tr>
                                {header.map((h, i) => <th key={i} className="border-b border-gray-200 dark:border-slate-600 p-2 sm:p-3 bg-gray-100 dark:bg-slate-700 text-xs sm:text-sm">{h}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {body.map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-700/50">
                                    {row.map((cell, j) => <td key={j} className="border-b border-gray-200 dark:border-slate-700 p-2 sm:p-3 text-xs sm:text-sm">{cell}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             );
        default:
            return null;
    }
};

const Content: React.FC<ContentProps> = ({ sections }) => {
    return (
        <div className="max-w-4xl mx-auto">
            {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-8 sm:mb-12 p-4 sm:p-6 bg-white dark:bg-slate-800/50 rounded-lg shadow-md transition-colors duration-300">
                    <h2 className="text-xl sm:text-2xl font-bold text-primary dark:text-info mb-4 sm:mb-6 pb-2 border-b-2 border-gray-200 dark:border-slate-600">{section.title}</h2>
                    <div>
                        {section.items.map(renderContentItem)}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Content;