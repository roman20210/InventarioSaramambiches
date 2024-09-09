import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';  // Servicio para obtener datos del usuario

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  userRole: string = '';  // Rol del usuario
  username: string = '';  // Nombre de usuario para mostrar

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userRole = this.userService.getUserRole() || '';  // Obtener el rol del usuario
    this.username = this.userService.getUsername() || '';  // Obtener el nombre del usuario
  }

  logout() {
    this.userService.logout();  // Método para cerrar sesión
  }
}
