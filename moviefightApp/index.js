console.log("Hi there!");

//  axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=5dec4e6')
//       .then(({data})=>{
//           console.log(data)
//       })
const getMovies = async (searchInput) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "5dec4e6",
      s: searchInput,
    },
  });
  if (response.data.Error) {
    return [];
  }
  return response.data.Search;
};
const getMovieById = async (id) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "5dec4e6",
      i: id,
    },
  });
  if (response.data.Error) {
    return [];
  }
  return response.data;
};
const root = document.querySelector(".autocomplate");
root.innerHTML = `
<label><b>Search for a Movie</b></label>
 <div class="dropdown">
   <input class="input">
  <div class="dropdown-menu">
    <div class="dropdown-content results">
    </div>
  </div>
</div>
 `;
const inputElemnt = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultWaraper = document.querySelector(".results");
// let timoutId;
const onInput = async (event) => {
  const movies = await getMovies(event.target.value);
 if(!movies.length){
   dropdown.classList.remove('is-active');
   return;
 }
  resultWaraper.innerHTML = "";
  dropdown.classList.add("is-active");

  for (const movie of movies) {
    const option = document.createElement("a");
    option.classList.add("dropdown-item");
    const imageSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    option.innerHTML = `
         <img src="${imageSrc}"/>
         ${movie.Title}
        `;
    resultWaraper.appendChild(option);
    option.addEventListener('click',(event)=>{
      dropdown.classList.remove('is-active');
         onMovieSelect(movie);
         inputElemnt.value=movie.Title;
         console.log(movie.Title);
    })
  }
};
inputElemnt.addEventListener("input", debounce(onInput, 1000));
document.addEventListener('click',(event)=>{
     if(!root.contains(event.target)){
       dropdown.classList.remove('is-active');
     }
})

const onMovieSelect = async (movie)=>{
   const movieWithDetails = await getMovieById(movie.imdbID);
   console.log(movieWithDetails);
}