import { useState, useEffect } from 'react'; 
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Alert from '@mui/material/Alert';
import { ClientDTO } from "../data/DTO";

interface ClientListProps {
    data: ClientDTO[],
    searchTerm: string
}

export default function ClientList({ data, searchTerm }: ClientListProps) {
    const [filteredData, setFilteredData] = useState<ClientDTO[]>(data);

    useEffect(() => {
        const filtered = data.filter(client => client.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        setFilteredData(filtered)
    }, [data, searchTerm]);

    if (!filteredData.length) return <Alert severity="info" sx={{ marginBlockStart: '2em' }}>Sem dados para mostrar.</Alert>

    return (
        <List sx={{ width: '100%', maxWidth: '70vw', minHeight: 500, bgcolor: 'background.paper' }}>
            {filteredData.map((client: ClientDTO, i: number) => {
                const shouldDivide = i !== data.length - 1;
                return (
                    <>
                        <ListItem key={client.id} alignItems='flex-start' sx={{ paddingInlineStart: 0 }}>
                            <ListItemText 
                                primary={client.name}
                                secondary={`${client.email} | ${client.phone}`}
                            />
                        </ListItem>
                        {shouldDivide && <Divider variant="inset" component="li" sx={{ width: '70vw', marginInlineStart: 0 }}/>}
                    </>
                )
            })}
        </List>
    );
}