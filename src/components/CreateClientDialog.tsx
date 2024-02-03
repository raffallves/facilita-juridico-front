import { FormEvent, SyntheticEvent, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SnackBar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { ClientDTO } from '../data/DTO';

interface ResultState {
    open: boolean,
    severity: 'error'| 'info' | 'success' | 'warning',
    message: string
}

export default function CreateClientDialog({ updateData }: { updateData: (url: string) => void }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultState, setResultState] = useState<ResultState>({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleclickOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleOpenSnackbar = (message: string, severity?: ResultState['severity']) => {
        if (!severity) {
            setResultState({  ...resultState, open: true, message: message });
            return;
        } 
        setResultState({  open: true, message: message, severity: severity });
    }

    const handleCloseSnackBar = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;

        setResultState({ ...resultState, open: false });
    }

    const submit = async (data: ClientDTO) => {
        try {
            setLoading(true);
            const res = await fetch('http://localhost:3000/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                throw new Error(`Houve um erro ao cadastrar o novo cliente. ${res.status}`);
            }

            setLoading(false);
            handleOpenSnackbar('Cliente cadastrado com sucesso!', 'success');
            updateData('http://localhost:3000/clientes');
            handleCloseDialog();

        } catch (error: any) {
            setLoading(false);
            handleOpenSnackbar(`Parece que ocorreu um erro: ${error.message}`, 'error');
        }
    }

    return (
        <>
            <SnackBar 
                open={resultState.open}
                onClose={handleCloseSnackBar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={8000}
            >
                <Alert
                    onClose={handleCloseSnackBar}
                    severity={resultState.severity}
                    sx={{ width: '100%' }}
                    variant='filled'
                >
                    {resultState.message}
                </Alert>
            </SnackBar>
            <Button 
                variant='contained' 
                size="small" 
                onClick={handleclickOpenDialog}
                sx={{ margin: '0 2em 0 2em', minWidth: 'auto' }}
            >
                Cadastrar
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson: ClientDTO = {
                            name: formData.get('name') as string,
                            email: formData.get('email') as string,
                            phone: formData.get('phone') as string,
                            location: {
                                x: Number(formData.get('coord-x')),
                                y: Number(formData.get('coord-y'))
                            }
                        };

                        await submit(formJson);
                    }
                }}
            >
                <DialogTitle>Adicionar novo cliente</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Preencha os campos abaixo e clique em "Cadastrar" para adicionar um novo cliente.
                    </DialogContentText>
                    <TextField 
                        autoFocus
                        required
                        margin='dense'
                        name='name'
                        label='Nome Completo'
                        type='text'
                        fullWidth
                        variant='standard'
                    />
                    <TextField 
                        autoFocus
                        required
                        margin='dense'
                        name='email'
                        label='Email'
                        type='email'
                        fullWidth
                        variant='standard'
                    />
                    <TextField 
                        autoFocus
                        required
                        margin='dense'
                        name='phone'
                        label='Telefone'
                        type='text'
                        fullWidth
                        variant='standard'
                    />
                    <div 
                        style={{ 
                            display: 'flex', 
                            flexDirection: 'row', 
                            justifyContent: 'space-evenly',
                            marginBlockEnd: '50px' 
                        }}
                        >
                        <TextField 
                            autoFocus
                            required
                            margin='dense'
                            name='coord-x'
                            label='Coordenada X'
                            type='number'
                            variant='standard'
                        />
                        <TextField 
                            autoFocus
                            required
                            margin='dense'
                            name='coord-y'
                            label='Coordenada Y'
                            type='number'
                            variant='standard'
                        />
                    </div>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancelar</Button>
                        <LoadingButton loading={loading} type='submit' variant='contained'>
                            <span>Cadastrar</span>
                        </LoadingButton>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
}