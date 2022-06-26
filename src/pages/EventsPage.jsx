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
  const [loading, setLoading] = useState(true);
  const [noevent, setNoEvent] = useState(false);
  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem(artist_name));
    if (data && data[0].venue !== undefined) {
      SetEvents(data);
      setLoading(false);
    } else {
      const event_url = `https://rest.bandsintown.com/artists/${artist_name}/events?app_id=abc`;
      axios.get(event_url).then((response) => {
        //same axios call for events
        response = response.data; //response is now an array without any header data
        if (response.length !== 0) {
          const arr = new Array(...response); //destructuring the response array into a variable to be pushed to the SetEvent hook
          console.log(arr);
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
      SetEvents([]);
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
          <p onClick={() => history.push("/")} className="breadcrumb">
            {"< Back To Results"}
          </p>
          <div className="selected-artist">
            <ArtistCard
              artistname={location.state.name}
              artistfacebook={location.state.fb}
              image= {location.state.image}
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
