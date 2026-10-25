import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function InfoBox()
{
    let info = {
        temp: 25.45,
        tempMin: 21,
        tempMax: 26.8,
        humid: 47,
        weather: "haze",
        name:"Hyderabad"
    };

    return(
        <div className="InfoBox">
         <h1>WeatherInfo</h1>
         <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 100 }}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvUQctd7ywSIel_JtMNt6ms8eTsBoxgyAM0ocXnv3vtg&s=10"
        title="`location"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.name}
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small" >Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
        </div>

    );
}