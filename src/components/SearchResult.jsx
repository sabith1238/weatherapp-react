import React from 'react';
import './SearchResult.css';

export default function SearchResult({result, countryFlag, handleSubmit}) {
    const country = `https://flagcdn.com/w80/${countryFlag.toLowerCase()}.png`;
    return (
        <div className="search-result" onClick={(e) => {
            console.log(result.name);
            handleSubmit(e);
        }}>{result.name}, {result.state}, {result.country} <img className='search-country' src={country} alt=""/></div>
    )
}