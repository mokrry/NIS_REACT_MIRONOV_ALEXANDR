import { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import type { EventContextValue } from '../context/EventContext';

export const useEventLog = (): EventContextValue => {
    const ctx = useContext(EventContext);
    if (!ctx) {
        throw new Error('useEventLog must be used inside <EventProvider>');
    }
    return ctx;
};
