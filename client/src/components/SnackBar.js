import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackBarCustom = ({ openMsg, handleCloseSnackbar, backendMsg, autoHideDuration = 6000 }) => {
    return (
        <Snackbar open={openMsg}
            autoHideDuration={autoHideDuration}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: "center" }}>
            <Alert onClose={handleCloseSnackbar} severity={backendMsg.type} sx={{ width: '100%' }}>
                {backendMsg.msg}
            </Alert>
        </Snackbar>
    );
};

export default SnackBarCustom;