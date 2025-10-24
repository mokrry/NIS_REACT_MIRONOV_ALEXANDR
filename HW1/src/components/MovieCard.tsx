import type {Movie} from '../types';


interface MovieCardProps {
    movie: Movie;
    onToggleFavorite: (id: number) => void;
    view: 'GRID' | 'LIST';
}


export default function MovieCard({ movie, onToggleFavorite, view }: MovieCardProps) {
    return (
        <div className={view === 'GRID' ? 'card card-grid' : 'card card-list'}>
            <img className="poster" src={movie.posterUrl} alt={`${movie.title} poster`} />
            <div className="info">
                <div className="title-row">
                    <h3 className="title">{movie.title}</h3>
                    <button
                        className={movie.isFavorite ? 'star active' : 'star'}
                        aria-label="Добавить в избранное"
                        onClick={() => onToggleFavorite(movie.id)}
                    >
                        ⭐
                    </button>
                </div>
                <p className="year">{movie.year}</p>
            </div>
        </div>
    );
}