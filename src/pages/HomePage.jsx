import React from "react";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";
import "../style/HomePage.css";

export default function HomePage() {
  return (
    // the core idea was to split up the homepage into as many reusable components as possible
    <div className="homepage">
      <div className="inner-components">
        <SearchBar />
        {/* conditional rendering in the SearchResult Component */}
        <SearchResult />
      </div>
    </div>
  );
}
