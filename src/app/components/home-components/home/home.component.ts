import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Movie, User } from 'src/app/core/models';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentComponent implements OnInit{ 

  imageUrl: string = 'https://image.tmdb.org/t/p/w500';
  movies: Movie[] = [];
  esFavorita: boolean = false;
  public numberPage: number = 1;
  public idGenre: string = '';
  genreSeleccionado: string = '';
  userLogedId: string | null = '';
  userLogedIdToNumber: number = 0;
  userLoged: User[] = [];
  array: number[] = [];
  arrayActualizado: number[] = [];

  public titleToSearchHome = '';
  isSearching: boolean = false;

  constructor(private apiService: ApiService){ }

  async ngOnInit() {
    this.apiService.getMovies().subscribe(res =>{
      this.movies = res;})
  
  let authLocalStore: string | null = localStorage.getItem('token');
  this.userLogedId = this.apiService.localStoreNull(authLocalStore);
  this.getLogedUserUserPage(this.userLogedId);

  if(this.userLogedId){
    this.userLogedIdToNumber = parseInt(this.userLogedId);
  }

  try {
    (await this.apiService.getFavoritesAsycn(this.userLogedIdToNumber)).forEach(element => {
      this.arrayActualizado.push(element);
    });
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
   }
console.log(this.arrayActualizado);
this.array = this.arrayActualizado;
}

getMoviesxGenre(pagina: number, genero: string): void{
  if(this.idGenre != genero){
   this.numberPage = 1;
   pagina = this.numberPage;
 }
 this.idGenre = genero;
 this.apiService.getMoviesxGenero(pagina, genero).subscribe(res =>{
   this.movies = res;
   this.genreSeleccionado = genero;
})
}

nextPage(): void {
  this.numberPage = this.numberPage + 1;
  this.loadMovies();
}

PreviousPage(): void {
  if (this.numberPage > 1) {
    this.numberPage = this.numberPage - 1;
    this.loadMovies();
  }
}


isFavorite(idMovie: number){
  if(this.array.includes(idMovie)){
    return true;
  }else{
    return false;
  }
}

getLogedUserUserPage(id: string | null){
  this.apiService.getUserToAuthById(id).subscribe((resp: User[]) => {
    this.userLoged = resp;
  })
}

buttonFavorite(idUser: number, idMovie: number){
  if(this.isFavorite(idMovie)){
    this.array = this.array.filter(item => item !== idMovie);
    this.apiService.deleteFavorite(idUser, idMovie, this.array);
  }else{
    this.array.push(idMovie);
    this.apiService.addFavorite(idUser, idMovie, this.array);
  }
  console.log(this.arrayActualizado);
}

searchByTitleButton(){
  this.isSearching = true;
  this.ngOnInit();
}

getMoviesXTittle(numberPage: number, tittle: string){
  if(parseInt(this.idGenre) != 100){
  this.idGenre = "100";
  this.numberPage = 1;
  numberPage = this.numberPage;
}
 this.titleToSearchHome = tittle;
this.apiService.getMoviesByName(numberPage, this.titleToSearchHome).subscribe(res => {  //BUSCA POR NOMBRE
  this.movies = res});
}

private loadMovies(): void {
  if (parseInt(this.idGenre) !== 100) {
    this.getMoviesxGenre(this.numberPage, this.idGenre);
  } else {
    this.getMoviesXTittle(this.numberPage, this.titleToSearchHome);
  }
}

}