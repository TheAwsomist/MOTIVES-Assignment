import React, { useContext } from "react";
import { ArtistContext } from "../context/ArtistContext";

export default function SearchResult() {
  const { artists_returned, Input } = useContext(ArtistContext);
  return (
    <div className="search-result">
      {artists_returned.length !== 0 && <div>
          <h2 className="results-returned">
            {artists_returned.length} results returned for {Input}
          </h2>
          {/* space for card component */}
      </div>}
    </div>
  );
}
