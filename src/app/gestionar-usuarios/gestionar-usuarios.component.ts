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
  user: User = { id: 0, username: '', role: '' }; // Inicializa el objeto user
  editMode: boolean = false; // Estado para determinar si estamos en modo edición

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1): void {
    this.userService.getUsers(page, this.itemsPerPage).subscribe(users => {
      this.users = users;
      this.totalItems = users.length; // O el total de elementos desde el backend si está disponible
      this.paginateUsers();
    });
  }

  paginateUsers(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginateUsers();
  }

  onSubmit(): void {
    if (this.editMode) {
      // Actualiza el usuario
    } else {
      // Agrega un nuevo usuario
      this.userService.registerUser(this.user).subscribe(() => {
        this.loadUsers();
      });
    }
  }

  editUser(user: User): void {
    this.user = { ...user };
    this.editMode = true;
  }

  deleteUser(userId: number): void {
    // Lógica para eliminar un usuario
  }
}
