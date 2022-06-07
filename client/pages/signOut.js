import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function SignOut() {
    const router = useRouter();

    useEffect(() => {
        if (sessionStorage.getItem('userCode')) {
            sessionStorage.removeItem('userCode');
            router.push({
                pathname: '/',
            }, `/Home`);
        } else {
            alert("There is no login information")
        }
    }, []);

    return (
        <Typography>SignOut</Typography>
    )
}