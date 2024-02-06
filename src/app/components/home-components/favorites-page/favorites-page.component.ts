import { Component, OnInit } from '@angular/core';
import { Movie, User } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit{

  constructor(private apiService: ApiService, private router: Router) { }

  imageUrl: string = 'https://image.tmdb.org/t/p/w500';
  movies: Movie[] = [];
  moviesActualizado: number[] = [];
  
  userLogedId: string | null = '';
  userLogedIdToNumber: number = 0;
  userLoged: User[] = [];

  array: number[] = [];
  arrayActualizado: number[] = [];
  hayFavoritos: boolean = false;
 
  public numberPage: number = 1;

  async ngOnInit(){ 
  let authLocalStore: string | null = localStorage.getItem('token');
  this.userLogedId = this.apiService.localStoreNull(authLocalStore);
  this.getLogedUserLocalStorage(this.userLogedId);


  if(this.userLogedId){
    this.userLogedIdToNumber = parseInt(this.userLogedId);
  }

   try {
    (await this.apiService.getFavoritesAsycn(this.userLogedIdToNumber)).forEach(element => {
      this.arrayActualizado.push(element);
    });
    console.log('Favoritos obtenidos:', this.movies);
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
   }
   this.array = this.arrayActualizado;
   this.noFavoritesValidation();
    console.log("MUESTRA ARREGLO DE FAVORITOS ID");
    console.log(this.array);

    this.convertIdsIntoMovies();

    console.log("MUESTRA ARREGLO DE PELICULAS TIPO MOVIE[]");
  }
  
  getLogedUserLocalStorage(id: string | null){
    this.apiService.getUserToAuthById(id).subscribe((resp: User[]) => {
      this.userLoged = resp;
    })
  }

  async convertIdsIntoMovies(){
    this.array.forEach(element => {
      this.apiService.getMoviesById(element).subscribe((movie: Movie) => {
        console.log(movie);
        this.movies.push(movie);
      })
    })
  }

  isFavorite(idMovie: number){
    if(this.array.includes(idMovie)){
      console.log("entra en el true en isFavorite");
      return true;
    }else{
      console.log("entra en el false en isFavorite");
  
      return false;
    }
  }

  buttonFavorite(idUser: number, idMovie: number){
    if(this.isFavorite(idMovie)){
      this.array = this.array.filter(item => item !== idMovie);
      this.apiService.deleteFavorite(idUser, idMovie, this.array);
    }else{
      this.array.push(idMovie);
      this.apiService.addFavorite(idUser, idMovie, this.array);
    }
    console.log(this.moviesActualizado);
  }

  buttonBackFavToUser(): void{
    this.router.navigate(['/home'])
  }

  noFavoritesValidation(){
    if(this.array.length==0){
      this.hayFavoritos = false;
    }else{
      this.hayFavoritos = true;
    }
  }
}
