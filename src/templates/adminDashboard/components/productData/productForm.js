import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState,useCallback, useEffect } from 'react';
import { TextField, FormControlLabel, Checkbox, MenuItem, Button, Grid, Paper } from '@mui/material';
import { updateProductApi } from '../../../../API/updateProduct';
import { createProductApi } from '../../../../API/createProductApi';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateProduct ,addProduct} from '../../../../redux/productSlice';
import { useDispatch } from 'react-redux';
import { Card, CardMedia } from '@mui/material';
// Get tokken from local storage

import { useDropzone } from 'react-dropzone';
import { Typography, List, ListItem, ListItemText , ListItemSecondaryAction,
  IconButton, } from '@mui/material';
const Productdataform = ({ togglestaffdata, staffeditdata, checkvalue }) => {
  const [uploadedFiles, setUploadedFiles] = useState();
  const [uploadedImagesFiles, setuploadedImagesFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Update the state with the new files
    setUploadedFiles(acceptedFiles[0]);
  }, []);

  const onDropimage = useCallback((acceptedFiles) => {
    // Update the state with the new files
    setuploadedImagesFiles((prevFiles) => [...(prevFiles || []), ...acceptedFiles]);
  }, []);
  // const { getRootProps, getInputProps } = useDropzone({ onDrop ,onDropimage});
  const { getRootProps: getRootPropsForFiles, getInputProps: getInputPropsForFiles } = useDropzone({
    onDrop,
    accept: 'image/*', // specify accepted image types
  });
  const { getRootProps: getRootPropsForImages, getInputProps: getInputPropsForImages } = useDropzone({
    onDrop: onDropimage,
    accept: 'image/*', // specify accepted image types
  });
  const dispatch= useDispatch()
  const [staffdata, setstaffdata] = useState({
    title: '',
    description: '',
    price: '',
    rating: '',
    stock: '',
    brand: '',
    category: '',
    discountPercentage:"",
    thumbnail:"",
    images:"",
    ...staffeditdata
  });
  useEffect(()=>{
    setUploadedFiles(staffeditdata.thumbnail);
    setuploadedImagesFiles(staffeditdata.images)
  },[staffeditdata])
  const handpostformdata = async () => {
    checkvalue ?
      dispatch(updateProductApi(staffdata))
      .then((response)=>{
        if(response){
          dispatch(updateProduct({id:response.id,updatedProduct:response}))
          togglestaffdata()
        }
      })
      :   dispatch(createProductApi(staffdata))
      .then((response)=>{
        if(response){
          dispatch(addProduct(response))
          togglestaffdata()
        }
      })

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    handpostformdata()

    // Handle form submission here
  };
  const updatedata = (event) => {
    setstaffdata((prevalue) => {
      return {
        ...prevalue,
        [event.target.name]: event.target.value
      }
    })
  }
  const removeFile = (index) => {
    // Remove the file from the state
  
    setUploadedFiles();
  };
  const removeSliderImages = (index) => {
    // Remove the file from the state
    setuploadedImagesFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  useEffect(()=>{
    setstaffdata((prevalue) => {
      return {
        ...prevalue,
        ["thumbnail"]: uploadedFiles
      }
    })
  },[uploadedFiles])

  useEffect(()=>{
    setstaffdata((prevalue) => {
      return {
        ...prevalue,
        ["images"]: uploadedImagesFiles
      }
    })
  },[uploadedImagesFiles])
  
  return (
    <form onSubmit={handleSubmit}>
      <Paper sx={{ p: 2 }}>
       <Grid container spacing={2}>
          {Object.keys(staffdata).map((item, index) => {
            if (item === "id") { return false }
            return (
               <Grid key={index} item xs={12} md={6}>
                  {item =="thumbnail"?   
                  <div>
      <Paper elevation={3} {...getRootPropsForFiles()} style={{ padding: '20px', textAlign: 'center' }}>
        <input {...getInputPropsForFiles()} accept=".jpg, .jpeg, .png"/>
        <Typography variant="h6">Drag and drop thumbnail here</Typography>
      </Paper>
     {/* Display the list of uploaded files */}
     {uploadedFiles&&  <List style={{ marginTop: '20px' }}>
          <ListItem >
            <ListItemText primary={uploadedFiles?.name?uploadedFiles?.name:uploadedFiles} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => removeFile(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
   
      </List>}
    
      </div>:item=="images"?  <div>
      <Paper elevation={3} {...getRootPropsForImages()} style={{ padding: '20px', textAlign: 'center' }}>
        <input {...getInputPropsForImages()} accept=".jpg, .jpeg, .png"/>
        <Typography variant="h6">Drag and drop slider images here</Typography>
      </Paper>
     {/* Display the list of uploaded files */}
       {/* Display the list of uploaded files */}
       <List style={{ marginTop: '20px' }}>
        {uploadedImagesFiles?.map((file, index) => (
          <ListItem key={index}>
            <ListItemText primary={file?.name?file?.name:file} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => removeSliderImages(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      </div>:<TextField required name={item} type={(item === "discountPercentage" || item === "price" || item === "rating" || item === "stock")?"number":"text"} onChange={updatedata} value={staffdata[item]} fullWidth label={item} />
    }
                </Grid>
         )})}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">

              {checkvalue ? "Update" : "Submit"}
            </Button>
          </Grid>

        </Grid>
      </Paper>
    </form>
  );
};

export default Productdataform;