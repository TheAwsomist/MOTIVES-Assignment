import React, { useContext } from "react";
import { ArtistContext } from "../context/ArtistContext";
import {ArtistCardViewer } from "./CardViewer";

export default function SearchResult() {
  const { artists_returned, Artist } = useContext(ArtistContext);
  console.log(Artist);
  return (
    <div className="search-result">
      {artists_returned.length !== 0 && <div>
        {/* conditional render based on whether the array of artists returned is populated or not */}
          <h2 className="results-returned">
            {artists_returned.length} results returned for "{Artist}"
          </h2>
          {/* card viewer */}
          <ArtistCardViewer/>
      </div>}
    </div>
  );
}
