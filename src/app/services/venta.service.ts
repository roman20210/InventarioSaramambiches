import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VentaRequest } from '../models/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'http://localhost:5251/api/Ventas';

  constructor(private http: HttpClient) {}

  realizarVenta(ventaRequest: VentaRequest): Observable<any> {
    return this.http.post(this.apiUrl, ventaRequest);
  }
}
