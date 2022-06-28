import React, { useContext } from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ArtistContext } from "../context/ArtistContext";
import "../style/Card.css";

export function ArtistCardViewer() {
  const { artists_returned } = useContext(ArtistContext);
  return (
    <>
      {artists_returned !== 0 && ( //conditional rendering to avoid undefined error in async data call from axios
        <div className="cardviewer">
          {artists_returned.map((artist) => {
            //map loads data dynamically of the returned artists
            return (
              <Link
                key={artist.id.toString()}
                to={{
                  pathname: `${artist.name}`,
                  state: {
                    name: artist.name,
                    fb: artist.facebook_page_url,
                    image: artist.image_url,
                    links: artist.links,
                  },
                }} //used state to send data over link to the component in react router dom
              >
                <ArtistCard
                  key={artist.id.toString()}
                  artistname={artist.name}
                  artistfacebook={artist.facebook_page_url}
                  image={artist.image_url}
                  links={artist.links}
                />{" "}
                {/*artist card component down below*/}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export function EventCardViewer() {
  const { Events } = useContext(ArtistContext);
  return (
    <>
      {Events.length !== 0 && (
        <div className="events-cardviewer">
          {" "}
          {/*conditional rendering to avoid undefined error in async data call from axios*/}
          {Events.map((event) => {
            const date = event.datetime.substring(0, 10);
            return (
              <EventCard
                key = {event.id.toString()}
                country={event.venue.country}
                city={event.venue.city}
                venue={event.venue.name}
                date={date}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export function ArtistCard({ artistname, artistfacebook, image, links }) {
  return (
    <div className="artist-card">
      {/*basic card component to display the data in a styled manner, styling being provided in the css file in the style folder*/}
      <div
        className="avatar"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <section className="artist-info">
        <h3 className="artist-name">{artistname}</h3>
        <h5 className="artist-facebook">{artistfacebook}</h5>
        {links.length !== 0 && (
          <div className="social-media">
            {links.map((link) => { //dynamically rendering the social media links
              if (link.type === "facebook")
                return <a href={link.url} style={{color:"#262626"}} target="_blank"><BsFacebook style={{ marginRight: "5px" }} /></a>;
              else if (link.type === "twitter")
                return <a href={link.url} style={{color:"#262626"}} target="_blank">
                  <BsTwitter style={{ marginRight: "5px" }} />
                </a>;
              else if (link.type === "instagram")
                return <a href={link.url} style={{color:"#262626"}} target="_blank">
                  <BsInstagram style={{ marginRight: "5px" }} />
                </a>;
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export function EventCard({ country, city, venue, date }) {
  return (
    <div className="event-card">
      {/*basic card component to display the data in a styled manner, styling being provided in the css file in the style folder*/}
      <h3 className="header">EVENT DETAILS</h3>
      <div className="event-details">
        <div className="detail-snippet topright">
          <h4 className="detail-header">Country</h4>
          <p className="detail-data">{country}</p>
        </div>
        <div className="detail-snippet bottom">
          <h4 className="detail-header">City</h4>
          <p className="detail-data">{city}</p>
        </div>
        <div className="detail-snippet right">
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
