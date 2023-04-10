import {
    Box, 
    useTheme,
    Typography,
    Alert,
} from '@mui/material';
import { useContext } from 'react';
import {RegisterMessage} from '../App.js';
import { useTranslation } from 'react-i18next';

export default function GuestIndex({children, title}){
    const theme = useTheme();
    const {t} = useTranslation();
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

                {/* <div class="login login-4 login-signin-on d-flex flex-row-fluid" id="kt_login">
                    <div class="d-flex flex-center flex-row-fluid bgi-size-cover bgi-position-top bgi-no-repeat">
                        <div class="login-form text-center p-7 position-relative overflow-hidden">
                            <div class="login-signin">

                                    <div class="alert alert-success">
                                        success
                                    </div>
                                <form class="form fv-plugins-bootstrap fv-plugins-framework" method="POST">
                                    <div class="form-group mb-5 fv-plugins-icon-container">
                                        <input class="form-control h-auto form-control-solid py-4 px-8" type="text" placeholder="Email" name="email"/>
                                    </div>
                                    <div class="form-group mb-5 fv-plugins-icon-container">
                                        <input class="form-control h-auto form-control-solid py-4 px-8" type="password" placeholder="Password" name="password" autocomplete="current-password"/>
                                    </div>
                                    <button id="kt_login_signin_submit" class="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4">
                                        Login
                                    </button>
                                    <button type='button' class="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4">
                                        Register
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> */}
            </Box>
        </Box>
    );
}