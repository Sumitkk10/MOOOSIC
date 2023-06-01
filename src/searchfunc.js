const extract = document.getElementById('Form');
const durationFilter = document.getElementById('duration-filter');
const explicitFilter = document.getElementById('explicit-filter');
let applyFilters = document.getElementById('apply-filters');
let clearFilters = document.getElementById('clear-filters');
let store = '', expl = '';

applyFilters.addEventListener('click', () => {
    const maxDuration = durationFilter.value;
    const explicit = explicitFilter.checked;
   
    if(maxDuration){
        store = maxDuration;
        
    }

    if(explicit){
        expl = '1';
    }

});

extract.addEventListener('submit', (Event) => {
    Event.preventDefault();
    const input = document.getElementById('Input').value;
    const searchTerm = input;
    const mediaType = 'music';
    let endpoint = `https://itunes.apple.com/search?term=${searchTerm}&media=${mediaType}`;
    if(expl != ''){
        endpoint += '&explicit=yes';
    }
    else{
        endpoint += '&explicit=no';
    }
    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        // handle the response data here
        const tableBody = document.querySelector('#resultsTable tbody');
        tableBody.innerHTML = '';
        const filteredResults = data.results.filter(result => {
            if (store && result.trackTimeMillis) {
              const durationInSeconds = result.trackTimeMillis / 1000;
              return durationInSeconds <= (store*60);
            }
            return true;
        });
    
        let cnt = 0;
        filteredResults.some(result => {
            ++cnt;
            if(cnt == 11){
                return true;
            }
            const row = document.createElement('tr');
            const trackNameCell = document.createElement('td');
            const artistNameCell = document.createElement('td');
            const albumNameCell = document.createElement('td');
            const image = document.createElement('img');
            const play = document.createElement('td');
            trackNameCell.textContent = result.trackName;
            artistNameCell.textContent = result.artistName;
            albumNameCell.textContent = result.collectionName;
            image.src = result.artworkUrl60;
            if(result.previewUrl){
                var song = document.createElement('audio');
                song.src = result.previewUrl;
                song.controls = true;
                song.autoplay = false;
                song.preload = "none"; 
                play.appendChild(song);
            }
            image.alt = 'Album art';
            row.appendChild(trackNameCell);
            row.appendChild(artistNameCell);
            row.appendChild(albumNameCell);
            row.appendChild(image);
            row.appendChild(play);
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        // handle errors here
        console.error(error);
    });
});

clearFilters.addEventListener('click', () => {
    // Reset the filter values
    durationFilter.value = '';
    explicitFilter.checked = false;
    expl = '';
    store = '';
  
    // Refresh the search results without any filters
    applyFilters.click();
});