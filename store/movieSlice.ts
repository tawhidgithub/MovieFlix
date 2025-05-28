import { getTheSaveMovie, saveTheMovie } from "@/services/appWrith";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MovieProps {
  saveMovieLoading: boolean;
  saveMovieData: SavedMovie | null;
  saveMovieError: string | null;
  getMovieLoading: boolean;
  getMovieData: SavedMovie[] | null;
  getMovieError: string | null;
}

const initialState: MovieProps = {
  /// save movie
  saveMovieLoading: false,
  saveMovieData: null,
  saveMovieError: null,
  /// get Movie
  getMovieData: null,
  getMovieLoading: false,
  getMovieError: null,
};

export const saveMovie = createAsyncThunk(
  "movie/saveMovie",
  async ({ movie, userID }: { movie: MovieDetails; userID: string }) => {
    try {
      saveTheMovie({ movie: movie, userId: userID });
      return;
    } catch (error) {
      console.log(`Error in save Movie Slice, Error :-${error}  `);
      throw error;
    }
  }
);
export const getTheMovie = createAsyncThunk(
  "movie/getMovie",
  async (userID: string) => {
    try {
      const savedMovie = await getTheSaveMovie(userID);
      return savedMovie;
    } catch (error) {
      console.log(`Error in Get The save Movie Slice, Error :-${error}  `);
      throw error;
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveMovie.pending, (state) => {
        state.saveMovieLoading = true;
      })
      .addCase(saveMovie.fulfilled, (state, action) => {
        state.saveMovieLoading = false;
      })
      .addCase(saveMovie.rejected, (state, action) => {
        state.saveMovieLoading = true;
        state.saveMovieError = action.error.message!;
      })
      .addCase(getTheMovie.pending, (state) => {
        state.getMovieLoading = true;
      })
      .addCase(getTheMovie.fulfilled, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        (state.getMovieLoading = false), (state.getMovieData = action.payload);
      })
      .addCase(getTheMovie.rejected, (state, action) => {
        // eslint-disable-next-line no-unused-expressions
        (state.getMovieLoading = true),
          (state.getMovieError = action.error.message!);
      });
  },
});

export default movieSlice.reducer;
