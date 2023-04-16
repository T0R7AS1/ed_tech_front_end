import {
    Box,
    Alert,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Errors({errors}){
    const {t} = useTranslation();
    return (
        <Box>
            {errors.length !== 0 && errors.map((value, index) => {
                if (index < 3) {
                    return (
                        <Alert severity="error"
                            sx={{ 
                                mb: 2,
                            }}
                        >
                            {value}
                        </Alert>
                    );
                }
                return (
                    <Alert severity="error"
                        sx={{ 
                            mb: 2,
                        }}
                    >
                        {t('there_are_more_errors', {count: errors.length - 3})}
                    </Alert>
                );
            })}
        </Box>
    );
}
