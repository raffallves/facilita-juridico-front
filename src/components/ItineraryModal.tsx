import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ClientDTO } from '../data/DTO';
import { Alert, CircularProgress, List, ListItem } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    maxHeight: '80vh',
    overflowY: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type ItineraryModalProps = {
    userData: ClientDTO[]
}

interface ItineraryData {
    id: string,
    name: string,
    coordinates: string,
    distance: string
}

export default function ItineraryModal({ userData }: ItineraryModalProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [itinerary, setItinerary] = useState<ItineraryData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null)

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    useEffect(() => {
        const fetchData = async (userData: ClientDTO[]) => {
            if (modalOpen) {
                setLoading(true);
                try {
                    const res = await fetch('http://localhost:3000/algo', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    });
    
                    if (!res.ok) {
                        throw new Error(`Houve um erro no cálculo: ${res.statusText}`);
                    }
                    
                    const itineraryData = await res.json();
                    
                    setItinerary(itineraryData);
                    setLoading(false);
                } catch (error: any) {
                    console.error(error.message);
                    setLoading(false);
                    setError(error);
                }
            }
        }

        fetchData(userData);
    }, [userData, modalOpen]);

    return (
        <>
            <Button onClick={handleModalOpen}>Calcular Itinerário</Button>
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
            >
                <Box sx={style}>
                    <Typography variant='h6' component='h2'>
                        {loading ? 'Calculando itinerário' : 'Itinerário'}
                    </Typography>
                    {
                        loading ?
                        <CircularProgress sx={{ marginBlockStart: '2em' }} /> :
                        error ?
                        <Alert severity='error' sx={{ marginBlockStart: '2em' }}>{error.message}</Alert> :
                        <List>
                            {itinerary.map(client => (
                                <ListItem key={client.id}>
                                    {`${client.name} ${client.coordinates} — ${client.distance}`}
                                </ListItem>
                            ))}
                        </List>
                    }
                </Box>
            </Modal>
        </>
    );
}