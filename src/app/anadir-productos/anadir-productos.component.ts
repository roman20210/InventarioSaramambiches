import { Component } from '@angular/core';
import { ProductService } from '../services/product.service'; // Asegúrate de tener el servicio de productos
import { Router } from '@angular/router';

@Component({
  selector: 'app-anadir-productos',
  templateUrl: './anadir-productos.component.html',
  styleUrls: ['./anadir-productos.component.scss']
})
export class AnadirProductosComponent {
  product = {
    name: '',
    description: '',
    Stock: 0,
    price: 0,
    category: ''
  };
  
  isLoading = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  // Método para enviar los datos del formulario al backend
  onSubmit() {
    if (this.product.name && this.product.description && this.product.Stock && this.product.price) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.productService.addProduct(this.product).subscribe({
        next: (response) => {
          this.successMessage = 'Producto añadido con éxito';
          this.isLoading = false;
          // Limpiar el formulario
          this.product = { name: '', description: '', Stock: 0, price: 0, category: '' };
        },
        error: (error) => {
          this.errorMessage = 'Error al añadir el producto. Inténtalo de nuevo.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
    }
  }
}
