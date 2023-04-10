import {
    Box,
    useTheme,
    TextField,
    InputAdornment,
    IconButton,
    Icon,
    Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import GuestIndex from './index';
import {RegisterMessage} from '../App.js';
import { useContext, useState } from 'react';
import { 
    Link,
    useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import apis from '../settings/api_list.json';
import Errors from '../components/Errors';

const defaultValues = {
    username: '',
    email: '', 
    password: '',
    password_confirmation: '',
};
export default function Register(){
    const theme = useTheme();
    const {t} = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState(defaultValues);
    const [errors, setErrors] = useState([]); // NOTE usable only when needs to be changed
    const navigation = useNavigate();
    const {setMessage} = useContext(RegisterMessage);
    const handleRequest = async () => {
        setErrors([]);
        try {
            const result = await axios.post(`${apis.base_url}${apis.register}`, value);
            if (result.status === 201) {
                setMessage(t('successfully_registered_please_login'));
                navigation('/login');
            }
        } catch (error) {
            if (error.response) {
                const array = [];
                Object.values(error.response.data.errors).forEach(element => {
                    array.push(element[0]);
                });
                setErrors(array);
            }
        }
    };
    return (
        <GuestIndex title={t('register_info')}>
            <Errors errors={errors} />
            <Box>
                <TextField 
                    label={t('username')}
                    fullWidth
                    type='text'
                    size="small"
                    margin="dense"
                    value={value.username}
                    onChange={(e) => setValue((prev) => ({ ...prev, username: e.target.value }))}
                />
                <TextField 
                    label={t('email')}
                    fullWidth
                    type='text'
                    size="small"
                    margin="dense"
                    value={value.email}
                    onChange={(e) => setValue((prev) => ({ ...prev, email: e.target.value }))}
                />
                <TextField 
                    label={t('password')}
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    size="small"
                    margin="dense"
                    value={value.password}
                    onChange={(e) => setValue((prev) => ({ ...prev, password: e.target.value }))}
                    InputProps={{ 
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton 
                                    size="small"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    <Icon>
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </Icon>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField 
                    label={t('repeat_password')}
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    size="small"
                    margin="dense"
                    value={value.password_confirmation}
                    onChange={(e) => setValue((prev) => ({ ...prev, password_confirmation: e.target.value }))}
                    InputProps={{ 
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton 
                                    size="small"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    <Icon>
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </Icon>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="contained"
                    disableElevation
                    sx={{ 
                        mt: 1,
                        mb: 1,
                        textTransform: 'unset',
                    }}
                    component={Link}
                    to="/login"
                >
                    {t('back_to_login')}
                </Button>
                <Button variant="contained" 
                    disableElevation
                    sx={{ 
                        mt: 1,
                        mb: 1,
                        textTransform: 'unset',
                        float: 'right',
                    }}
                    onClick={handleRequest}
                >
                    {t('register')}
                </Button>
            </Box>
        </GuestIndex>
    );
}