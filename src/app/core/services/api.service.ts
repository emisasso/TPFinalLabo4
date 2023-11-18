import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, map, of, switchMap, throwError } from 'rxjs';
import { Movie, MovieResponse, User } from '../models';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private jsonURL = 'http://localhost:3000';
  private trending: string = "/trending/movie/day?language=es-ES";
  private baseUrl: string= " https://api.themoviedb.org/3";
  private apiKey: string = "&api_key=ade394b4bf6e4e95b4cb1c1d43588ef3";
  private filtrar: string = "/discover/movie?language=es";
  private genero:string = "&with_genres=";
  private page: string = "&page=";
  private apiKey2: string = "?api_key=ade394b4bf6e4e95b4cb1c1d43588ef3";
  private searchMovie = "/search/movie?query=";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.jsonURL}/users`);
  }

  getUserToAuth(email:string, password: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.jsonURL}/users?email=${email}&password=${password}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.jsonURL, user);
  }

  getMovies(): Observable<any> {
    return this.http.get<MovieResponse>(this.baseUrl.concat(this.trending, this.apiKey)).pipe(
      map((res) => res.results)
    );
  }

getMoviesById(id: number): Observable<any> {
  return this.http.get<Movie>(this.baseUrl.concat(`/movie/${id}`, this.apiKey2)).pipe(
    map((res) => res)
    );
  }

  getMoviesxGenero(numberPage: number, idGenero: string): Observable<any> {
    return this.http.get<MovieResponse>(this.baseUrl.concat(this.filtrar, this.page, numberPage.toString(), this.genero, idGenero, this.apiKey)).pipe(
      map((res) => res.results)
    );
  }

  getMoviesByName(numberPage: number,title: string): Observable<any>{
    return this.http.get<MovieResponse>(this.baseUrl +this.searchMovie+title.replace(/\s/g, '%20')+"&language=es"+this.page+ numberPage + this.apiKey).pipe(
      map((resp) => resp.results)
    );
  }
  
getFavorites(userId: string): any {
  fetch(`http://localhost:3000/users/${userId}`)
  .then(response => {
    if (!response.ok) {
      console.log("RESPUESTA NO OK")
      throw new Error("error");
    }
    return response.json()
  })
  .then(userData => {
    const favoritesArray:[] = userData.favorites;
    console.log("GET FAVORITES ARRAY: ")
    console.log(favoritesArray);
    return favoritesArray;
  })
  .catch(error => {
    console.error('Error al obtener datos del servidor:', error);
  });
}

addFavorite(userId: number, idMovie: number, array: number[]): Observable<any> {
  return from(
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favorites: array }),
    })
  ).pipe(
    switchMap(data => {
      console.log('Nuevo usuario creado:', data);
      return data.json(); 
    }),
    catchError(error => {
      console.error('Error al crear el usuario:', error);
      alert('ERROR AL AGREGAR A FAVORITOS');
      return throwError(error); 
    })
  );
}

deleteFavorite(userId: number, idMovie: number, array: number[]): Observable<any> {
  return from(
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ favorites: array }),
    })
  ).pipe(
    switchMap(data => {
      console.log('Usuario actualizado:', data);
      return data.json(); 
    }),
    catchError(error => {
      console.error('Error al actualizar el usuario:', error);
      alert('ERROR AL ELIMINAR DE FAVORITOS');
      return throwError(error);
    })
  );
}

async getFavoritesAsycn(userId: number): Promise<number[]> {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData = await response.json();

    const favoritesArray: number[] = userData.favorites || [];

    return favoritesArray;
  } catch (error) {
    console.error('Error al obtener datos del servidor:', error);
    throw error;
  }
}

getUserToAuthById(id: string | null): Observable<User[]>{
  return this.http.get<User[]>(`${this.jsonURL}/users?id=${id}`).pipe(
    map(resp => resp)
  );
}

localStoreNull(posibleNull: string | null){
  if(posibleNull != null){
    return posibleNull;
  }else{
    return null;
  }
}

getUser(userId: number): Observable<any> {
  return this.http.get(`${this.jsonURL}/${userId}`);
}

updateUser(userId: number, userData: any): Observable<any> {
  return this.http.put(`${this.jsonURL}/${userId}`, userData);
}

updatePassword2(userId: number, newPassword: string): Observable<any> {
  return this.http.patch(`${this.jsonURL}/${userId}`, { password: newPassword });
}

updateUserName(userId: number, newUserName: string): Observable<any> {
  return from(
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName: newUserName }),
    })
  ).pipe(
    switchMap(data => {
      console.log('Nuevo usuario creado:', data);
      return data.json(); 
    }),
    catchError(error => {
      console.error('Error al crear el usuario:', error);
      alert('ERROR AL AGREGAR A FAVORITOS');
      return throwError(error); 
    })
  );
}

updatePassword(userId: number, newPassword: string): Observable<any> {
  return from(
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    })
  ).pipe(
    switchMap(data => {
      console.log('Nuevo usuario creado:', data);
      return data.json(); 
    }),
    catchError(error => {
      console.error('Error al crear el usuario:', error);
      alert('ERROR AL AGREGAR A FAVORITOS');
      return throwError(error); 
    })
  );
}

deleteAccount(userId: number): Observable<any> {
  return from(
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
  ).pipe(
    map(response => {
      if (!response.ok) {
        throw new Error('Error deleting user');
      }
      console.log('Usuario eliminado con éxito');
      return response.json();
    }),
    catchError(error => {
      console.error('Error al eliminar el usuario:', error);
      alert('ERROR AL ELIMINAR EL USUARIO');
      return throwError(error);
    })
  );
}
}