const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('search-btn');
const countryContainer = document.getElementById('country-container')
const errorDiv = document.getElementById('error')
const countryDetails = document.getElementById('country-details')
const spinner =document.getElementById('spinner')
searchButton.addEventListener('click', function () {
  const search = searchInput.value;
  searchInput.value = '';
  countryContainer.textContent = '';
  countryDetails.textContent = '';

  if (search === '') {
    errorDiv.innerText = "search field can't be empty"
    return;
  }
  // console.log(search);
  const url = `https://restcountries.eu/rest/v2/name/${search}`
   spinner.classList.remove('d-none')
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // Setting a timer of 1.5s, before removing the spinnner, and showing data
      setTimeout(() => {
        spinner.classList.add("d-none");
        showData(data);
      }, 1500);
    })
});
function showData(countryArray) {
  
    // console.log(data);
    if (countryArray.status === 404) {
      errorDiv.innerText = 'No Match Found';
    }
    else {
      errorDiv.innerText = '';
    }
    countryArray.forEach((item) => {
      console.log(item.flag);
      const div = document.createElement('div')
      div.classList.add('col-md-3')
      div.innerHTML = `
              <div class="rounded overflow-hidden border p-2">
              <img
                src="${item.flag}"
                class="w-100"
                alt=""
              />
            </div>
            
            <div
              class="
                py-2
                d-flex
                justify-content-between
                align-items-center
                d-md-block
                text-md-center
              "
            >
              <h1>${item.name}</h1>
              <button onclick="showDetails('${item.alpha3Code}')" class="btn btn-dark">Learn More</button>
            </div>
          </div>  
              `
      countryContainer.appendChild(div);
       })
}
function showDetails(alpha3Code) {
  const url = `https://restcountries.eu/rest/v2/alpha/${alpha3Code}`
  fetch(url)
    .then(res => res.json())
    .then(data => {
      countryDetails.innerHTML = `
      <div class="col-md-12">
      <h1>${data.name}</h1>
      <p>Capital:${data.capital}</p>
      <p>Currency Name:${data.currencies[0].name}</p>
      <p>Currency Symbol:${data.currencies[0].symbol}</p>
      </div>
      `
    })
}
