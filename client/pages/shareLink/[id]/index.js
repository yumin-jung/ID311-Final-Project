import React, { useEffect, useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip'
import { Typography } from '@mui/material';
import { AppContext } from '../../../context/AppContext';
import Nav from '../../../components/Nav';

const DEPLOY_CLIENT_URL = 'https://id311.vercel.app'
const LOCAL_CLIENT_URL = 'http://localhost:3000'

export default function ShareLink() {
    const { isUser, quizCode } = useContext(AppContext);
    const [copiedLink, setcopiedLink] = useState(``);

    const CopyLink = () => {
        console.log(copiedLink);
        setcopiedLink(`my code : ${quizCode}\ngo to here : ${DEPLOY_CLIENT_URL}`);
    }
    useEffect(()=> {
    })

    return (
        <>
            <Nav isUser={isUser} quizCode={quizCode} />
            <Container maxWidth="xs" sx={{ mt: 10 }}>
                <Typography align='center' variant='h2'>
                    {quizCode}
                </Typography>
                <CopyToClipboard
                    text={copiedLink}
                    onCopy={CopyLink}>
                    <Tooltip
                        title={copiedLink == `my code : ${quizCode}\ngo to here : ${DEPLOY_CLIENT_URL}`
                            ? "Paste your quiz"
                            : "Copy your quiz"
                        }
                        placement='bottom'
                    >
                        <Button fullWidth>
                            Share your quiz
                        </Button>
                    </Tooltip>
                </CopyToClipboard>
            </Container>
        </>
    )
}