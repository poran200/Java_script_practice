console.log('Hi there!');

//  axios.get('http://www.omdbapi.com/?i=tt3896198&apikey=5dec4e6')
//       .then(({data})=>{
//           console.log(data)
//       })
 const getMovies = async ()=>{
     const response = await axios.get('http://www.omdbapi.com/',{
         params:{
             apikey: '5dec4e6',
             s : 'avengers'
         }
     });
     console.log(response.data);
 }; 
 
 getMovies();