import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:5251/api/products/report';

  constructor(private http: HttpClient) { }

  // Generar reporte de inventario en PDF o Excel
  generateInventoryReport(format: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': format === 'pdf' ? 'application/pdf' : 'application/vnd.ms-excel'
    });

    return this.http.get(`${this.apiUrl}?format=${format}`, {
      headers: headers,
      responseType: 'blob'
    });
  }
}
