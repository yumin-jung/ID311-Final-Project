import Score from '../components/Score';
import Message from '../components/Message';
import Quiz from '../components/Quiz';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';


export default function SignIn() {
    if (typeof window !== 'undefined') {
        // const nick = localStorage.getItem('nickname');
        // const sc = localStorage.getItem('score');
        // console.log(nick, sc);
    }
    const nick = 'username';
    const score = 10;
    const quizLength = 10;

    return (
        <Box sx={{ width: '100%' }} >
            <Grid container
                spacing={10}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 5, display: { xs: 'none', md: 'flex' } }}>
                <Grid item xs={12}
                    container
                    justifyContent="center"
                    alignItems="center">
                    <Box
                        sx={{
                            width: '40%',
                            bgcolor: '#f8f8f8',
                            boxShadow: 8,
                            borderRadius: 4,
                            p: 2,
                            minWidth: 400,
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Quiz />
                    </Box>
                </Grid>
                <Grid item xs={5}
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <Box
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
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Score Board
                        </Typography>
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            <Score value={1} userName={nick} score={score} quizLength={quizLength} />
                            <Score value={2} userName="test2" score={9} quizLength={10} />
                            <Score value={3} userName="test2" score={9} quizLength={10} />
                            <Score value={4} userName="test2" score={9} quizLength={10} />
                            <Score value={5} userName="test2" score={9} quizLength={10} />
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={5}
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <Box
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
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Messages
                        </Typography>
                        <List sx={{ width: '100%', maxWidth: 360 }}>
                            <Message userName="test1" comment="test comment1" />
                            <Message userName="test2" comment="test comment2" />
                            <Message userName="test3" comment="test comment2" />
                            <Message userName="test4" comment="test comment2" />
                            <Message userName="test5" comment="test comment2" />
                        </List>
                    </Box>
                </Grid>
            </Grid>
            <Grid container
                spacing={2}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 4, display: { xs: 'flex', md: 'none' } }}>
                <Grid item xs={12}
                    container
                    justifyContent="center"
                    alignItems="center">
                    <Box
                        sx={{
                            width: '40%',
                            bgcolor: '#f8f8f8',
                            boxShadow: 8,
                            borderRadius: 4,
                            p: 2,
                            minWidth: 300,
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <StackComponent />
                    </Box>
                </Grid>
                <Grid item xs={12}
                    container
                    justifyContent="center"
                    alignItems="center">
                    <Box sx={{
                        width: '80%',
                        bgcolor: '#f8f8f8',
                        boxShadow: 8,
                        borderRadius: 4,
                        p: 2,
                        minWidth: 360,
                        marginTop: '5%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: { xs: 'flex', md: 'none' }
                    }}
                    >
                        <Typography component="h1" variant="h5">
                            Score Board
                        </Typography>
                        <List sx={{ width: '80%', maxWidth: 360 }}>
                            <Score value={1} userName={nick} score={score} quizLength={quizLength} />
                            <Score value={2} userName="test2" score={9} quizLength={10} />
                            <Score value={3} userName="test2" score={9} quizLength={10} />
                        </List>
                    </Box>
                    <Box
                        sx={{
                            width: '80%',
                            bgcolor: '#f8f8f8',
                            boxShadow: 8,
                            borderRadius: 4,
                            p: 2,
                            minWidth: 360,
                            marginTop: '8%',
                            flexDirection: 'column',
                            alignItems: 'center',
                            display: { xs: 'flex', md: 'none' }
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Messages
                        </Typography>
                        <List sx={{ width: '80%', maxWidth: 360 }}>
                            <Message userName="test1" comment="test comment1" />
                            <Message userName="test2" comment="test comment2" />
                            <Message userName="test3" comment="test comment2" />
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    )
}