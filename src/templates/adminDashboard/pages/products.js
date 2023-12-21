import React,{ useState } from "react"
import Productdataform from "../components/productData/productForm"
import Productstabledata from "../components/productData/productTable"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close';
import { useSelector } from "react-redux";

export default function Products() {
    const {auth}= useSelector((state)=>state)
    const [openstafffrom,Setopenform]=useState(false)
    const [checkFetch,SetcheckFetch]=useState(false)
    const togglestaffdata=()=>{
        Setopenform(!openstafffrom)
        SetcheckFetch(true)
    }
    const [staffeditdata,Setstaffeditdata]=useState()
    const [checkvalue,Setcheckvalue]=useState(false)
    const togglestaffeditdata=(data)=>{
        Setopenform(!openstafffrom)
        Setstaffeditdata(data)
        Setcheckvalue(true)
        SetcheckFetch(true)
    }

    return (
        <React.Fragment>
            {auth.isAuthenticated&&<Stack direction="row" spacing={2}  justifyContent='end' mb={3}>
                {openstafffrom ?<Button variant="contained" startIcon={<Close />} onClick={()=>{(togglestaffdata())}}>Close Form</Button>: <Button variant="contained" startIcon={<SendIcon />} onClick={()=>{togglestaffdata(Setstaffeditdata(""),Setcheckvalue(false))}}>ADD Product</Button>} 
             </Stack>}
            
             {openstafffrom ? <Productdataform togglestaffdata={togglestaffdata} checkvalue={checkvalue}  staffeditdata={staffeditdata} />:<Productstabledata togglestaffeditdata={togglestaffeditdata} checkFetch={checkFetch} />}
        </React.Fragment>
    )
}







    


