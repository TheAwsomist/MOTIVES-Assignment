import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import "../style/EventsPage.css";
import { useParams, useHistory, useLocation} from 'react-router-dom'
import { ArtistCard, EventCardViewer } from '../components/CardViewer';
import { ArtistContext } from '../context/ArtistContext';

export default function EventsPage(props) {
    const artist_name = useParams().pathId; //fetched the selected artist's name with useParams of React Router Dom
    const {Events, SetEvents} = useContext(ArtistContext); //the hook of events from artist context
    const history = useHistory(); //Router's function to navigate back
    const location = useLocation();
    useEffect(()=>{
        const event_url = `https://rest.bandsintown.com/artists/${artist_name}/events?app_id=abc`;
        axios.get(event_url).then((response)=>{ //same axios call for events
            response = response.data; //response is now an array without any header data
            const arr = new Array(...response); //destructuring the response array into a variable to be pushed to the SetEvent hook
            console.log(arr);
            SetEvents(arr);
        });
    },[]);
  return (
    <div className='homepage' style={{height:"fit-content"}} id="events-homepage">
        <div className='inner-components' style={{}}>
            <div className='artist-section'>
                <p onClick={()=>history.push("/")} className="breadcrumb">{"< Back To Results"}</p>
                <div className='selected-artist'>
                    <ArtistCard artistname={location.state.name} artistfacebook={location.state.fb}/>
                </div>
            </div>
            {Events.length !== 0 && <div className='events-section'>
                <p className='breadcrumb'>{Events.length} Upcoming Events</p>
                <EventCardViewer/>
            </div>}
            {Events.length === 0 && <p>No Upcoming Events</p>}
        </div>
    </div>
  )
}
