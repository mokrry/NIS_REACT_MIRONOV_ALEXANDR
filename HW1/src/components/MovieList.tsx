import MovieCard from './MovieCard';
import {type Movie, ViewMode } from '../types';


interface MovieListProps {
    movies: Movie[];
    onToggleFavorite: (id: number) => void;
    viewMode: ViewMode;
}


export default function MovieList({ movies, onToggleFavorite, viewMode }: MovieListProps) {
    if (!movies.length) {
        return <div className="empty">Фильмов нет</div>;
    }


    return (
        <div className={viewMode === ViewMode.GRID ? 'grid' : 'list'}>
            {movies.map((m) => (
                <MovieCard key={m.id} movie={m} onToggleFavorite={onToggleFavorite} view={viewMode} />
            ))}
        </div>
    );
}