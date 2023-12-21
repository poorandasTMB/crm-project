import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Stack, Typography, CircularProgress, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import ProductDetails from './productCard';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '../../../../redux/productSlice';

export default function Productstabledata({ togglestaffeditdata, checkFetch }) {
  const dispatch = useDispatch();
  const [productdata, setProductData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const data = useSelector((state) => state);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === 'succeeded') {
      setProductData(data.products.products.products);
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (!checkFetch) {
      dispatch(fetchProducts());
    }
  }, []);

  useEffect(() => {
    setProductData(data.products.products.products);
  }, [data?.products?.products?.products]);

  return (
    <TableContainer component={Paper}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : productdata?.length > 0 ? (
        <Grid container spacing={4}>
          {productdata.map((row, index) => (
            <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
              <ProductDetails product={row} togglestaffeditdata={togglestaffeditdata} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Stack>
          <Typography colSpan={14} style={{ textAlign: 'center' }} component="th" scope="row">
            NO DATA
          </Typography>
        </Stack>
      )}
    </TableContainer>
  );
}
