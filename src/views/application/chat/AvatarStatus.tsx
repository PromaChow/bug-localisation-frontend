// material-ui
import { useTheme } from '@mui/material/styles';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ==============================|| AVATAR STATUS ICONS ||============================== //

export interface AvatarStatusProps {
    status: string;
    mr?: number;
    ml?: number;
}
const AvatarStatus = (props: AvatarStatusProps) => {
    const theme = useTheme();
    switch (props.status) {
        case 'available':
            return (
                <FiberManualRecordIcon
                    sx={{
                        cursor: 'pointer',
                        color: theme.palette.success.dark,
                        verticalAlign: 'middle',
                        fontSize: '0.875rem',
                        mr: props.mr
                    }}
                />
            );

        case 'do_not_disturb':
            return (
                <FiberManualRecordIcon
                    sx={{
                        cursor: 'pointer',
                        color: theme.palette.warning.dark,
                        verticalAlign: 'middle',
                        fontSize: '0.875rem',
                        mr: props.mr
                    }}
                />
            );

        case 'offline':
            return (
                <FiberManualRecordIcon
                    sx={{
                        cursor: 'pointer',
                        color: theme.palette.error.dark,
                        verticalAlign: 'middle',
                        fontSize: '0.875rem',
                        mr: props.mr
                    }}
                />
            );

        default:
            return null;
    }
};

export default AvatarStatus;
