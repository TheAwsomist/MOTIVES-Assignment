import axios from "axios";
import React, { useContext, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { ArtistContext } from "../context/ArtistContext";
import "../style/SearchBar.css";

export default function SearchBar() {
  const { Input, SetInput, SetArtists } = useContext(ArtistContext);
  useEffect(() => console.log(Input), [Input]);
  const input_handler = (e) => {
    setTimeout(() => SetInput(e.target.value), 200);
  };

  const search_handler = (e) => {
    e.preventDefault();
    // if(e.key === 'Enter')
    //     console.log("searching for " + Input);
    var to_be_searched = Input;
    to_be_searched = to_be_searched.toLowerCase();
    to_be_searched = to_be_searched.replace(/ /gi, "%20");
    const url = `https://rest.bandsintown.com/artists/${to_be_searched}?app_id=abc`;
    axios.get(url).then((response) => {
      console.log(response.data);
      if (response.data.id) {
        var artists = [];
        artists.push(response.data);
        SetArtists(artists);
      }
    });
  };
  return (
    <div className="searchbar">
      <form action="" onSubmit={search_handler}>
        <input
          type="text"
          placeholder="Search Artist"
          name=""
          id=""
          className="search-input"
          onChange={input_handler}
        />
      </form>
      <BsSearch className="search-icon" />
    </div>
  );
}
