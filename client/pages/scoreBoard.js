import ScoreBoard from '../components/ScoreBoard';
import StackComponent from '../components/StackComponent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SignIn() {
    if (typeof window !== 'undefined') {
        const nick = localStorage.getItem('nickname');
        const sc = localStorage.getItem('score');
        console.log(nick, sc);
    }
    return (
        <Box sx={{ width: '100%' }} >
            <Grid container
                spacing={10}
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginTop: 20 }}>
                <Grid item xs={12}
                    container
                    justifyContent="center"
                    alignItems="center">
                    <StackComponent />
                </Grid>
                <Grid item xs={5}
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <Typography component="h1" variant="h5">
                        Score board
                    </Typography>
                    <ScoreBoard />
                </Grid>
                <Grid item xs={5}
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <Typography component="h1" variant="h5">
                        Messages
                    </Typography>
                    <ScoreBoard />
                </Grid>
            </Grid>
        </Box >
    )
}