import { Component } from '@angular/core';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-reporte-inventario',
  templateUrl: './reporte-inventario.component.html',
  styleUrls: ['./reporte-inventario.component.scss']
})
export class ReporteInventarioComponent {
  selectedFormat: string = 'pdf';  // Por defecto en PDF
  message: string = '';

  constructor(private reportService: ReportService) { }

  // Descargar el reporte
  downloadReport(): void {
    this.message = 'Generando el reporte...';

    this.reportService.generateInventoryReport(this.selectedFormat).subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: this.selectedFormat === 'pdf' ? 'application/pdf' : 'application/vnd.ms-excel' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Reporte_Inventario.${this.selectedFormat}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.message = 'Reporte generado con éxito.';
      },
      error: (error) => {
        console.error('Error al generar el reporte:', error);
        this.message = 'Error al generar el reporte.';
      }
    });
  }
}
