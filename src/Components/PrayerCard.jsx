import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


const AzanCard = ({imgURL,timing,nameOfAzan}) => {
    return ( <>
        <Card sx={{ width: "14vw" }} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={imgURL}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nameOfAzan}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {timing}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card> 
    
    
    </> );
}
 
export default AzanCard;