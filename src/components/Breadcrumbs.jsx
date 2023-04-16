import {
    Typography,
} from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import LinkRouter from './LinkRouter';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Breadcrumbs() {
    const {pathname} = useLocation(); 
    const {t} = useTranslation();

    return (
        <MuiBreadcrumbs aria-label="breadcrumb">
            {pathname === '/' 
                ? <Typography color="text.primary" key="home">
                    {t('home')}
                </Typography> 
                : <LinkRouter underline="hover" color="inherit" to="/">
                    {t('home')}
                </LinkRouter>}
            {pathname.split('/').filter((item) => item !== '').map((value, index) => {
                return value === pathname.split('/').at(-1) ? (
                    <Typography color="text.primary" key={value}>
                        {t(value)}
                    </Typography>
                ) : (
                    <LinkRouter underline="hover" color="inherit" to={value} key={value}>
                        {t(value)}
                    </LinkRouter>
                );
            })}
        </MuiBreadcrumbs>
    );
}