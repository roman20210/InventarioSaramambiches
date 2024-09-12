import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service'; // Servicio del producto
import { Product } from '../models/product.model'; // Modelo del producto

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.scss']
})
export class EditarProductosComponent {
  productId: number = 0; // Campo para el ID del producto
  product: Product | null = null; // Producto que se rellenará después de la búsqueda

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  // Método para buscar producto por ID
  getProductById(): void {
    if (!this.productId) {
      alert('Por favor, ingrese un ID válido');
      return;
    }

    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        alert('No se encontró el producto con el ID proporcionado.');
        console.error('Error al obtener el producto:', error);
      }
    });
  }

  // Método para enviar los cambios realizados
  onSubmit(): void {
    if (!this.product) return;

    this.productService.updateProduct(this.product.id, this.product).subscribe({
      next: () => {
        alert('Producto actualizado con éxito');
        this.router.navigate(['/menu/inventario']); // Redirigir a inventario
      },
      error: (error) => {
        console.error('Error al actualizar el producto:', error);
      }
    });
  }

  // Cancelar la edición
  onCancel(): void {
    this.router.navigate(['/menu/inventario']);
  }
}
