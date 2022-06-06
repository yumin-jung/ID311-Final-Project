import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function SignOut() {
    const router = useRouter();

    useEffect(() => {
        if(sessionStorage.getItem('quizCode')) {
            sessionStorage.removeItem('quizCode');
            router.push({
                pathname: '/',
            }, `/Home`);
        }
    },[]);

    return(
        <Typography>SignOut</Typography>
    )
}