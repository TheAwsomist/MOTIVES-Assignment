import React ,{ createContext, useState } from "react";

export const ArtistContext = createContext({});

export function ArtistContextProvider({children}) {
    let [Artist,SetInput] = useState("");
    let [Events, SetEvents] = useState("");
    const [artists_returned, SetArtists] = useState([]);
    const value ={
        Artist,
        SetInput,
        artists_returned,
        SetArtists,
        Events,
        SetEvents
    };
  return (
    <ArtistContext.Provider value={value}>
        {children}
    </ArtistContext.Provider>
  )
}


