export interface Blog {
    id: string;
    title: string;
    description: string;
    content: string;
    date: string;
    category: string;
    tags: string[];
    author?: string;
    readingTime?: string;
    coverImage?: string;
}