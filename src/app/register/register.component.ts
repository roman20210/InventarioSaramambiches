import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerData = {
    username: '',
    password: '',
    // Por defecto "Empleado"
    role: 'Employee',
    // Solo si es Admin
    adminPassword: ''
  };

  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  isAdminSelected: boolean = false;
  constructor(private userService: UserService, private router: Router) {
    // Suscribirse a los eventos de navegación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;  // Mostrar el spinner cuando inicia la navegación
      } else if (event instanceof NavigationEnd) {
        this.isLoading = false;  // Ocultar el spinner cuando termina la navegación
      }
    });
  }
  // Método para detectar el cambio en el tipo de usuario
  onUserTypeChange(event: any): void {
    this.isAdminSelected = event.target.value === 'Admin';
  }

  // Método para enviar el formulario de registro
  register() {
    this.isLoading = true;  // Mostrar el spinner al iniciar el registro

    const userPayload = {
      Username: this.registerData.username,
      Password: this.registerData.password,
      Role: this.registerData.role,
      AdditionalPassword: this.registerData.adminPassword
    };

    // Reiniciar los mensajes de éxito/error al intentar registrar
    this.successMessage = '';
    this.errorMessage = '';
    this.isLoading = true;

    this.userService.registerUser(userPayload).subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.successMessage = 'Usuario registrado exitosamente';
        setTimeout(() => {
          this.router.navigate(['/login']);  // Redirigir al login después del registro
        }, 2000);  // Retraso de 2 segundos antes de redirigir
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        this.errorMessage = error.error;  // Mostrar el error devuelto por el backend
        this.isLoading = false;
      }
    });
  }
  // Método para manejar el clic en el enlace de login
  navigateToLogin() {
    this.isLoading = true;  // Mostrar el spinner cuando se hace clic en el enlace
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 400);  // Retraso de 2 segundos para mostrar el spinner
  }
}
