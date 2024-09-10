import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';  // Servicio para obtener datos del usuario

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  // Rol del usuario
  userRole: string = '';
  // Nombre de usuario para mostrar
  username: string = '';
  isSidebarHidden: boolean = false;  // Estado de la barra lateral

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Obtener el rol del usuario
    this.userRole = this.userService.getUserRole() || '';
    // Obtener el nombre del usuario
    this.username = this.userService.getUsername() || '';
  }
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;  // Cambiar entre mostrar/ocultar la barra lateral
  }
  // Método para cerrar sesión
  logout() {
    this.userService.logout();
  }
}
