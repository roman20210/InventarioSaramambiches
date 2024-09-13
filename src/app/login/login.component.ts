import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLoading: boolean = false;
  errorMessage: string = '';
  loginData = {
    username: '',
    password: '',
  };
  constructor(private UserLoginService: UserService, private router: Router) {
    // Suscribirse a los eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Mostrar el spinner cuando inicia la navegación
        this.isLoading = true;  
      } else if (event instanceof NavigationEnd) {
        // Ocultar el spinner cuando termina la navegación
        this.isLoading = false;  
      }
    });
  }

  login() {
    this.isLoading = true;
    const userLoginPayload = {
      Username: this.loginData.username,
      Password: this.loginData.password
    };
    // Reiniciar los mensajes de éxito/error al intentar logear
    this.errorMessage = '';
    this.UserLoginService.loginUser(userLoginPayload).subscribe({
      next: (response) => {
        setTimeout(() => {
          // Almacenar el token en el localStorage
          this.router.navigate(['/menu']);  
          // Redirigir al login después del registro
          this.isLoading = false;
          // Retraso de 2 segundos antes de redirigir
        }, 2000);  
      },
      error: (error) => {
        // Mostrar el error devuelto por el backend
        this.errorMessage = error.error || 'Error desconocido al iniciar sesión.';
        this.isLoading = false;
      }
    });
  }
// Método para manejar el clic en el enlace de login
navigateToRegister() {
   // Mostrar el spinner cuando se hace clic en el enlace
  this.isLoading = true; 
  setTimeout(() => {
    this.router.navigate(['/registro']);
    // Retraso de segundos para mostrar el spinner
  }, 400);  
}
}


