// src/pages/Dashboard.tsx
import { useEffect, useMemo, useState } from 'react';
import {
    GridLegacy as Grid,
    Skeleton,
    FormControl,
    InputLabel,
    MenuItem,
    Box,
    Button,
} from '@mui/material';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import PetCard from '../components/PetCard/PetCard';
import EventLog from '../components/EventLog/EventLog';
import type { PetFromServer, Species } from '../components/PetCard/types';
import petsData from '../data/pets.json';

type FilterValue = Species | 'all';

export const Dashboard = () => {
    const [pets, setPets] = useState<PetFromServer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<FilterValue>('all');

    // имитация загрузки с задержкой
    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setPets(petsData as PetFromServer[]);
            setLoading(false);
        }, 1200);

        return () => window.clearTimeout(timeoutId);
    }, []);

    // обработчик изменения фильтра
    const handleFilterChange = (event: SelectChangeEvent<FilterValue>): void => {
        setFilter(event.target.value as FilterValue);
    };

    // список доступных видов (species), посчитанный из данных
    const speciesOptions = useMemo<Species[]>(() => {
        const set = new Set<Species>();
        pets.forEach(pet => set.add(pet.species));
        return Array.from(set);
    }, [pets]);

    // отфильтрованный список питомцев
    const filteredPets = useMemo<PetFromServer[]>(() => {
        if (filter === 'all') return pets;
        return pets.filter(pet => pet.species === filter);
    }, [pets, filter]);

    return (
        <div className="dashboard">
            <Box>
                {/* панель фильтрации */}
                <Box display="flex" gap={2} mb={2} alignItems="center">
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel id="species-filter-label">Фильтр по виду</InputLabel>
                        <Select<FilterValue>
                            labelId="species-filter-label"
                            label="Фильтр по виду"
                            value={filter}
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="all">Все</MenuItem>
                            {speciesOptions.map(species => (
                                <MenuItem key={species} value={species}>
                                    {species}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        variant="outlined"
                        onClick={() => setFilter('all')}
                    >
                        Сбросить фильтр
                    </Button>
                </Box>

                {/* список карточек питомцев */}
                {loading ? (
                    <Grid container spacing={2}>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Skeleton variant="rectangular" height={200} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={2} className="petsGrid">
                        {filteredPets.map(pet => (
                            <Grid item xs={12} sm={6} md={4} key={pet.id}>
                                <PetCard pet={pet} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            {/* правая колонка — лог событий */}
            <EventLog />
        </div>
    );
};

export default Dashboard;
