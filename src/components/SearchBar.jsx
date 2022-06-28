import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { ArtistContext } from "../context/ArtistContext";
import "../style/SearchBar.css";

export default function SearchBar() {
  const Input = useRef("");
  const { SetArtists, SetInput, SetEmpty, Setnoresult, noresult, artists_returned } = useContext(ArtistContext); //context was used as the scale of the application was not as big so using the Redux wasn't necessary
  useEffect(() => artists_returned !== undefined ?Setnoresult(false):Setnoresult(noresult),[artists_returned]); //useEffect was used to set the noresult hook to false as doing it inside axios resulted in an asynchronous call and was not working at all

  const search_handler = (e) => {
    e.preventDefault(); //to prevent form's default submission and refreshing of page
    var to_be_searched = Input.current.value;
    SetArtists([]);
    if (to_be_searched.length !== 0) {
      SetEmpty(false);
      SetInput(to_be_searched);
      to_be_searched = to_be_searched.toLowerCase(); //converts the input data into lower case
      to_be_searched = to_be_searched.replace(/ /gi, "%20"); //swaps the whitespaces with %20
      to_be_searched = to_be_searched.replace("/", "%252F"); //swaps the / with %252F
      to_be_searched = to_be_searched.replace("?", "%253F"); //swaps the ? with %253F
      to_be_searched = to_be_searched.replace("*", "%252A"); //swaps the * with %252A
      to_be_searched = to_be_searched.replace('"', "%27C"); //swaps the " with %27C
      const data = sessionStorage.getItem(to_be_searched);
      if (!data) {
        // thing to note is that I used the actual url instead of api as
        //api only returned results of a single artist on every search
        // to secure suggested results, I had to delve deeper into the requests made on the website by the searchbar
        // using the network tab on google's developer console
        // the above idea was dropped as per coordinated instructions from Sir Faizan
        const url = `https://rest.bandsintown.com/artists/${to_be_searched}?app_id=abc`; //url of the API
        axios.get(url).then((response) => {
          //axios api has been used to make get request using the url
          if (response.data.id) {
            //the returned result is checked whether it isn't empty or anything cuz the api does return code 200 even when there is no artist found with an empty json
            var artists = [];
            artists.push(response.data); //artist data pushed into the array
            SetArtists(artists); //array pushed into the hook called earlier using the useContext hook
            sessionStorage.setItem(to_be_searched, JSON.stringify(artists)); //session storage stores the searched artist's details
          }else{
            Setnoresult(true); //if no artist returned set the noresult hook to true
          }
        });
      } else {
        SetArtists(JSON.parse(data)); //if data found in session storage then set the hook variable in the context to the data fetched from the session storage earlier
      }
    } else{
      SetEmpty(true);
    }
  };
  return (
    <div className="searchbar">
      {/* searchbar div with 2 items only, the input field and the search icon */}
      <form action="" onSubmit={search_handler}>
        <input
          type="text"
          placeholder="Search Artist"
          name=""
          id=""
          className="search-input"
          ref={Input}
        />
      </form>
      <BsSearch className="search-icon" onClick={search_handler}/>
    </div>
  );
}
