import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  loginForm: FormGroup = this.fb.group({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    active: new FormControl('')
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServiceService, private apiService: ApiService) { }

  ngOnInit() {
  }

  registro = {
    userName: '',
    email: '',
    password: '',
    active: true
  };

validacionEmail(): Promise<boolean> {
  const correo = this.registro.email;

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
  console.log('Username: ' + this.registro.userName);
  console.log('Email: ' + this.registro.email);
  console.log('Contraseña: ' + this.registro.password);

  this.validacionEmail().then((rest: boolean) => {
    if (rest) {
      console.log('Correo disponible, procediendo con el registro...');
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.registro),
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
    console.error('Error en la validación del correo:', error);
  });
}

backToLanding(){
  this.router.navigate(['/landing']);
}
}