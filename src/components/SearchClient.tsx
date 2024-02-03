import TextField from "@mui/material/TextField";

interface SearchClientProps {
    onSearch: (
        value: any,
        ) => void
}

export default function SearchClient({ onSearch }: SearchClientProps) {
 
    return (
        <TextField label="Procurar cliente"
            sx={{ minWidth: 100, width: 500 }}
            onChange={(event) => onSearch(event.target.value)}
        />
    );
}