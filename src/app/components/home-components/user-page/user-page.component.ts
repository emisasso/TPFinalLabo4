import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userLoged: User[] = [];
  userId: number = 0;
  userData: any;
  userLogedId: string | null = '';
  userLogedIdNumber: number = 0;
  
  newUserName: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.userId = idParam !== null ? +idParam : 0;
      this.getUserData();
      let authLocalStore: string | null = localStorage.getItem('token');
      this.userLogedId = this.apiService.localStoreNull(authLocalStore);
    this.getLogedUserUserPage(this.userLogedId);
    });

    if(this.userLogedId){
      this.userLogedIdNumber = parseInt(this.userLogedId);
      }
  }

  getUserData(): void {
    this.apiService.getUser(this.userId).subscribe(data => {
      this.userData = data;
    });
  }

  updateUsername(newUsername: string): void {
    this.userData.username = newUsername;
    this.apiService.updateUser(this.userId, this.userData).subscribe();
  }

  updatePassword(newPassword: string): void {
    this.apiService.updatePassword2(this.userId, newPassword).subscribe();
  }

  navigateToFavorites(): void {
    this.router.navigate(['/user/favorites']);
  }

  buttonBackUserToHome(){
    this.router.navigate(['/home']);
  }

  getLogedUserUserPage(id: string | null){
    this.apiService.getUserToAuthById(id).subscribe((resp: User[]) => {
      this.userLoged = resp;
    })
  }

  onSubmitNewUserName(){
    this.apiService.updateUserName(this.userLogedIdNumber, this.newUserName)
    this.ngOnInit();
  }

  changeUserName: boolean = false;
  wantChangeUserrName(){
    this.changeUserName = true;
    this.changePassword = false;
    this.deleteAccount = false;
    this.ngOnInit();
  }

  changePassword: boolean = false;
  wantChangePassword(){
    this.changePassword = true;
    this.changeUserName = false;
    this.deleteAccount = false;
    this.ngOnInit();
  }

  deleteAccount: boolean = false;
  wantDeleteAccount(){
    this.deleteAccount = true;
    this.changeUserName = false;
    this.changePassword = false;
    this.ngOnInit();
  }

  validationPassword: string = '';
  newPassword: string = '';
  onSubmitNewPassword(){
    if(this.validationPassword == this.userLoged[0].password){
      this.changePassword = false;
      this.apiService.updatePassword(this.userLogedIdNumber, this.newPassword);
      this.validationPassword = '';
      this.newPassword = '';
      alert("Contraseña cambiada con exito!");
      this.ngOnInit();
    }else{
      this.changePassword = false;
      alert("Contraseña incorrecta");
      this.validationPassword = '';
      this.newPassword = '';
      this.ngOnInit();
    }
  }

validationToDelete: string = '';
  onSubmitDeleteAccount(){
    if(this.validationToDelete == this.userLoged[0].password){
      this.apiService.deleteAccount(this.userLogedIdNumber);
      alert("Cuanta eliminada con exito. Hasta la proxima!!!");
      this.router.navigate(['/landing']);
    }else{
      alert("Contraseña ingresada incorrecta... solicitud de eliminacion cancelada!");
      this.deleteAccount = false;
      this.validationToDelete = '';
      this.ngOnInit;
    }
  }

}