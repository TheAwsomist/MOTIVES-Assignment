import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { ArtistContext } from "../context/ArtistContext";
import "../style/SearchBar.css";

export default function SearchBar() {
  const Input = useRef("");
  const { SetArtists, SetInput } = useContext(ArtistContext); //context was used as the scale of the application was not as big so using the Redux wasn't necessary
  useEffect(() => console.log(Input), [Input]); //console.log check to see if the input is being recorded by the hook
  // const input_handler = (e) => {
  //   //this piece of timed out code only calls the hook after a brief pause of 200ms while typing in the search field as to avoid unnecessary calls and achieve efficiency
  //   setTimeout(() => SetInput(e.target.value), 200);
  // };


  const search_handler = (e) => {
    e.preventDefault(); //to prevent form's default submission and refreshing of page
    var to_be_searched = Input.current.value;
    SetInput(to_be_searched);
    to_be_searched = to_be_searched.toLowerCase(); //converts the input data into lower case
    to_be_searched = to_be_searched.replace(/ /gi, "%20"); //swaps the whitespaces with %20
    to_be_searched = to_be_searched.replace("/", "%252F"); //swaps the whitespaces with %20
    to_be_searched = to_be_searched.replace("?", "%253F"); //swaps the whitespaces with %20
    to_be_searched = to_be_searched.replace("*", "%252A"); //swaps the whitespaces with %20
    to_be_searched = to_be_searched.replace("\"", "%27C"); //swaps the whitespaces with %20
    // thing to note is that I used the actual url instead of api as
    //api only returned results of a single artist on every search
    // to secure suggested results, I had to delve deeper into the requests made on the website by the searchbar
    // using the network tab on google's developer console
    // the above idea was dropped as per coordinated instructions from Sir Faizan
    const url = `https://rest.bandsintown.com/artists/${to_be_searched}?app_id=abc` //url of the API
    axios.get(url).then((response) => {
      //axios api has been used to make get request using the url
      console.log(response.data);
      if (response.data.id) {
        //the returned result is checked whether it isn't empty or anything cuz the api does return code 200 even when there is no artist found with an empty json
        var artists = [];
        artists.push(response.data); //artist data pushed into the array
        SetArtists(artists); //array pushed into the hook called earlier using the useContext hook
      }
    });
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
      <BsSearch className="search-icon" />
    </div>
  );
}
