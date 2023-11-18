import { Component, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLoggedIn: boolean | undefined;
  userLogedId: string | null = '';
  userLoged: User = new User();
  showElement: boolean = true;

  constructor(private authService: AuthServiceService, private router: Router, private apiService: ApiService){ 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showElement = !this.router.url.includes('/user');
      }
    });
  }

  ngOnInit() {
    this.authService.authStatus.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    let authLocalStore: string | null = localStorage.getItem('token');
    this.userLogedId = this.apiService.localStoreNull(authLocalStore);
    this.getLogedUserNavbar(this.userLogedId);
  }

  public goToLogin(){
    this.router.navigate(['/login']);
  }

  public goToRegister(){
    this.router.navigate(['/register']);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  public goToUserPage(){
    this.router.navigate(['/user'])
  }

  public goToFavorites(){
    this.router.navigate(['/user/favorites'])
  }

  getLogedUserNavbar(id: string | null){
    this.apiService.getUserToAuthById(id).subscribe((resp) => {
      this.userLoged = resp[0];
    })
  }

}
