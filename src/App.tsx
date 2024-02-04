import './App.css'
import { useState } from 'react';
import { useSWRConfig } from 'swr'; 
import ClientList from './components/ClientList'
import SearchClient from './components/SearchClient'
import CreateClientDialog from './components/CreateClientDialog';
import { useClients } from './hooks/useClients';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import ItineraryModal from './components/ItineraryModal';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data, error, isLoading } = useClients('http://localhost:3000/clientes');
  const { mutate } = useSWRConfig();
 
  return (
    <>
      <ItineraryModal userData={data}/>
      <div className="upper-controls">
        <SearchClient onSearch={setSearchTerm} />
        <CreateClientDialog updateData={mutate} />
      </div>
      {
        isLoading ? 
        <CircularProgress sx={{ marginBlockStart: '2em' }} /> : 
        error ? 
        <Alert severity='error' sx={{ marginBlockStart: '2em' }}>{error.message}</Alert> : 
        <ClientList data={data} searchTerm={searchTerm}></ClientList>
      }
    </>
  )
}

export default App
