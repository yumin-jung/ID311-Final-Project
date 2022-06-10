import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';

export default function MakeOneQuiz({ order, question, presetOptions, presetRadio, loadData }) {
    const [questionValue, setquestionValue] = useState(question);
    const [optionList, setoptionList] = useState(presetOptions);
    const [selectedRadio, setselectedRadio] = useState(presetRadio);

    loadData(order - 1, { question: questionValue, options: optionList, selected: selectedRadio });

    // Add quiz problem
    const AddOption = () => {
        let options = [...optionList];
        options.push('');
        setoptionList(options);
    };

    // Delete quiz problem
    const DeleteOption = (event) => {
        let options = [...optionList];
        if (options.length > 1) options = options.filter((e, idx) => idx != event);
        if (selectedRadio && selectedRadio >= event) {
            setselectedRadio(selectedRadio => selectedRadio - 1);
        }
        setoptionList(options);
    }

    // Change quiz question
    const ChangeQuestion = (event) => {
        setquestionValue(event.target.value);
    }

    // Change quiz option
    const ChangeOptionContents = (event) => {
        let idx = event.target.id.slice(-1);
        let options = [...optionList];
        options[idx] = event.target.value;
        setoptionList(options);
    }

    // Change quiz radio value
    const handleRadioChange = (event) => {
        setselectedRadio(event);
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
        >
            <Box
                sx={{
                    mt: '10%', mb: '8%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography>
                    Question{order}
                </Typography>
                <TextField
                    onChange={ChangeQuestion}
                    value={questionValue}
                    fullWidth
                    required
                    label={"Question" + order}
                    variant="standard"
                />
            </Box>
            {optionList.map((value, idx) => (
                <Stack key={idx} direction="row" spacing={0}>
                    <Radio
                        checked={selectedRadio == idx}
                        onChange={() => handleRadioChange(idx)}
                    />
                    <TextField
                        id={"opt" + idx}
                        placeholder="Write option"
                        onChange={ChangeOptionContents}
                        value={value}
                        variant="standard"
                        fullWidth
                    ></TextField>
                    <IconButton
                        onClick={() => DeleteOption(idx)}
                        size="small"
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Stack>
            ))}
            <Button
                onClick={AddOption}
                fullWidth
            >+ Add an option</Button>
        </Container>
    );
}