// src/context/EventContext.ts
import { createContext } from 'react';

export interface EventContextValue {
    events: string[];
    addEvent: (event: string) => void;
    clearEvents: () => void;
}

export const EventContext = createContext<EventContextValue | null>(null);
