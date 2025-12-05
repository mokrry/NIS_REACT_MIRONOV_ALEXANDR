// src/components/PetCard/types.ts
export type Mood = 'happy' | 'neutral' | 'sad' | 'offline';

export type Species = 'cat' | 'dog' | 'fox' | 'dragon' | 'other';

export interface PetFromServer {
    id: number;
    name: string;
    species: Species;
    mood: Mood;
    energy: number; // 0–100
    level: number;
    avatar: string;
}

export interface PetState extends PetFromServer {
    isOffline: boolean;
}

export type PetAction =
    | { type: 'FEED' }
    | { type: 'LEVEL_UP' }
    | { type: 'CHEER' }
    | { type: 'RESET'; payload: PetFromServer }
    | { type: 'TICK' }
    | { type: 'SET_OFFLINE' };
