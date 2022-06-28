import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "../style/EventsPage.css";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { ArtistCard, EventCardViewer } from "../components/CardViewer";
import { ArtistContext } from "../context/ArtistContext";

export default function EventsPage() {
  const artist_name = useParams().pathId; //fetched the selected artist's name with useParams of React Router Dom
  const { Events, SetEvents } = useContext(ArtistContext); //the hook of events from artist context
  const history = useHistory(); //Router's function to navigate back
  const location = useLocation();
  const [loading, setLoading] = useState(true); //hook for loading prompt
  const [noevent, setNoEvent] = useState(false); //hook for error prompt
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem(artist_name)); //getting data of events from session storage
    if (data && data[0].venue !== undefined) { //this check makes sure the returned data for subsequent artist name is the data of events and not of the artist itself as that data is also stored in correspondence to the artist name
      SetEvents(data);
      setLoading(false);
    } else {
      const event_url = `https://rest.bandsintown.com/artists/${artist_name}/events?app_id=abc`;
      axios.get(event_url).then((response) => {
        //same axios call for events
        response = response.data; //response is now an array without any header data
        if (response.length !== 0) {
          const arr = new Array(...response); //destructuring the response array into a variable to be pushed to the SetEvent hook
          SetEvents(arr);
          setLoading(false);
          sessionStorage.setItem(artist_name,JSON.stringify(arr));
        } else {
          setLoading(false);
          setNoEvent(true);
        }
      });
    }
    return () => {
      SetEvents([]); //clean up function called so it clears the events in the context to avoid any residual value
    };
  }, []);
  return (
    <div
      className="homepage"
      style={{ height: "fit-content" }}
      id="events-homepage"
    >
      <div className="inner-components" style={{}}>
        <div className="artist-section">
          <p onClick={() => history.push("/")} className="breadcrumb"> {/* used history of React Router to push back to the main page */}
            {"< Back To Results"}
          </p>
          <div className="selected-artist">
            <ArtistCard //data called from the previously passed Link using the useLocation
              artistname={location.state.name}
              artistfacebook={location.state.fb}
              image= {location.state.image}
              links = {location.state.links}
            />
          </div>
        </div>
        {Events.length !== 0 && (
          <div className="events-section">
            <p className="breadcrumb">{Events.length} Upcoming Events</p>
            <EventCardViewer />
          </div>
        )}
        {loading && <h4 className="loading">Loading..</h4>}
        {noevent && (
          <h4 className="loading">No Upcoming Events Of {artist_name} ; - ;</h4>
        )}
      </div>
    </div>
  );
}
