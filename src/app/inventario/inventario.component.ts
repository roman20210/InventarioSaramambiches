import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

  inventario: any[] = [];  // Array para almacenar los productos del inventario

  constructor() { }

  ngOnInit(): void {
    // Aquí podrías hacer una llamada al servicio para obtener el inventario
    this.loadInventario();
  }

  loadInventario() {
    // Simulación de productos, puedes reemplazar esto con una llamada a un servicio
    this.inventario = [
      { id: 1, nombre: 'Producto A', stock: 50, precio: 25.00 },
      { id: 2, nombre: 'Producto B', stock: 30, precio: 35.00 },
      { id: 3, nombre: 'Producto C', stock: 20, precio: 45.00 },
    ];
  }
}
