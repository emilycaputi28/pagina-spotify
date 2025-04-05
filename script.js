const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const playlistContainer = document.getElementById('playlist-result');

function requestApi(searchTerm) {
    fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
      .then((response) => response.json())
      .then((results) => displayResults(results));
}
  
function displayResults(results) {
    hidePlaylists();
    resultArtist.innerHTML = ""; 

    results.forEach((element) => {
        const artistCard = document.createElement('div');
        artistCard.innerHTML = `
            <img src="${element.urlImg}" alt="${element.name}" class="artist-img">
            <h2 class="artist-name">${element.name}</h2>
        `;
        resultArtist.appendChild(artistCard);
    });

    resultArtist.classList.remove("hidden");
}
  
function hidePlaylists() {
    playlistContainer.classList.add("hidden");
}
  
searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === "") {
        resultArtist.classList.add("hidden");
        playlistContainer.classList.remove("hidden");
        return;
    }
    requestApi(searchTerm);
});