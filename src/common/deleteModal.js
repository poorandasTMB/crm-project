import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import {  addProduct, updateProduct, deleteProduct } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function DeleteDialog({deleteSingleProduct,id,closeModal}) {
  const dispatch=useDispatch()
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(()=>{   
    setOpen(deleteSingleProduct);
  },[deleteSingleProduct])

  const handleClose = () => {
        setOpen(false)
        closeModal()
  };
  const handleDelete=()=>{
   // Assuming onDelete is a function passed as a prop to handle the deletion
   fetch(`https://dummyjson.com/products/${id}`, {
    method: 'DELETE',
  })
  .then(res => res.json())
  .then((data) => {
    if (data) {
      toast.success("Your product is deleted");
      setOpen(false)
      closeModal()
      dispatch(deleteProduct(id))
     
     
    }
    else {
      toast.error("product is not deleted");
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }
  const datdsad= useSelector((state)=>state)

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"  
        sx={{
            '& .MuiPaper-root': {
              width: '100%', // Adjust the width as needed
              maxWidth: '350px', // Set a maximum width if necessary
              p:2
            },
          }}
      >
        <DialogContent>
          <DialogContentText alignCenter>
            Are sure to Delete the product
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2}>
      <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>
        Delete
      </Button>
      <Button variant="contained" onClick={handleClose} >
        Cancel
      </Button>
    </Stack>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
