fetch('http://localhost:5000/api')
  .then(response => response.json())
  .then(data => {
    const parent=document.getElementsByClassName("main")[0]
    const table = document.getElementsByClassName("table")[0];
    for (let i = 0; i < data.length; i++) {
      console.log(data);
      const row = document.createElement("tr");
      const name = document.createElement("td");
      const artist = document.createElement("td");
      const song = document.createElement("td");
      const duration = document.createElement("td");
      const remove = document.createElement("td");
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('bt');
      removeBtn.id = data[i]['id'];
      remove.appendChild(removeBtn);
      song.textContent = data[i]['song'];
      artist.textContent = data[i]['artist'];
      duration.textContent = data[i]['duration'];
      
      row.appendChild(artist);
      row.appendChild(song);
      row.appendChild(duration);
      row.appendChild(remove);
      table.appendChild(row);
      console.log(data[i]['id']);
     
      
      removeBtn.addEventListener('click', (event) => {
        
        const rowIndex = event.target.parentElement.parentElement.rowIndex;
        console.log(1);
        table.deleteRow(rowIndex);
        for (let j = rowIndex; j < table.rows.length; j++) {
          table.rows[j].rowIndex = j;
        }

        dict=data[i]

        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data[i])
          };

        fetch('http://localhost:5000/api/delete',options)
            .then(response => response.json())
            .then(data => {
                
                console.log("done");
         });


      });
    }
  })
  .catch(error => {
    console.error(error);
  });