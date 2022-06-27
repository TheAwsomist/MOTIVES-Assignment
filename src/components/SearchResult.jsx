import React, { useContext } from "react";
import { ArtistContext } from "../context/ArtistContext";
import {ArtistCardViewer } from "./CardViewer";
import { GiCookie } from "react-icons/gi";


export default function SearchResult() {
  const { artists_returned, Artist, empty, noresult } = useContext(ArtistContext);
  // imported empty and noresult hook constant for conditional rendering of components
  return (<>
      {artists_returned.length !== 0 && <div style={{width:"100%"}}>
        {/* conditional render based on whether the array of artists returned is populated or not */}
            <h2 className="results-returned">
              {artists_returned.length} {artists_returned.length === 1? 'result': 'results'} returned for "{Artist}"
            </h2>
            {/* card viewer */}
            <ArtistCardViewer/>
      </div>}
      {/*conditional rendering of the prompt if it returns no result*/}
      {noresult && <div className="no-results-returned">Welp! We couldn't find your artist, so here's a cookie instead <GiCookie style={{marginTop:"5px", color:"#E6CEA0"}}/></div>}
      {/*conditional rendering of the prompt if the user presses enter without typing any name*/}
    {empty && <div className="no-results-returned">You didn't type any name there Bucko! try Atif Aslam, heard he's a good singer</div>}
    </>
  );
}
