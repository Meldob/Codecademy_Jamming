import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

/*
class TrackList extends React.Component {
    render() {
        const tracks = this.props.tracks.map(track =>
            <Track
            key={track.id}
            onAdd = {this.props.onAdd}
            onRemove = {this.props.onRemove}
            track={track}/>
        )
        return (
            <div className = 'TrackList'>
                {tracks}
            </div>
        )
    }
}
*/

class TrackList extends React.Component {
    render() {
            return (
                <div className= 'TrackList'>
                    {this.props.tracks.map(track => <Track key={track.id} track = {track} onRemove= {this.props.onRemove} onAdd={this.props.onAdd}/>)}
                </div>
            );
    }
}

export default TrackList