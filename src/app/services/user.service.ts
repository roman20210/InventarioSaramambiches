import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrlRegister = 'http://localhost:5251/Users/register';  // URL del endpoint de registro
  private apiUrlLogin = 'http://localhost:5251/Users/LogIn';  // URL del endpoint de login
  private currentUserKey = 'currentUser';  // Clave para almacenar el usuario en localStorage

  constructor(private http: HttpClient,private router: Router) {}

  // Método para registrar un usuario
  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrlRegister, userData);
  }

  // Método para logear un usuario
  loginUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrlLogin, userData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          // Almacena el token y otros datos del usuario en localStorage
          localStorage.setItem(this.currentUserKey, JSON.stringify({
            username: response.username,
            role: response.role,
            token: response.token
          }));
        }
      })
    );
  }

  // Método para obtener el rol del usuario
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  // Método para obtener el nombre del usuario
  getUsername(): string | null {
    const user = this.getCurrentUser();
    return user ? user.username : null;
  }

  // Método para cerrar sesión
  logout(): any {
    localStorage.removeItem(this.currentUserKey);  // Eliminar los datos del usuario
    return this.router.navigate(['/login']);
  }

  // Método para verificar si el usuario está autenticado (tiene un token)
  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    return user && user.token ? true : false;
  }

  // Obtener el token del usuario actual
  getToken(): string | null {
    const user = this.getCurrentUser();
    return user ? user.token : null;
  }

  // Método para obtener los detalles del usuario almacenados en localStorage
  private getCurrentUser(): any {
    const userJson = localStorage.getItem(this.currentUserKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  // Método para realizar solicitudes protegidas (adjuntando el token en los headers)
  getProtectedData(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Adjuntar el token al header
    });

    return this.http.get('http://localhost:5251/protected-endpoint', { headers });
  }
}
