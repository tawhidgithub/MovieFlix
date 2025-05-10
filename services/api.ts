export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  header: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

//

export const fetchMovie = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    console.log(`---------URL: ${endpoint}`);
    

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.header,
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch movies and status Code : ${response.statusText}`
    );
  }
  
  const data = await response.json();

  return data.results;
};

export const fetchMovieDetails=async(movieId:string):Promise<MovieDetails>=>{


try {
  
const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{



  method:'GET',
  headers:TMDB_CONFIG.header

})

console.log(`-----------Api Url : ${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`);


if(!response.ok) throw new Error("Failed to get the movie Details")



  const data= await response.json();
  console.log(`Response :=> ${data}`);

  return data;
} catch (error) {
  console.log(error);
  throw error;
  
}


}
