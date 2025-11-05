
export interface ContentItem {
    type: 'paragraph' | 'list' | 'code' | 'image' | 'quote' | 'table';
    content: string | string[] | { language: string; code: string } | { src: string; alt: string } | { text: string; source?: string } | string[][];
}

export interface Section {
    id: string;
    title: string;
    items: ContentItem[];
}
