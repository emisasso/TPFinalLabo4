import { IMovie, IUser, MediaType, MoviesResponse, OriginalLanguage } from "./interface";

export class Movie implements IMovie{
    
    title: string = '';
    overview: string = '';
    poster_path: string = '';
    release_date: string = '';
    adult: boolean;
    backdrop_path: string = '';
    id: number;
    name?: string= '';
    original_language: OriginalLanguage;
    original_name?: string = '';
    media_type: MediaType;
    genre_ids: number[];
    popularity: number;
    first_air_date?: string = '';
    vote_average: number;
    vote_count: number;
    origin_country?: string[] | undefined;
    original_title?: string = '';
    video?: boolean | undefined;
  
    constructor(movie?:any){

        this.title = movie == undefined ? '' : movie.title;
        this.overview = movie == undefined ? '' : movie.overview;
        this.release_date = movie == undefined ? '' : movie.release_date;
        this.poster_path = movie == undefined ? '' : movie.poster_path;
        this.adult = movie == undefined ? Boolean: movie.adult;
        this.backdrop_path = movie == undefined ? '' : movie.poster_path;
        this.id = movie == undefined ? null : movie.id;
        this.name = movie == undefined ? '' : movie.name;
        this.original_language = movie == undefined ? OriginalLanguage : movie.original_language;
        this.original_name = movie == undefined ? '' : movie.original_name;
        this.media_type = movie == undefined ? MediaType : movie.media_type;
        this.genre_ids = movie == undefined ? null : movie.genre_ids;
        this.popularity = movie == undefined ? null : movie.popularity;
        this.first_air_date = movie == undefined ? '' : movie.first_air_date;
        this.vote_average = movie == undefined ? null : movie.poster_path;
        this.vote_count = movie == undefined ? null : movie.poster_path;
        this.origin_country = movie == undefined ? '' : movie.origin_country;
        this.original_title = movie == undefined ? '' : movie.original_title;
        this.video = movie == undefined ? Boolean : movie.video;
       
      }
  }
  
  export class MovieResponse implements MoviesResponse{
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
 
  constructor(movieResponse?: any) {
    this.page = movieResponse == undefined ? '' : movieResponse.page;
    this.results = movieResponse?.results || movieResponse.results;
    this.total_pages = movieResponse?.total_pages || movieResponse.total_pages;
    this.total_results = movieResponse?.total_results || movieResponse.total_results;
  } 
}

export class User implements IUser{
  id: number| null= null;
    userName: string = '';
    email: string = '';
    password: string = '';
    active: boolean = true;
    favorites: number[];


  constructor(user?:any){
    this.id = user == undefined ? null : user.id;
    this.userName = user == undefined ? '' : user.userName;
    this.email = user == undefined ? '' : user.email;
    this.password = user == undefined ? '' : user.password;
    this.active = user == undefined ? false : user.active;
    this.favorites = user == undefined ? null : user.favorites;
  }
}

