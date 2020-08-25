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
  console.log(response.data);
};

const inputElemnt = document.querySelector("input");
let timoutId;
const onInput = (event) => {
    // if timeOut is not defined mean input is null
  if (timoutId) {
      // remove old time out 
    clearTimeout(timoutId);
  }
  timoutId = setTimeout(() => {
    getMovies(event.target.value.trim());
  },1000);
};
inputElemnt.addEventListener("input", onInput);
