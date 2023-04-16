import {useRef, useState} from 'react';
import {
    Popover,
    Avatar,
    IconButton,
    Icon,
    Box,
    Button,
    Divider,
    Typography,
} from '@mui/material';
import useUser from '../hooks/useUser.js';
import { useTranslation } from 'react-i18next';

export default function UserAvatar() {
    const ref = useRef(null);
    const {t} = useTranslation();

    const { userInfo, logout } = useUser();
    const [ open, setOpen ] = useState(false);
    
    return (
        <Box>
            <IconButton variant="contained" onClick={() => setOpen((old) => !old)}
                    sx={{ color: 'black', boxShadow: 0, }} ref={ref}
                >
                <Avatar sx={{ bgcolor: 'orange' }}>{userInfo && userInfo.data.user.name[0]}</Avatar>
            </IconButton>
            <Popover
                open={open}
                anchorEl={ref.current}
                onClose={() => setOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ width:190, fontSize: 10,}}>
                    <Typography sx={{ p:2 }}>
                        {t('logged_in_as')}: {userInfo && userInfo.data.user.name}
                    </Typography>
                    <Divider></Divider>
                    <Button sx={{ fontSize: 18, width: '100%', borderRadius: 0, textTransform: 'none', color: 'black' }} onClick={() => logout()}>
                        <Icon sx={{ marginRight: 1, }}>logout</Icon>
                        {t('logout')}
                    </Button>
                </Box>
            </Popover>
        </Box>
    );
}