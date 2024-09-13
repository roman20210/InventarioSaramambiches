import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const roles = this.getRolesFromRoute(route);
    const userRole = this.userService.getUserRole() || ''; // Obtener rol del usuario actual
    const isAuthenticated = this.userService.isAuthenticated();

    if (!isAuthenticated) {
      // Si no está autenticado, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }

    if (roles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/menu']);
      return false;
    }
  }

  private getRolesFromRoute(route: ActivatedRouteSnapshot): string[] {
    // Obtener roles desde la ruta actual
    const routeDataRoles = route.data['roles'];
    if (routeDataRoles) {
      return Array.isArray(routeDataRoles) ? routeDataRoles : [routeDataRoles];
    }
    
    // Verificar si hay rutas hijas y obtener roles de las rutas hijas
    if (route.children.length) {
      for (let child of route.children) {
        const childRoles = this.getRolesFromRoute(child);
        if (childRoles.length) {
          return childRoles;
        }
      }
    }

    // Default to empty array if no roles found
    return [];
  }
}
