export interface Movie {
    id: number;
    title: string;
    year: number;
    posterUrl: string;
    isFavorite: boolean;
}


export enum ViewMode {
    GRID = 'GRID',
    LIST = 'LIST',
}