import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function LinkRouter(props) {
    return (
        <Link {...props} component={RouterLink} />
    );
}