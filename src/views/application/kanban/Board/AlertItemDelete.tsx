// material-ui
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
}

// ==============================|| KANBAN BOARD - ITEM DELETE ||============================== //

export default function AlertItemDelete({ title, open, handleClose }: Props) {
    return (
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            keepMounted
            maxWidth="xs"
            aria-labelledby="item-delete-title"
            aria-describedby="item-delete-description"
        >
            <DialogTitle id="item-delete-title">{title} - Are you sure you want to delete this item?</DialogTitle>
            <DialogActions sx={{ mr: 2 }}>
                <Button onClick={() => handleClose(false)} color="error">
                    Cancel
                </Button>
                <Button variant="contained" size="small" onClick={() => handleClose(true)} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
