import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html',
  styleUrls: ['./gestionar-usuarios.component.scss']
})
export class GestionarUsuariosComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  user: User = { id: 0, username: '', role: '', password: '', additionalPassword: '' };
  editMode: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  message: string = ''; // Mensaje de éxito o error
  messageClass: string = ''; // Clase para el mensaje (éxito o error)
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Cargar usuarios con paginación
  loadUsers(): void {
    this.userService.getUsers(this.currentPage, this.itemsPerPage).subscribe(
      (response: any) => {
        this.users = response.users; // Usuarios paginados
        this.totalItems = response.totalItems; // Total de usuarios
        this.paginateUsers(); // Paginación
      },
      (error) => {
        this.errorMessage = 'Error al cargar usuarios';
        console.error(error);
      }
    );
  }

  // Paginación local de usuarios
  paginateUsers(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(start, end);
  }

  // Cambiar la página actual
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadUsers();
  }
  // Crear o actualizar usuario
  onSubmit(): void {
    if (this.editMode) {
      const updatedUser = { ...this.user };
      delete updatedUser.password; // No enviar contraseña si no se ha modificado
  
      this.userService.updateUser(this.user.id, updatedUser).subscribe({
        next: () => {
          this.message = 'Usuario actualizado exitosamente.';
          this.messageClass = 'success';
          this.loadUsers();
          this.resetForm();
        },
        error: (err) => {
          this.message = `Error al actualizar el usuario: ${err.error}`;
          this.messageClass = 'error';
        }
      });
    } else {
      if (this.user.role === 'Admin' && !this.user.additionalPassword) {
        this.message = 'Debe ingresar la contraseña adicional para crear un administrador.';
        this.messageClass = 'error';
        return;
      }
  
      this.userService.registerUser(this.user).subscribe({
        next: () => {
          this.message = 'Usuario registrado exitosamente.';
          this.messageClass = 'success';
          this.loadUsers();
          this.resetForm();
        },
        error: (err) => {
          this.message = `Error al registrar el usuario: ${err.error}`;
          this.messageClass = 'error';
        }
      });
    }
  }

  // Mostrar el campo de contraseña adicional si el rol es Admin
  onRoleChange(event: any): void {
    const selectedRole = event.target.value;
    if (selectedRole === 'Admin') {
      this.user.additionalPassword = '';
    }
  }

  // Editar usuario
  editUser(user: User): void {
    this.user = { ...user };
    this.editMode = true;
  }

  // Eliminar usuario
  deleteUser(userId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.message = 'Usuario eliminado exitosamente.';
          this.messageClass = 'success';
          this.loadUsers(); // Recargar la lista de usuarios
        },
        error: (err) => {
          this.message = `Error al eliminar el usuario: ${err.error}`;
          this.messageClass = 'error';
        }
      });
    }
  }

  // Reiniciar el formulario
  resetForm(): void {
    this.user = { id: 0, username: '', role: '', password: '', additionalPassword: '' };
    this.editMode = false;
  }
  // Mostrar campo de contraseña adicional solo si es Administrador
  isAdmin(): boolean {
    return this.user.role === 'Admin';
  }

  // Cambiar la cantidad de elementos por página
  onItemsPerPageChange(event: any): void {
    this.itemsPerPage = +event.target.value; // Convertir el valor a número
    this.currentPage = 1; // Reiniciar a la primera página
    this.loadUsers(); // Recargar los usuarios
  }

  // Cambia la página actual
  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.loadUsers();
    }
  }

  // Calcular el número total de páginas
  totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Generar el array de paginación
  paginationArray(): number[] {
    const pages: number[] = [];
    const totalPages = this.totalPages();
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
