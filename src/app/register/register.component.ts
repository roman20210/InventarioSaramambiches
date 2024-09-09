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
        // Mostrar el spinner cuando inicia la navegación
        this.isLoading = true;  
      } else if (event instanceof NavigationEnd) {
        // Ocultar el spinner cuando termina la navegación
        this.isLoading = false;  
      }
    });
  }
  // Método para detectar el cambio en el tipo de usuario
  onUserTypeChange(event: any): void {
    this.isAdminSelected = event.target.value === 'Admin';
  }

  // Método para enviar el formulario de registro
  register() {
     // Mostrar el spinner al iniciar el registro
    this.isLoading = true; 

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
          // Redirigir al login después del registro
          this.router.navigate(['/login']);
          // Retraso de 2 segundos antes de redirigir
        }, 2000);  
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        this.errorMessage = error.error;
        // Mostrar el error devuelto por el backend  
        this.isLoading = false;
      }
    });
  }
  // Método para manejar el clic en el enlace de login
  navigateToLogin() {
    this.isLoading = true;
    // Mostrar el spinner cuando se hace clic en el enlace  
    setTimeout(() => {
      this.router.navigate(['/login']);
      // Retraso de 2 segundos para mostrar el spinner
    }, 400);  
  }
}
