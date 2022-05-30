import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';

export default function LoadOneQuiz({ order, question, options, answer}) { 
    let s = -1;
    const [questionValue, setquestionValue] = React.useState(question);
    const [optionList, setoptionList] = React.useState(options);
    const [answerNum, setAnswer] = React.useState(answer);
    const [selected, setSelection] = React.useState(s);
    

/*
    const DeleteOption = (event) => {
        let options = [...optionList];
        if(options.length > 1) options = options.filter((e,idx) => idx!=event);
        if(selectedRadio && selectedRadio>=event) {
            setselectedRadio(selectedRadio => selectedRadio-1);
        }
        setoptionList(options);
    }

    const ChangeQuestion = (event) => {
        setquestionValue(event.target.value);
    }

    const ChangeOptionContents = (event) => {
        let idx = event.target.id.slice(-1);
        let options = [...optionList];
        options[idx] = event.target.value;
        setoptionList(options);
    }

    const handleRadioChange = (event) => {
        setselectedRadio(event);
    };
*/
    return (
        <Container 
        component="main" 
        maxWidth="xs"
        >
            <Box
                sx={{
                    mt: '10%', mb:'8%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems:'center',
                }}
            >
                <Typography>
                    Question {order}
                </Typography>
                <Typography
                    variant="h6">
                    {questionValue}
                </Typography>
            </Box>
                {optionList.map((value,idx) => (
                    <Stack key={idx} direction="row" spacing={0} mb = "5px">
                        <Button variant={selected == idx? "contained":"outlined"}
                                fullWidth
                                onClick={()=>{setSelection(idx); console.log(selected)}}>
                            {value}
                        </Button>
                    </Stack>
                ))}
        </Container>
    );
}