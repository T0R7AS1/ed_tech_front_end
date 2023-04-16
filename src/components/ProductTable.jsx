import { useState, useEffect } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Select,
    MenuItem,
    Pagination,
    Stack,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
    Typography,
    DialogActions,
    Button,
    useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Requests} from '../settings/request.js';
import apiList from '../settings/api_list.json';
import { format } from 'date-fns'
import useWindowSize from "../hooks/useWindowSize.js";

export default function ProductTable(props) {
    const {
        cols, 
        data, 
        entriesCount, 
        setData, 
        endpoint, 
        setEntriesCount,
    } = props;
    const theme = useTheme();
    const {t} = useTranslation();
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const windowSize = useWindowSize();
    
    useEffect(() => {
        Requests.get(`${endpoint}?page=${page - 1}&length=${rowsPerPage}`)
        .then((response) => {
            setData(response?.data?.products);
            setEntriesCount(response?.data?.items_count);
        });
    }, [rowsPerPage, page, refresh, endpoint, setData, setEntriesCount]);

    const addToFavorites = (productId) => {
        Requests.post(`${apiList.add_to_favorites}/${productId}`)
        .then((response) => {
            setRefresh((prev) => !prev);
        }).catch((error) => {
            alert(error.data.message);
        });
    }

    const removeFromFavorites = (productId) => {
        Requests.post(`${apiList.remove_from_favorites}/${productId}`)
        .then((response) => {
            setRefresh((prev) => !prev);
            const maxPages = Math.ceil((entriesCount -1) / rowsPerPage);

            if (page > maxPages) {
                setPage(maxPages);
            }
        }).catch((error) => {
            alert(error.data.message);
        });
    }

    return (
        <Box sx={{ p: isSmallScreen ? 1 : 3 }}>
            <Dialog 
                onClose={() => setOpen(false)}
                open={open}
                fullWidth
                maxWidth='sm'
            >
                <DialogTitle>
                    {t('viewing_product')}
                </DialogTitle>
                <Divider/>
                <DialogContent>
                    {activeItem && (
                        <Box
                            sx={{ 
                                display:'grid',
                                gridTemplateColumns: "auto auto",
                                '& > div > p:first-of-type': {
                                    fontWeight: 'bold'
                                },
                                '&> div': {
                                    m:1,
                                }
                            }}
                        >
                            <Box
                                sx={{ 
                                    [theme.breakpoints.down('sm')]:{
                                        gridRowStart:1, 
                                        gridRowEnd:2,
                                        gridColumnStart:1, 
                                        gridColumnEnd:3,
                                        display: 'grid',
                                    }
                                }}
                            >
                                <Typography>
                                    {t('is_favorite')}
                                </Typography>
                                {activeItem.is_favorite ? t('yes') : t('no')}
                            </Box>
                            <Box
                                sx={{ 
                                    [theme.breakpoints.down('sm')]:{
                                        gridRowStart:2, 
                                        gridRowEnd:3, 
                                        gridColumnStart:1, 
                                        gridColumnEnd:3,
                                        display: 'grid',
                                    }
                                }}
                            >
                                <Typography>
                                    {t('name')}
                                </Typography>
                                {activeItem.name}
                            </Box>
                            <Box 
                                sx={{ 
                                    gridRowStart:2, 
                                    gridRowEnd:3, 
                                    gridColumnStart:1, 
                                    gridColumnEnd:3,
                                    display: 'grid',
                                    [theme.breakpoints.down('sm')]:{
                                        gridRowStart:3,
                                        gridRowEnd:4,
                                    }
                                }}
                            >
                                <Typography>
                                    {t('description')}
                                </Typography>
                                {activeItem.description}
                            </Box>
                            <Box 
                                sx={{ 
                                    gridRowStart:3, 
                                    gridRowEnd:4, 
                                    gridColumnStart:1, 
                                    gridColumnEnd:3,
                                    display: 'grid',
                                    [theme.breakpoints.down('sm')]:{
                                        gridRowStart:4,
                                        gridRowEnd:5,
                                    }
                                }}
                            >
                                <Typography>
                                    {t('price')}
                                </Typography>
                                {activeItem.price}
                            </Box>
                            <Box
                                sx={{ 
                                    [theme.breakpoints.down('sm')]:{
                                        gridRowStart:5, 
                                        gridRowEnd:6, 
                                        gridColumnStart:1, 
                                        gridColumnEnd:3,
                                        display: 'grid',
                                    }
                                }}
                            >
                                <Typography>
                                    {t('created_at')}
                                </Typography>
                                {format ( new Date(activeItem.created_at), 'Y-m-d')}
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight:'bold' }}>
                                    {t('updated_at')}
                                </Typography>
                                {format ( new Date(activeItem.updated_at), 'Y-m-d')}
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <Divider></Divider>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>
                        {t('close')}
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer>
                <Table size={isSmallScreen ? 'medium' : 'small'}>
                    <TableHead>
                        <TableRow 
                            sx={{ 
                                '& > th':{
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    py: 0,
                                },
                            }}
                        >
                            <TableCell></TableCell>
                            {cols.map((col, index) => (
                                <TableCell key={index} sx={{ minWidth:150 }}>
                                    {t(col.key)}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((row, index) => (
                            <TableRow 
                                key={index} 
                                sx={{ 
                                    '& > td':{
                                        py: 0,
                                    },
                                    backgroundColor: '#fff',
                                    '&:hover > td': {
                                        backgroundColor: '#edf4fb',
                                    }
                                }}    
                            >
                                <TableCell>
                                    <IconButton sx={{ cursor:'pointer' }} onClick={() => row.is_favorite ? removeFromFavorites(row.id) : addToFavorites(row.id)}>
                                        {row.is_favorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                                    </IconButton>
                                </TableCell>
                                {cols.map((col, key) => (
                                    <TableCell 
                                        key={key}
                                        onClick={() => {
                                            setOpen(true);
                                            setActiveItem(row);
                                        }}
                                        sx={{ 
                                            cursor:'pointer',
                                         }}
                                    >
                                        <Box 
                                            component='span'
                                            sx={{ 
                                                display: 'block',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden',
                                                maxWidth: 700,
                                            }}>
                                            {col.type === 'date' ? format ( new Date(row[col.key]), 'Y-m-d') : row[col.key]}
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack sx={{ 
                    flexFlow: 'row wrap',
                    mt: 3,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{ 
                        [theme.breakpoints.down('sm')]:{
                            width: '100%',
                        }
                    }}
                >
                    {t('total_items')}: {entriesCount}
                </Box>
                <Pagination
                    sx={{ 
                        [theme.breakpoints.down('sm')]:{
                            width: '100%',
                            py: 2,
                        }
                    }}
                    count={Math.ceil(entriesCount / rowsPerPage)}
                    color="primary"
                    onChange={(_e, newPage) => setPage(newPage)}
                    page={page ?? 1}
                    size={windowSize.width <= '600' ? 'small' : 'medium'}
                    hidePrevButton
                    hideNextButton
                />
                <Box
                    sx={{ 
                        [theme.breakpoints.down('sm')]:{
                            width: '100%',
                        }
                    }}
                >
                    {t('per_page')}
                    <Select
                        size='small'
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(e.target.value)}
                        sx={{ ml:1 }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                    </Select>
                </Box>
            </Stack>
        </Box>
    );
}