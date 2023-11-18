import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { User } from '../models';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get authStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  constructor(private apiService: ApiService) { }

  private user: User | null | undefined = null;

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  public async login(email: string, password: string): Promise<boolean> {

    let isLogin = false;

    try {

      let apiResponse = this.apiService.getUserToAuth(email, password);

      let userRespone = await lastValueFrom(apiResponse);

      this.user = userRespone[0];

      if (this.user) {
        localStorage.setItem('token', this.user.id!.toString());
        this.isLoggedInSubject.next(true);
        isLogin = true;
      }
    } catch (error) {
      throw error;
    }

    return isLogin;
  }

  public logout(){
    this.user = undefined;
    localStorage.clear();
    this.isLoggedInSubject.next(false);
  }

  public  static checkAuthentication(): boolean{
    return localStorage.getItem('token') ? true : false;
  }
}
