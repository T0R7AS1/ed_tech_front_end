import {
    Box, 
    Drawer,
    CssBaseline,
    List,
    Divider,
    ListItem,
    IconButton,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Icon,
    Stack,
    Paper,
    useTheme,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import UserAvatar from './UserAvatar';
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Products from './Products';
import FavoritesProducts from './FavoritesProducts';
import logo from '../assets/images/logo.png';
import Breadcrumbs from '../components/Breadcrumbs';
import useWindowSize from "../hooks/useWindowSize.js";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    height:'77.41px',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

export default function AuthIndex() {
    const windowSize = useWindowSize();
    const [open, setOpen] =  useState(windowSize.width <= '600' ? true : false);
    const {t} = useTranslation();
    const {pathname} = useLocation(); 
    const splitPathname = pathname.split('/');
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{
                display: 'flex'
            }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Stack 
                    sx={{ 
                        flexFlow:'row wrap', 
                        columnGap:'30px', 
                        justifyContent: open ? 'flex-end' : 'space-between',
                        height: '100%',
                        pl: 3,
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <Icon>menu</Icon>
                    </IconButton>
                    <Box sx={{ display:'flex', justifyContent: 'right', alignItems: 'center', pr:2}}>
                        <UserAvatar />
                    </Box>
                </Stack>
            </AppBar>
            <Drawer
                sx={{
                    [theme.breakpoints.down('sm')]:{
                        position: 'absolute',
                    },
                    width: open ? drawerWidth : 0,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <Box sx={{ display: 'flex', justifyContent:'center', width: 'calc(100% - 40px)' }}>
                        <Box 
                            sx={{ width: 150, py: '5px' }}
                            component="img"
                            src={logo}
                        />
                    </Box>
                    <IconButton onClick={handleDrawerClose}>
                        <Icon>menu</Icon> 
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding selected={splitPathname.at(-1) === ''}>
                        <ListItemButton component={Link} to='/'>
                            <ListItemIcon>
                                <Icon>inventory 2</Icon>
                            </ListItemIcon>
                            <ListItemText primary={t('products')} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding selected={splitPathname.at(-1) === 'favorites'}>
                        <ListItemButton component={Link} to="/favorites">
                            <ListItemIcon>
                                <Icon>favorite</Icon>
                            </ListItemIcon>
                            <ListItemText primary={t('my_favorites')} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Box sx={{ width:250, position:'relative', flexGrow:1, backgroundColor: '#ecf0f4', px:2 }}>
                <DrawerHeader />
                <Paper 
                    sx={{
                        p:2, 
                        borderRadius:4, 
                        mb:1,
                        position: 'sticky',
                        top: 90,
                        left: 0,
                        right: 0,
                        zIndex: 1100,
                    }}
                >
                    <Breadcrumbs/>
                </Paper>
                <Paper 
                    sx={{
                        p:2,
                        borderRadius:4, 
                        width: '100%', 
                        overflowX: 'hidden', 
                        mt:6, 
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Products/>} />
                        <Route path="/favorites" element={<FavoritesProducts/>} />
                    </Routes>
                </Paper>
            </Box>
        </Box>
    );
}