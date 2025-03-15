import Grid from '@mui/material/Grid2';

import { useEffect,useState } from 'react';
import Divider from '@mui/material/Divider';
import { Stack } from '@mui/material';
import AzanCard from './PrayerCard';
import axios from 'axios';
import moment from 'moment';
import "moment/dist/locale/ar-dz"


moment.locale("ar");
const HeadTitle = () => {
    const [city,setCity]=useState({
        name:" جده ",
        apo:"Jaddah"
    })

    const [today,setToday]=useState("0000")

    const cities=[
        { key:"Jaddah", displayCity:"جده"},
        { key:"Riyadh", displayCity:"الرياض"},
        { key:"Al Madina Almonawara", displayCity:"المدينه المنوره"},
 ]
 const names =["الفجر", "الظهر", " العصر", "المغرب ", " العشاء"]


        const getAzan =async ()=>{
            const azan=await axios.get(`https://api.aladhan.com/v1/timingsByCity?country=SA&city=${city.apo}`);
            // console.log(city.apo)
            //  console.log(azan)
            setTimeAzan(azan.data.data.timings)
            
            // console.log(timeAzan)
    

        }

        const [timeAzan, setTimeAzan] = useState({
            Fajr: "04:20",
            Dhuhr: "11:50",
            Asr: "15:18",
            Sunset: "18:03",
            Isha: "19:33",
        });
    

        const [line,setLine]=useState("");
        // const [timer,setTimer]=useState("00");


    useEffect(()=>{
        getAzan();
        let  t=moment();
        setToday(t.format("Do MMMM  YYYY | h:mm:ss "))
        
        console.log("use satae rendeeer ")

    },[city]);

    useEffect(()=>{
        console.log("interval")

     let interval=  setInterval(() => {
        console.log("intersssal")
        getNameOfNextAzan()

            
        }, 1000);

        return () =>{ 
            clearInterval(interval)
        }
        

    },[timeAzan])

    const getNameOfNextAzan=()=>{
        let nextPrayer=0;
        const times=moment();
        console.log(timeAzan)
        console.log("momoebt")

        if(times.isAfter(moment(timeAzan.fagr,"hh:mm" ))&& 
        times.isBefore(moment(timeAzan.Dhuhr,"hh:mm")))
        {nextPrayer=1
        console.log("duhar"+nextPrayer)
        setLine(names[nextPrayer])
        }
        else if (times.isAfter(moment(timeAzan.Dhuhr,"hh:mm"))&&
        times.isBefore(moment(timeAzan.Asr,"hh:mm")))
        {nextPrayer=2
        console.log("asr"+nextPrayer)
        setLine(names[nextPrayer])
        }
        else if (times.isAfter(moment(timeAzan.Asr,"hh:mm"))&&
    times.isBefore(moment(timeAzan.Sunset,"hh:mm")))
    {nextPrayer=3
        console.log("maghreb"+nextPrayer)
        setLine(names[nextPrayer])
        }
    

    else if(times.isAfter(moment(timeAzan.Sunset,"hh:mm"))&&
        times.isBefore(moment(timeAzan.Isha,"hh:mm")))
        console.log("isha")
        else if (times.isAfter(moment(timeAzan.Isha,"hh:mm"))&&
        times.isBefore(moment(timeAzan.Fajr,"hh:mm"))) {
        console.log("fagrr")
        }

        const kol=times.diff(moment(timeAzan.Asr,"hh:mm"))
        console.log("loloooo"+ kol)
            const cola =moment.duration(kol)
            console.log("colaaaaaaaaaaaaaaaaoooo"+ cola.minutes()+ "+::" +cola.hours())

        // setTimer(cola)





    }



 
   
     


    return ( <>
    <Grid container spacing={5}  style={{display:"flex", justifyContent:"center"}} >
        <Grid xs={6}>
            <h1></h1>
            <h4>{today}</h4>
            <h1>{city.name}</h1>
        </Grid>
        <Grid xs={6}>
            <h4>متبقي حتي صلاه {line}</h4>
            <h1>4:25:55  </h1>
        </Grid>
    </Grid>
    <Divider style={{ borderColor:"white",opacity:"0.1"}} />
    <Stack   direction={"row"} justifyContent={"space-around"} style={{display:"flex", marginTop:"50px",}}>
       <AzanCard imgURL="https://dargahawlia.wordpress.com/wp-content/uploads/2010/11/azan232.jpg" nameOfAzan="al dahr" timing={timeAzan.Dhuhr} />
       <AzanCard imgURL="https://dargahawlia.wordpress.com/wp-content/uploads/2010/11/azan232.jpg" nameOfAzan="al asr " timing={timeAzan.Asr}/>
       <AzanCard imgURL="https://dargahawlia.wordpress.com/wp-content/uploads/2010/11/azan232.jpg" nameOfAzan="al maghrab " timing={timeAzan.Maghrib} />
       <AzanCard imgURL="https://dargahawlia.wordpress.com/wp-content/uploads/2010/11/azan232.jpg" nameOfAzan="isha " timing={timeAzan.Isha} />   
       <AzanCard imgURL="https://dargahawlia.wordpress.com/wp-content/uploads/2010/11/azan232.jpg" nameOfAzan="fagr " timing={timeAzan.Fajr} />



    </Stack>

    <div  style={{marginTop:"20px", display:"flex", justifyContent:"center", color: "white",fontSize:"15px" } } >   
    <select
    style={{ display:"flex", justifyContent:"center" , color: "white", width:"40%",fontSize:"20px" } }
    id="demo-simple-select"
    onChange={(e)=>{
        
        const selectedOption = e.target.selectedOptions[0]; // Get selected <option>
        const v = selectedOption.dataset.v; // Get `displayCity`
        const l = selectedOption.dataset.l;
        setCity({name:v,apo:l})
        // console.log("at button"+city.name)
        // console.log("at button"+city.apo)


    }}>
      

           
           { cities.map(x=>{
            return(
             <option     style={{ justifyContent:"center",color: "white", fontSize:"15px"} }

             value={x.displayCity} key={x.key} data-v={x.displayCity} 
             data-l={x.key} >
                {x.displayCity}
                
             </option>
           );})
           
}
         
          

    </select>

    </div> 
    
    </> );
}
 
export default HeadTitle;