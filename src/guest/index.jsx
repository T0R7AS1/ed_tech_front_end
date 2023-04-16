import {
    Box, 
    useTheme,
    Typography,
    Alert,
} from '@mui/material';
import { useContext } from 'react';
import {RegisterMessage} from '../App.js';

export default function GuestIndex({children, title}){
    const theme = useTheme();
    const {message} = useContext(RegisterMessage);
    return (
        <Box 
            sx={{ 
                width: '100%', 
                height: "100vh", 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box 
                sx={{ 
                    width: 400,
                    maxWidth: '100%',
                    backgroundColor: 'white',
                    borderRadius: 4,
                    boxShadow: theme.shadows[2],
                    p: 1,
                }}
            >
                <Typography 
                    sx={{ 
                        mb: 2,
                        mt: 2,
                        textAlign: 'center',
                        color: '#b5b5c3',
                    }}
                >
                    {title}
                </Typography>
                {message && (
                    <Alert severity="success">
                        {message}
                    </Alert>
                )}
                <Box>{children}</Box>
            </Box>
        </Box>
    );
}