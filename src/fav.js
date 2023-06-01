// Get the timer element from the DOM
const timerEl = document.getElementById("timer");

// Function to update the timer every second
(function () {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
  
    //I'm adding this section so I don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = 2023;
    birthday = "06/30/2023"
    
    today = mm + "/" + dd + "/" + yyyy;
    //end
    
    const countDown = new Date(birthday).getTime(),
        x = setInterval(function() {    
  
          const now = new Date().getTime(),
                distance = countDown - now;
  
          document.getElementById("days").innerText = Math.floor(distance / (day)),
            document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
  
          //do something later when date is reached
          if (distance < 0) {
            document.getElementById("headline").innerText = "It's release time!";
            document.getElementById("countdown").style.display = "none";
            document.getElementById("content").style.display = "block";
            clearInterval(x);
          }
          //seconds
        }, 0)
    }());

    document.addEventListener('DOMContentLoaded', () => {
        // Get the artist's image element from the DOM
        const artistImgEl = document.querySelector('.artist-info img');
      
        // Set the initial scale of the image
        let scale = 1;
      
        // Add a zoom-in/zoom-out animation to the artist's image
        artistImgEl.addEventListener('mouseenter', () => {
          // Increase the scale by 20%
          scale *= 1.07;
          // Apply the new scale to the image using the CSS transform property
          artistImgEl.style.transform = `scale(${scale})`;
        });
      
        artistImgEl.addEventListener('mouseleave', () => {
          // Reset the scale to 1
          scale = 1;
          // Apply the new scale to the image using the CSS transform property
          artistImgEl.style.transform = `scale(${scale})`;
        });
      });
      
const reviews = {};

const form = document.getElementById("review-form");
      
form.addEventListener("submit", function(event) {
  event.preventDefault(); // prevent the form from submitting
      
  // get the values from the form
  const name = document.getElementById("name").value;
  const rating = document.querySelector("input[name='rating']:checked").value;
  const review = document.getElementById("review").value;
      
  // create a new review object
  const newReview = {
    name: name,
    rating: rating,
    review: review
  };
      
  // add the new review to the reviews dictionary
  reviews[name] = newReview;
      
  // call the displayReviews function to update the table
  displayReviews();
      
  // reset the form
  form.reset();
});
      
function displayReviews() {
  const table = document.getElementById("reviews-table");
  table.innerHTML = "";
      
  // create the table header
  const headerRow = document.createElement("tr");
  const nameHeader = document.createElement("th");
  nameHeader.innerText = "Name";
  const ratingHeader = document.createElement("th");
  ratingHeader.innerText = "Rating";
  const reviewHeader = document.createElement("th");
  reviewHeader.innerText = "Review";
  headerRow.appendChild(nameHeader);
  headerRow.appendChild(ratingHeader);
  headerRow.appendChild(reviewHeader);
  table.appendChild(headerRow);
      
  // create a table row for each review
  Object.values(reviews).forEach(function(review) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.innerText = review.name;
    const ratingCell = document.createElement("td");
    ratingCell.innerText = review.rating;
    const reviewCell = document.createElement("td");
    reviewCell.innerText = review.review;
    row.appendChild(nameCell);
    row.appendChild(ratingCell);
    row.appendChild(reviewCell);
    table.appendChild(row);
  });
}
