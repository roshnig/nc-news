import React from "react";
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

export default function AlertMessage({ message }) {
    const [open, setOpen] = React.useState(true);

    function handleClose(event, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    }

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={open}
                autoHideDuration={7000}
                onClose={handleClose}
                variant="warning"
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                message={message}
                action={[
                    <IconButton key="close" onClick={handleClose}>
                        <CloseIcon color="primary" />
                    </IconButton>
                ]}
            />
        </div>
    );
}
