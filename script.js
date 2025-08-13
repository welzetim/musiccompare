const CLIENT_ID = "fc868b53f27848d092df840e981fd61e";
const REDIRECT_URI = "https://welzetim.github.io/musiccompare/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

document.getElementById("login-btn").addEventListener("click", () => {
    window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`;
});


function getTokenFromUrl() {
    const hash = window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});
    window.location.hash = "";
    return hash.access_token;
}

async function getTopArtists(token) {
    const result = await fetch("https://api.spotify.com/v1/me/top/artists", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });
    const data = await result.json();

    const container = document.getElementById("top-artists");
    container.innerHTML = "";

    data.items.forEach(artist => {
        container.innerHTML += `
            <div class="artist">
                <img src="${artist.images[0]?.url || ''}" alt="${artist.name}">
                <p>${artist.name}</p>
                <small>${artist.genres.join(", ")}</small>
            </div>
        `;
    });
}

const token = getTokenFromUrl();
if (token) {
    getTopArtists(token);
}
