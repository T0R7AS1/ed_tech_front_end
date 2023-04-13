import style from '../assets/loader.module.css';
import {Box} from '@mui/material';
export default function Loader(){
    return (
        <Box 
            sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            <Box className={style.lds_loader}>
                <Box/>
                <Box/>
                <Box/>
                <Box/>
                <Box/>
                <Box/>
                <Box/>
                <Box/>
            </Box>
        </Box>
    );
}
