import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationForm: FormGroup;

  private emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServiceService, private apiService: ApiService) {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      active: ['']
    });
  }

  validacionEmail(): Promise<boolean> {
    const control = this.registrationForm.get('email');
    const correo = control?.value;

    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(usuarios => {
          const correoExistente = usuarios.find((usuario: any) => usuario.email === correo);

          if (correoExistente) {
            console.log('El correo ya está registrado en la base de datos.');
            resolve(false);
          } else {
            console.log('El correo no está en la base de datos, puedes proceder.');
            resolve(true);
          }
        })
        .catch(error => {
          console.error('Error al consultar la base de datos:', error);
          reject(error);
        });
    });
  }

  onSubmitConValidacion() {
    const userNameControl = this.registrationForm.get('userName');
    const emailControl = this.registrationForm.get('email');
    const passwordControl = this.registrationForm.get('password');

    if (userNameControl && emailControl && passwordControl) {
      console.log('Username: ' + userNameControl.value);
      console.log('Email: ' + emailControl.value);
      console.log('Contraseña: ' + passwordControl.value);

      this.validacionEmail().then((rest: boolean) => {
        if (rest) {
          console.log('Correo disponible, procediendo con el registro...');
          fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.registrationForm.value),
          })
            .then(response => response.json())
            .then(data => {
              console.log('Nuevo usuario creado:', data);
              alert("Usuario registrado con éxito!");
              this.router.navigate(['/login']);
            })
            .catch(error => {
              console.error('Error al crear el usuario:', error);
              alert('No se pudo registrar el usuario');
            });
        } else {
          console.log('El correo ya existe en la base de datos.');
          alert("¡Usuario ya existente!");
        }
      }).catch(error => {
        console.error('Error en la validación del correo:', error);
      });
    }
  }

  backToLanding() {
    this.router.navigate(['/landing']);
  }

  // Funciones adicionales para manejar errores en el formulario
  isValidField(fieldName: string): boolean {
    const control = this.registrationForm.get(fieldName);
    return !!control && control.invalid && control.touched;
  }

  getFieldError(fieldName: string): string | null {
    const control = this.registrationForm.get(fieldName);
    if (control) {
      if (control.hasError('required')) {
        return 'Este campo es requerido.';
      } else if (control.hasError('pattern')) {
        return 'Formato inválido.';
      } else if (control.hasError('minlength')) {
        return `Mínimo ${control.getError('minlength').requiredLength} caracteres.`;
      }
    }
    return null;
  }
}