const clientId = 'xxx'
const redirectUri = 'http://localhost:3000/'
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
let accessToken = '';
let expiresIn = '';

let userToken = {}
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (urlAccessToken && urlExpiresIn) {
            accessToken = urlAccessToken[1];
            expiresIn = urlExpiresIn[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }
        else {
        window.location = spotifyUrl;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken()
        
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            })
        })
    },
    savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) {
            return
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization : `Bearer ${accessToken}`
        };
        let userId;
        return fetch('https://api.spotify.com/v1/me', {
            headers: headers
            }
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name : name})
            }).then(response => response.json()
            .then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers : headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                });
            })
            )
        });
    }

}   


export default Spotify