const key = `YHO8Et9qPjuqMGKJ6fxa52ETr9KLz3pLOAd8mBRmnZU`;

let page = 1;

const form = document.querySelector("form");

const inputElement = document.querySelector("input");

const searchElement = document.querySelector(".search-results");

const showMore = document.querySelector("#show-more-button");

let inputData = "";
async function searchImage() {
  inputData = inputElement.value;
  console.log(inputData);
  const imgUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`;
  const response = await fetch(imgUrl);
  const data = await response.json();

  console.log(data);

  if (page === 1) {
    searchElement.innerHTML = "";
  }
  const results = data.results;
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const aLink = document.createElement("a");
    aLink.href = result.links.html;
    aLink.target = "_blank";
    aLink.textContent = result.alt_description;
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(aLink);
    searchElement.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMore.style.display = "block";
  }
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  page = 1;
  searchImage();
});

showMore.addEventListener("click", () => {
  searchImage();
});
