import {
    memo,
    useReducer,
    useCallback,
    useRef,
    useEffect,
    type CSSProperties,
    type FC,
} from 'react';
import styles from './PetCard.module.scss';
import { ActionButton } from '../PetActions/ActionButton.styled';
import { useEventLog } from '../../hooks/useEventLog';
import { usePetLifecycle } from '../../hooks/usePetLifecycle';
import type { PetFromServer, PetState, PetAction, Mood } from './types';

const getMoodByEnergy = (energy: number): Mood => {
    if (energy === 0) return 'offline';
    if (energy <= 20) return 'sad';
    if (energy <= 60) return 'neutral';
    return 'happy';
};

const createInitialState = (pet: PetFromServer): PetState => {
    const energy = pet.energy;
    const mood = getMoodByEnergy(energy);

    return {
        ...pet,
        energy,
        mood,
        isOffline: energy === 0,
    };
};



const petReducer = (state: PetState, action: PetAction): PetState => {
    if (state.isOffline && action.type !== 'RESET') {
        return state;
    }

    switch (action.type) {
        case 'FEED': {
            const energy = Math.min(state.energy + 20, 100);
            const mood = getMoodByEnergy(energy);
            return { ...state, energy, mood };
        }
        case 'LEVEL_UP':
            return { ...state, level: state.level + 1 };

        case 'CHEER':
            return { ...state, mood: 'happy' };

        case 'RESET':
            // сбрасываем ровно к исходному PetFromServer
            return createInitialState(action.payload);

        case 'TICK': {
            if (state.energy === 0) {
                return { ...state, isOffline: true, mood: 'offline' };
            }

            const energy = Math.max(state.energy - 10, 0);
            const mood = getMoodByEnergy(energy);

            return { ...state, energy, mood, isOffline: energy === 0 };
        }

        case 'SET_OFFLINE':
            return { ...state, isOffline: true, mood: 'offline', energy: 0 };

        default:
            return state;
    }
};

interface PetCardProps {
    pet: PetFromServer;
}

const PetCardComponent: FC<PetCardProps> = ({ pet }) => {
    const [state, dispatch] = useReducer(petReducer, pet, createInitialState);

    const { addEvent } = useEventLog();
    const avatarRef = useRef<HTMLDivElement | null>(null);

    usePetLifecycle({ pet: state, dispatch, addEvent });

    useEffect(() => {
        if (!avatarRef.current) return;

        avatarRef.current.animate(
            [
                { transform: 'scale(1)' },
                { transform: 'scale(1.05)' },
                { transform: 'scale(1)' },
            ],
            { duration: 250 },
        );
    }, [state.mood]);

    const moodShadow: CSSProperties['boxShadow'] =
        state.mood === 'happy'
            ? '0 0 15px rgba(34,197,94,0.8)'
            : state.mood === 'sad'
                ? '0 0 15px rgba(248,113,113,0.8)'
                : '0 0 8px rgba(148,163,184,0.8)';

    const cardStyle: CSSProperties = {
        boxShadow: moodShadow,
        transition: 'box-shadow 0.3s ease',
    };

    const handleFeed = useCallback(() => {
        dispatch({ type: 'FEED' });
        addEvent(`[${state.name}] получил корм (+энергия)`);
    }, [addEvent, state.name]);

    const handleLevelUp = useCallback(() => {
        dispatch({ type: 'LEVEL_UP' });
        addEvent(`[${state.name}] повысил уровень до ${state.level + 1}`);
    }, [addEvent, state.name, state.level]);

    const handleCheer = useCallback(() => {
        dispatch({ type: 'CHEER' });
        addEvent(`[${state.name}] поглажен, настроение улучшилось`);
    }, [addEvent, state.name]);

    const handleReset = useCallback(() => {
        dispatch({ type: 'RESET', payload: pet });
        addEvent(`[${state.name}] сброшен до исходного состояния`);
    }, [addEvent, state.name, pet]);

    const disabled = state.isOffline;

    return (
        <div className={styles.card} style={cardStyle}>
            <div className={styles.header}>
                <div className={styles.avatar} ref={avatarRef}>
                    <img src={state.avatar} alt={state.name} />
                </div>
                <div className={styles.info}>
                    <div>{state.name}</div>
                    <div>Вид: {state.species}</div>
                    <div>Настроение: {state.mood}</div>
                </div>
            </div>

            <div className={styles.stats}>
                <span>Энергия: {state.energy}</span>
                <span>Уровень: {state.level}</span>
            </div>

            <div className={styles.actions}>
                <ActionButton onClick={handleFeed} disabled={disabled}>
                    Feed
                </ActionButton>
                <ActionButton onClick={handleLevelUp} disabled={disabled}>
                    Level Up
                </ActionButton>
                <ActionButton onClick={handleCheer} disabled={disabled}>
                    Cheer
                </ActionButton>
                <ActionButton $variant="danger" onClick={handleReset}>
                    Reset
                </ActionButton>
            </div>

            {state.isOffline && (
                <div className={styles.offlineOverlay}>OFFLINE</div>
            )}
        </div>
    );
};

export const PetCard = memo(PetCardComponent);
export default PetCard;
