import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5251/api/Products'; // URL base del backend para los productos

  constructor(private http: HttpClient) {}

  // Método para añadir un producto
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  // Método para actualizar un producto
  updateProduct(product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${product.id}`, product);
  }

  // Método para eliminar un producto
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${productId}`);
  }

  // Método para buscar un producto por ID
  getProductById(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${productId}`);
  }

  // Método para obtener todos los productos (inventario)
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }
}
