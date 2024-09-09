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
        this.isLoading = true;  // Mostrar el spinner cuando inicia la navegación
      } else if (event instanceof NavigationEnd) {
        this.isLoading = false;  // Ocultar el spinner cuando termina la navegación
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
    this.isLoading = true;
    this.UserLoginService.loginUser(userLoginPayload).subscribe({
      next: (response) => {
        setTimeout(() => {
          // Almacenar el token en el localStorage
          localStorage.setItem('token', response.token);
          this.router.navigate(['/menu']);  // Redirigir al login después del registro
          this.isLoading = false;
        }, 2000);  // Retraso de 2 segundos antes de redirigir
      },
      error: (error) => {
        this.errorMessage = error.error;  // Mostrar el error devuelto por el backend
        this.isLoading = false;
      }
    });
  }
// Método para manejar el clic en el enlace de login
navigateToRegister() {
  this.isLoading = true;  // Mostrar el spinner cuando se hace clic en el enlace
  setTimeout(() => {
    this.router.navigate(['/registro']);
  }, 400);  // Retraso de 2 segundos para mostrar el spinner
}
}


