import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AboutPage() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (<>
    <Button color="inherit" onClick={handleClickOpen} sx={{ flexGrow: 1 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          textTransform: "none",
          fontWeight: "light",
          color: "#36454F",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div color="inherit" sx={{ flexGrow: 1 }}>
          <Typography
              variant="h6"
              component="div"
              sx={{
                textTransform: "none",
                fontWeight: "light",
                color: "#36454F",
                textAlign: 'center'
              }}>
            <div className='nav-text'>
              about
            </div>
    </Typography>
          </div>
        </div>
      </Typography>
    </Button>
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        about
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <Typography  sx={{
                textTransform: "none",
                fontWeight: "light",
                color: "#36454F",
                textAlign: 'center'
              }} gutterBottom>
          Parking can be troublesome - Parq-It helps by providing regional listings of parking spaces available for rent by real people.
          People can search for available listings at any time by providing a city and a state, but to book or host, people will need to create an account.
        </Typography>
        <img className="crowdedLotPhoto" src="https://codesmith-iteration-project.s3.us-west-1.amazonaws.com/crowdedparkinglot.jpg" />
        <Typography  sx={{
                textTransform: "none",
                fontWeight: "light",
                color: "#36454F",
              }} gutterBottom>

        </Typography>
        <Typography  sx={{
                textTransform: "none",
                fontWeight: "light",
                color: "#36454F",
                textAlign: 'center'
              }}
              gutterBottom>
                 Parq-ers can save time looking for a parking space anywhere where parking is scarce. 
        Anyone can host on Park-It as long as she or he is verified. A verified host can list and rent parking spots by providing details about the spots
            such as address, price, size, and options. All personal and payment information will be secured. Parq provides a very easy way to earn income while
            sitting at home.     
        </Typography>
      </DialogContent>
      <DialogActions>
        <div autoFocus onClick={handleClose}>
          close
        </div>
      </DialogActions>
    </BootstrapDialog>
    </>
  );
}

