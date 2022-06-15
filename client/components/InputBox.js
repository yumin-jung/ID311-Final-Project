import * as React from 'react';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

const InputBox = ({idx, message, isLeavingMsg, resultNick, resultScore, msgColor, quizCode}) => {
    // nickname : string, score : string ('4/13'), message : string

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const message = {
            solver: {nickname: resultNick, color: msgColor, order: idx},
            quizCode: quizCode,
            message: data.get('message')
        }
        console.log(message);

        axios.post(DEPLOY_SERVER_URL + '/api/messages/saveMessage', message)
            .then(response => {
                if (response.data.success) {
                    // Go to leave message page
                    router.push({
                        pathname: '/scoreBoard/[id]',
                        query: { id: quizCode },
                    })
                } else {
                    alert('Failed to save message')
                }
            });
            return { quizCode: solver.quizCode, nickname: solver.info.nickname, score: solver.score, totScore: solver.quizLen, message: solver.message  };
    };

    if(isLeavingMsg){ // input창띄우기
        return(
            <>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{
                        width: '100%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: 'flex'
                    }}>
                    <textarea
                        margin="normal"
                        id="message"
                        name="message"
                        label="Message"
                        className="msgInput"
                    />
                    <button
                        type="submit"
                        className="msgSave"
                    >
                        SAVE
                    </button>
                </Box>
            </>
        );
    }else{ // 내용물창 띄우기
        return(
            <div className='msgMsg'>{message}</div>
        );
    }
}

export default InputBox