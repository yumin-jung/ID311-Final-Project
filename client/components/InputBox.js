import * as React from 'react';

const InputBox = ({idx, message, isLeavingMsg, resultNick, resultScore, msgColor}) => {
    // nickname : string, score : string ('4/13'), message : string
    if (!nickname) nickname = 'NICKNAME';
    if (!score) score = '4/13';
    if (!message && colorNum ==1) message = 'Hello, this is me from id215';

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const message = {
            solver: {nickname: resultNick, color: msgColor, order: idx},
            quizCode: quizCode,
            message: data.get('message')
        }

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
    };

    if(isLeavingMsg){ // input창띄우기
        return(
            <>
                <input id="message" name="message" label="Message" className='msgInput'/>
                <button className='msgButton' onClick={SubmitData}></button>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{
                        width: '100%',
                        bgcolor: '#f8f8f8',
                        boxShadow: 8,
                        borderRadius: 4,
                        p: 2,
                        minWidth: 360,
                        marginTop: '5%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: 'flex'
                    }}>
                    <TextField
                        margin="normal"
                        id="message"
                        name="message"
                        label="Message"
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        SAVE
                    </Button>
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