import React ,{ createContext, useState } from "react";

export const ArtistContext = createContext({});

export function ArtistContextProvider({children}) {
    const [Artist,SetInput] = useState("");
    const [Events, SetEvents] = useState("");
    const [artists_returned, SetArtists] = useState([]);
    const [empty,SetEmpty] = useState(false);
    const [noresult,Setnoresult] = useState(false);
    const value ={
        Artist,
        SetInput,
        artists_returned,
        SetArtists,
        Events,
        SetEvents,
        empty,
        SetEmpty,
        noresult,
        Setnoresult
    };
  return (
    <ArtistContext.Provider value={value}>
        {children}
    </ArtistContext.Provider>
  )
}


