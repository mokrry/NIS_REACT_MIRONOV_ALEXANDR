import { useEffect, type Dispatch } from 'react';
import type { PetState, PetAction } from '../components/PetCard/types';

interface UsePetLifecycleParams {
    pet: PetState;
    dispatch: Dispatch<PetAction>;
    addEvent: (event: string) => void;
    intervalMs?: number;
}

export const usePetLifecycle = ({
                                    pet,
                                    dispatch,
                                    addEvent,
                                    intervalMs = 5000,
                                }: UsePetLifecycleParams): void => {
    useEffect(() => {
        if (pet.isOffline) return;

        const id = window.setInterval(() => {
            dispatch({ type: 'TICK' });
        }, intervalMs);

        return () => window.clearInterval(id);
    }, [pet.isOffline, dispatch, intervalMs]);

    useEffect(() => {
        if (pet.energy === 0 && !pet.isOffline) {
            addEvent(`[${pet.name}] энергия исчерпана, питомец отключился`);
            dispatch({ type: 'SET_OFFLINE' });
        }
    }, [pet.energy, pet.isOffline, pet.name, addEvent, dispatch]);
};
