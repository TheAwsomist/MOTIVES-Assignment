import React ,{ createContext, useState } from "react";

export const ArtistContext = createContext({});

export function ArtistContextProvider({children}) {
    const [Input, SetInput] = useState("");
    const [artists_returned, SetArtists] = useState([]);
    const value ={
        Input,
        SetInput,
        artists_returned,
        SetArtists
    };
  return (
    <ArtistContext.Provider value={value}>
        {children}
    </ArtistContext.Provider>
  )
}


