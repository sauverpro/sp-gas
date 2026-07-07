import React from 'react'
import footercss from "./Footer.module.css"
import {
    Box,
    Link,
    Typography,
    
  } from '@material-ui/core';
const Footer = () => {
    return ( 
        <Box sx={{p:3, textAlign:'center'}}>
            <Typography>© {new Date().getFullYear()} All rights reserved | Developed By <Link className={footercss.footer} href="https://klab.rw/" target='_blank'>K-Lab Rwanda</Link> </Typography>
        </Box>
     );
}
 
export default Footer;