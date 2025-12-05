import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { useEventLog } from '../../hooks/useEventLog';

export const EventLog: React.FC = () => {
    const { events, clearEvents } = useEventLog();

    return (
        <Paper elevation={3} sx={{ padding: 2, maxHeight: '80vh', overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Event Log
            </Typography>

            <Button
                onClick={clearEvents}
                size="small"
                variant="outlined"
                sx={{ marginBottom: 2 }}
            >
                Очистить лог
            </Button>

            {events.length === 0 ? (
                <Typography variant="body2">Событий пока нет.</Typography>
            ) : (
                <List dense>
                    {events.map((e, idx) => (
                        <ListItem key={idx}>
                            <ListItemText primary={e} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );
};

export default EventLog;
