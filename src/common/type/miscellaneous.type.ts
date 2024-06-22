import { fabric } from 'fabric';

export type ImageProviderType = 'app' | 'pexels' | 'pixabay' | 'unsplash';

export type Services = {
    projects: ApiService<ProjectType>;
    images: Record<ImageProviderType, ApiService<ImageType>>; // To load images gallery (of any provider) from the server
}

export type ApiService<T = any> = {
    getMany?: (query: QueryType) => Promise<{ items: T[], totalCount: number }>
    getOne?: (id: string | number) => Promise<T | undefined>
    create?: (data: T) => Promise<T | undefined>
    update?: (id: string | number, data: T) => Promise<T | undefined>
    delete?: (id: string | number) => Promise<string | number | undefined>
}

export type DataType<T = any> = {
    items?: T[];
    totalCount?: number;
}

export type ProjectsDataType = DataType<ProjectType> & {
    selectionsIds: (string | number)[];
}

export type ProjectType = {
    id?: string;
    name?: string;
    description?: string;
    type?: string | 'TEMPLATE' | 'CUSTOM';
    image?: { src?: string, alt?: string };
    pages?: PageType[];
};

export type ImageType = {
    id?: string;
    name?: string;
    description?: string;
    provider?: string | 'PEXELS' | 'PIXABAY' | 'UNSPLASH';
    src?: string,
    alt?: string;
};

export type PageType = {
    id?: string;
    name?: string;
    description?: string;
    image?: { src?: string, alt?: string };
    objects?: ObjectDataType[];
};

export type QueryType = { [key: string]: string | number };

export type ObjectDataType = fabric.Object & {
    id: string;
    sortOrder: number;
}


