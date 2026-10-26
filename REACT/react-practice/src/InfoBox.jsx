import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './InfoBox.css';
import Typography from '@mui/material/Typography';



export default function InfoBox({info})
{
   
    return(
        <div className="InfoBox">
         <h1>WeatherInfo</h1>
         <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        sx={{ height: 100 }}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvUQctd7ywSIel_JtMNt6ms8eTsBoxgyAM0ocXnv3vtg&s=10"
        title="`location"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.name}
        </Typography>
        <Typography gutterBottom variant='body2' component="span" color='text.secondary'>

          <div>Temperature : {info.temp}&deg;C</div>
          <div>MIN Temp : {info.tempMin}&deg;C</div>
          <div>MAX Temp : {info.tempMax}&deg;C</div>
          <div>Humidity : {info.humid}</div>
          <div>Weather : {info.weather}</div>
          

        </Typography>
      </CardContent>
      
    </Card>
        </div>

    );
}