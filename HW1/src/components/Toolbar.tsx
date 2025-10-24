import { useRef } from 'react';
import { ViewMode } from '../types';


interface ToolbarProps {
    showOnlyFavs: boolean;
    onToggleFavFilter: (value: boolean) => void;
    onApplySearch: (query: string) => void;
    viewMode: ViewMode;
    onChangeView: (view: ViewMode) => void;
}


export default function Toolbar({
                                    showOnlyFavs,
                                    onToggleFavFilter,
                                    onApplySearch,
                                    viewMode,
                                    onChangeView,
                                }: ToolbarProps) {
    const inputRef = useRef<HTMLInputElement>(null);


    return (
        <div className="toolbar">
            <div className="filters">
                <button
                    className={!showOnlyFavs ? 'btn active' : 'btn'}
                    onClick={() => onToggleFavFilter(false)}
                >
                    Все
                </button>
                <button
                    className={showOnlyFavs ? 'btn active' : 'btn'}
                    onClick={() => onToggleFavFilter(true)}
                >
                    Только избранные
                </button>
            </div>


            <div className="search">
                <input ref={inputRef} type="text" placeholder="Поиск по названию" />
                <button className="btn" onClick={() => onApplySearch(inputRef.current?.value || '')}>
                    Найти
                </button>
            </div>


            <div className="view">
                <button
                    title="Плитка"
                    className={viewMode === ViewMode.GRID ? 'btn active' : 'btn'}
                    onClick={() => onChangeView(ViewMode.GRID)}
                >
                    Плитка
                </button>
                <button
                    title="Список"
                    className={viewMode === ViewMode.LIST ? 'btn active' : 'btn'}
                    onClick={() => onChangeView(ViewMode.LIST)}
                >
                    Список
                </button>
            </div>
        </div>
    );
}