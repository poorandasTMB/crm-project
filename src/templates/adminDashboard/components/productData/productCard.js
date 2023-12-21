// src/components/ProductDetails.js
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Editicon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import DeleteDialog from '../../../../common/deleteModal';
import { useSelector } from 'react-redux';
const ProductDetails = ({ product,togglestaffeditdata }) => {
  const {auth}= useSelector((state)=>state)
    const [deleteSingleProduct,SetdeleteProduct]=useState(false)
  const { title, description, price, rating, stock, discountPercentage, images, thumbnail,id } = product;

const handleDelete = (id) => {
    SetdeleteProduct(true)
};
const closeModal=()=>{
    SetdeleteProduct(false)
}
  return (
    <React.Fragment>
 <Card style={{ position: 'relative', display: 'flex',height:"100%" }}>
      <Grid container spacing={2} >
      <Grid item xs={12} md={4}>
          <Carousel showArrows={false} showThumbs={false} dynamicHeight={true} showStatus={false}>
            <div>
              <CardMedia component="img"  height="240" image={thumbnail} alt={title} loading="lazy" />
            </div>
            {images?.map?.((image, index) => (
              <div key={index}>
                <CardMedia component="img" height="240" image={image} alt={`${title} - Image ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="h6" color="primary">
              ${price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rating: {rating}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock: {stock} units
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discount: {discountPercentage}%
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
      {auth.isAuthenticated && <React.Fragment><IconButton onClick={()=>handleDelete(id)} aria-label="delete" style={{ position: 'absolute', top: "10px", right: "40px" }}>
  <DeleteIcon />
</IconButton>
<IconButton style={{ position: 'absolute', top: "10px", right: "10px" }} aria-label="edit" onClick={() => { togglestaffeditdata(product) }}>
                                                <Editicon />
                                            </IconButton></React.Fragment>}
      
    </Card>
<DeleteDialog deleteSingleProduct={deleteSingleProduct} id={id} closeModal={closeModal}/>
    </React.Fragment>
   
  );
};
 
export default ProductDetails;
