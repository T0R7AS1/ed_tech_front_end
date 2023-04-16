import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Icon,
    Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import GuestIndex from './index';
import { useState, useContext } from 'react';
import { 
    useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import apis from '../settings/api_list.json';
import Cookies from 'universal-cookie';
import Errors from '../components/Errors';
import {RegisterMessage} from '../App.js';

const cookies = new Cookies();

const defaultValues = {
    email: '', 
    password: '',
};

export default function Login({setIsLoaded}){
    const {t} = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState(defaultValues);
    const [errors, setErrors] = useState([]);
    const navigation = useNavigate();
    const {setMessage: setRegisterMessage} = useContext(RegisterMessage);
    const handleRequest = async () => {
        setErrors([]);
        setRegisterMessage('');
        try {
            const result = await axios.post(`${apis.base_url}${apis.login}`, value);
            const response_token = result.data.token;
            if (!response_token) {
                throw new Error(t('invalid_token'));
            }
            cookies.set('token', response_token, {
                path: '/', maxAge: 36000, sameSite: 'strict', secure: true,
            });

            localStorage.setItem('uui', result.data.user.id);
            setIsLoaded((prev) => !prev);
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
        <GuestIndex title={t('login_info')}>
            <Errors errors={errors} />
            <Box>
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
                <Button variant="contained"
                    disableElevation
                    sx={{ 
                        mt: 1,
                        mb: 1,
                        textTransform: 'unset',
                    }}
                    onClick={handleRequest}
                >
                    {t('login')}
                </Button>
                <Button variant="contained" 
                    disableElevation
                    sx={{ 
                        mt: 1,
                        mb: 1,
                        textTransform: 'unset',
                        float: 'right',
                    }}
                    onClick={() => {
                        setRegisterMessage('');
                        navigation('/register');
                    }}
                >
                    {t('register_now')}
                </Button>
            </Box>
        </GuestIndex>
    );
}