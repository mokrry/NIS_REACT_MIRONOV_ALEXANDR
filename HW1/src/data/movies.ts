import type {Movie} from '../types';


export const initialMovies: Movie[] = [
    {
        id: 1,
        title: 'Хищник',
        year: 1987,
        posterUrl: 'https://i.pinimg.com/736x/19/7e/0b/197e0b82f3eeeef4b78532cb37c4ffa5.jpg',
        isFavorite: false,
    },
    {
        id: 2,
        title: 'Техасская резня бензопилой 4: Новое поколение',
        year: 1994 ,
        posterUrl: 'http://images-s.kinorium.com/movie/poster/101036/w1500_2693568.jpg',
        isFavorite: true,
    },
    {
        id: 3,
        title: 'Хеллоуин',
        year: 1978,
        posterUrl: 'https://i.pinimg.com/736x/04/a2/e0/04a2e08be1d02425384cd5c07766fbde.jpg',
        isFavorite: false,
    },
    {
        id: 4,
        title: 'Техасская резня бензопилой',
        year: 1974,
        posterUrl: 'https://i.pinimg.com/550x/c7/0b/06/c70b060b4b6c15c305dacf68cb7e0bfd.jpg',
        isFavorite: false,
    },
    {
        id: 5,
        title: 'Страшилка-пугалка',
        year: 4999,
        posterUrl: 'https://media1.tenor.com/m/rqmNGGiVT1MAAAAC/roblox-horror.gif',
        isFavorite: true,
    },
];