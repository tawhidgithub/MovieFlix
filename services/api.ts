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
