import React from 'react';
import SearchResult from "./SearchResult.jsx";
import './SearchResultsList.css';

export default function SearchResultsList({results , handleSumbit}) {
    return (
        <div className='results-list'>
            {results.map(result => <SearchResult key={`${result.lat}+${result.lon}`} result={result} countryFlag={result.country} handleSubmit={handleSumbit} />)}
        </div>
    )
}