import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export const useClients = (url: string) => {
    const { data, error, isLoading } = useSWR(url, fetcher);
    
    return {
        data,
        error,
        isLoading
    }
}