import { useEffect, useState } from 'react';
import { AllWords } from '../helpers/types';

export default function useFetch(url: string) {
    const [data, setData] = useState<null | AllWords[]>(null);
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            try {
                setLoading(true);
                setError(null);
                setData(null);

                const response = await fetch(url);
                if (!response.ok) throw new Error('Not possible to fetch');
                const data = await response.json();
                setData(data);
            } catch (err) {
                setError('Not possible to fetch');
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);

    return { data, error, loading };
}
