import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import axios from "axios";

import {API_KEY, TMDB_BASE_URL} from '../utils/constants';
// import {GENRES} from '../utils/constants'

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const  {data} = await axios.get('http://api.filmon.com/api/vod/genres');
  return data.response;
});

const getRawData = async (api, genres, paging = false) => {
    console.log("getraw data called")
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 11; i++) {
      const { data: { response}} = await axios.get(`${api}?genre=${genres[i].slug}&max_results=12`);
      response.forEach(movie => {
        moviesArray.push({
            id: movie._id,
            name: movie.title,
            image: movie.poster.url,
            genres: movie.genres,
            key:movie._id,
          });
      });
    
    }
    console.log('moviesArray',moviesArray)
    return moviesArray;
  };

export const fetchMovies = createAsyncThunk(
    "netflix/trending",
    async ({ type }, thunkAPI) => {
      const { netflix: { genres }} = thunkAPI.getState();
      return getRawData(
        `https://api.filmon.com/api/vod/search`, genres,true);
    }
  );


  export const fetchDataByGenre = createAsyncThunk(
    "netflix/genre",
    async ({ genre, type }, thunkAPI) => {
      const {netflix: { genres }} = thunkAPI.getState();
      const movie = genres.filter((movie)=>movie.id === genre);
      const { data: { response}} = await axios.get(`https://api.filmon.com/api/vod/search?genre=${movie[0].slug}&max_results=70`);
      const genreMoviesArray = [];
      response.forEach(movie => {
        genreMoviesArray.push({
            id: movie._id,
            name: movie.title,
            image: movie.poster.url,
            genres: movie.genres,
            key:movie._id,
          });
      });
      console.log("genreMoviesArray",genreMoviesArray);
      return genreMoviesArray;
    }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresLoaded = true;
      });
      builder.addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      }); 
      builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
  },
});





export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});


