import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import Toolbar from './components/Toolbar';
import { initialMovies } from './data/movies';
import type { Movie } from './types';
import { ViewMode } from './types';
import './styles.css';

const LS_KEY = 'favoriteMovieIds';

export default function App() {
    const [movies, setMovies] = useState<Movie[]>(() => {
        try {
            const raw = localStorage.getItem(LS_KEY);
            if (!raw) return initialMovies;
            const favIds = new Set<number>(JSON.parse(raw) as number[]);
            return initialMovies.map(m => ({ ...m, isFavorite: favIds.has(m.id) }));
        } catch {
            return initialMovies;
        }
    });

    const [showOnlyFavs, setShowOnlyFavs] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.GRID);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const favIds = movies.filter(m => m.isFavorite).map(m => m.id);
        localStorage.setItem(LS_KEY, JSON.stringify(favIds));
    }, [movies]);

    const toggleFavorite = (id: number) => {
        setMovies(prev =>
            prev.map(m => (m.id === id ? { ...m, isFavorite: !m.isFavorite } : m))
        );
    };

    const applySearch = (query: string) => setSearchTerm(query.trim());

    const visibleMovies = movies
        .filter(m => (showOnlyFavs ? m.isFavorite : true))
        .filter(m => (searchTerm ? m.title.toLowerCase().includes(searchTerm.toLowerCase()) : true));

    return (
        <div className="app">
            <header className="header"><h1>Каталог фильмов</h1></header>

            <Toolbar
                showOnlyFavs={showOnlyFavs}
                onToggleFavFilter={setShowOnlyFavs}
                onApplySearch={applySearch}
                viewMode={viewMode}
                onChangeView={setViewMode}
            />

            <main>
                <MovieList movies={visibleMovies} onToggleFavorite={toggleFavorite} viewMode={viewMode} />
            </main>
        </div>
    );
}
