import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Message = ({ userName, comment }) => {
    const deleteComment = (event) => {
        console.log(event)
    }
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={deleteComment}>
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