import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const DEPLOY_SERVER_URL = 'https://id311-server.herokuapp.com';
const LOCAL_SERVER_URL = 'http://localhost:8080';

const Message = ({ userName, comment }) => {
    const router = useRouter();

    const deleteMessage = (event) => {
        event.preventDefault();

        const msgInfo = {
            nickname: userName,
            message: comment
        }

        axios.post(LOCAL_SERVER_URL + '/api/messages/deleteMessage', msgInfo)
            .then(response => {
                if (!response.data.success) {
                    alert('Failed to delete message')
                }
            })

        window.location.replace(window.location.href);
    }

    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={deleteMessage}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemButton role={undefined} dense>
                <ListItemText primary={`${userName}`} />
                <ListItemText primary={`${comment}`} />
            </ListItemButton>
        </ListItem>
    );
}

export default Message