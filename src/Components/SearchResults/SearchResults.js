import React from 'react';
import './SearchResults.css';

import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    render() {
        //const searchResults = this.state.searchResults;
        return (
            <div className="SearchResults">
            <h2>Results</h2>
            <TrackList 
                tracks = {this.props.searchResults}
                onAdd = {this.props.onAdd}/>
            </div>
        );
    }
}

export default SearchResults