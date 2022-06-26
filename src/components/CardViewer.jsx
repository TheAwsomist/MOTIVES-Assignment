import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ArtistContext } from "../context/ArtistContext";
import "../style/Card.css";

export function ArtistCardViewer() {
  const { artists_returned } = useContext(ArtistContext);
  return (
    <>
      {artists_returned !== 0 && (
        <div className="cardviewer">
          {artists_returned.map((artist) => {
            return (
              <Link
                to={{
                  pathname: `${artist.name}`,
                  state: { name: artist.name, fb: artist.facebook_page_url, image:artist.image_url },
                }}
              >
                <ArtistCard
                  key={artist.id}
                  artistname={artist.name}
                  artistfacebook={artist.facebook_page_url}
                  image={artist.image_url}
                />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export function EventCardViewer(){
  const {Events} = useContext(ArtistContext);
  return(
    <>
      {Events.length !== 0 && <div className="events-cardviewer">
        {Events.map(event =>{
          const date = event.datetime.substring(0,10);
          return(<EventCard country={event.venue.country} city={event.venue.city} venue={event.venue.name} date={date}/>)
        })}
        </div>}
    </>
  );
}

export function ArtistCard({ artistname, artistfacebook, image }) {
  return (
    <div className="artist-card">
      <div className="avatar" style={{backgroundImage:`url(${image})`}}></div>
      <section className="artist-info">
        <h3 className="artist-name">{artistname}</h3>
        <h5 className="artist-facebook">{artistfacebook}</h5>
      </section>
    </div>
  );
}

export function EventCard({country,city,venue,date}){
  return( 
    <div className="event-card">
      <h3 className="header">EVENT DETAILS</h3>
      <div className="event-details">
        <div className="detail-snippet">
          <h4 className="detail-header">Country</h4>
          <p className="detail-data">{country}</p>
        </div>
        <div className="detail-snippet">
          <h4 className="detail-header">City</h4>
          <p className="detail-data">{city}</p>
        </div>
        <div className="detail-snippet">
          <h4 className="detail-header">Venue</h4>
          <p className="detail-data">{venue}</p>
        </div>
        <div className="detail-snippet">
          <h4 className="detail-header">Date</h4>
          <p className="detail-data">{date}</p>
        </div>
      </div>
    </div>
  );
}
