import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

const StackComponent = () => {
    const DeleteQuiz = (event) => {
        console.log(event)
    }
    return (
        <Stack direction="row" spacing={0}>
            <Typography component="h1" variant="h5">
                Personal Quiz
            </Typography>
            <IconButton
                onClick={DeleteQuiz}
                size="small"
            >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Stack>)
}
export default StackComponent