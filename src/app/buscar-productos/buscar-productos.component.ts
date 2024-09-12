import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.scss']
})
export class BuscarProductosComponent {
  keyword: string = ''; // La palabra clave ingresada por el usuario
  products: Product[] = []; // Almacena los productos encontrados
  searchExecuted: boolean = false; // Para controlar si la búsqueda se ejecutó

  constructor(private productService: ProductService) {}

  // Método para buscar productos
  onSearch(): void {
    if (!this.keyword.trim()) {
      alert('Por favor, ingrese una palabra clave para buscar.');
      return;
    }

    this.productService.searchProducts(this.keyword).subscribe({
      next: (products) => {
        this.products = products;
        this.searchExecuted = true; // Indica que la búsqueda se realizó
      },
      error: (error) => {
        console.error('Error al buscar productos:', error);
        this.products = [];
      }
    });
  }
}
