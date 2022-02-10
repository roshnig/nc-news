import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const DialogBox = ({ children, dialogOpen, setdialogOpen, title }) => {
    const handleClose = () => {
        setdialogOpen(false);
    };
    return (
        <>
            <Dialog
                open={dialogOpen}
                fullWidth
                onClose={handleClose}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
}

export default DialogBox;
