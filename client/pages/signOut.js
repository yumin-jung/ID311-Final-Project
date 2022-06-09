import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function SignOut() {
    const router = useRouter();
    const { setIsUser } = useContext(AppContext);

    useEffect(() => {
        setIsUser(false);
        router.push('/');
    }, []);
}