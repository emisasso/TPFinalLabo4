
export interface MoviesResponse {
  page:          number;
  results:       IMovie[];
  total_pages:   number;
  total_results: number;
}

export interface IMovie {
  adult:             boolean;
  backdrop_path:     string;
  id:                number;
  name?:             string;
  original_language: OriginalLanguage;
  original_name?:    string;
  overview:          string;
  poster_path:       string;
  media_type:        MediaType;
  genre_ids:         number[];
  popularity:        number;
  first_air_date?:   string;
  vote_average:      number;
  vote_count:        number;
  origin_country?:   string[];
  title?:            string;
  original_title?:   string;
  release_date?:     string;
  video?:            boolean;
}

export enum MediaType {
  Movie = "movie",
  Tv = "tv",
}

export enum OriginalLanguage {
  En = "en",
  Fr = "fr",
  Hi = "hi",
  Ja = "ja",
}

export interface IUser{
  id: number | null;
  userName: string;
  email: string;
  password: string;
  active: boolean;
  favorites: number[];
}