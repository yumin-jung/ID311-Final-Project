import MakeOneQuestion from '../components/MakeOneQuestion';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function Quiz(){
    const qBundle = [];

    //preset questions
    qBundle.push({question: '유민(이)가 좋아하는 색깔은?', options: ['blue', 'red', 'green'], selected:0});
    qBundle.push({question: '유민(이)가 좋아하는 스포츠는?', options: ['basketball', 'running','badminton'], selected:0});
    qBundle.push({question: '유민(이)의 나이는?', options: ['19', '21','25'], selected:0});

    const sendData= () => {
        console.log(qBundle);
    }

    const loadData = (idx, data) => {
        qBundle[idx] = data;
    }

    return (
        <Box component='Container'>
            <Box   
                sx={{
                        bgcolor: '#f8f8f8',
                        boxShadow: 8,
                        borderRadius: 8,
                        p: '2%',
                        minWidth: 360,
                        width: '40%'
                    }}
                >
                {qBundle.map((bundles,idx) => (
                    <MakeOneQuestion key={idx} 
                        order={idx+1} 
                        question={bundles.question} 
                        presetOptions={bundles.options} 
                        presetRadio={bundles.selected}
                        loadData={loadData}/>
                ))}
                <IconButton aria-label="add">
                    {/* <AddIcon /> */}
                </IconButton>
                <Button 
                    variant='contained'
                    fullWidth
                    onClick={sendData}
                > Submit 
                </Button>
            </Box>
        </Box>
    )
}