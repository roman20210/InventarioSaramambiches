import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerData = {
    username: '',
    password: '',
    role: 'Employee',  // Por defecto "Empleado"
    adminPassword: ''  // Solo si es Admin
  };
  
  isAdminSelected: boolean = false;
  constructor(private userService: UserService, private router: Router) {}

  // Método para detectar el cambio en el tipo de usuario
  onUserTypeChange(event: any): void {
    this.isAdminSelected = event.target.value === 'Admin';
  }

    // Método para enviar el formulario de registro
    register() {
      const userPayload = {
        Username: this.registerData.username,
        Password: this.registerData.password,
        Role: this.registerData.role,
        AdditionalPassword: this.registerData.adminPassword
      };
  
      this.userService.registerUser(userPayload).subscribe({
        next: (response) => {
          console.log(response);
          alert('Usuario registrado exitosamente');
          this.router.navigate(['/login']);  // Redirigir al login
        },
        error: (error) => {
          console.error('Error al registrar:', error);
          alert(error.error);  // Mostrar el error devuelto por el backend
        }
      });
    }
}
