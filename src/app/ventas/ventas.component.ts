import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service'; // Servicio que obtendrá productos
import { VentaService } from '../services/venta.service'; // Servicio que manejará la venta
import { Product } from '../models/product.model'; // Asegúrate de que el nombre del archivo y la ruta sean correctos

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  ventaForm: FormGroup;
  productos: Product[] = [];
  mensaje: { texto: string, tipo: 'exito' | 'error' } | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private ventaService: VentaService
  ) {
    this.ventaForm = this.fb.group({
      Productos: this.fb.array([]) // Inicializamos el array de productos vendidos
    });
  }

  ngOnInit(): void {
    this.getProductos();
  }

  // Obtener lista de productos desde el servicio
  getProductos() {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.productos = data;
      console.log('Productos cargados:', this.productos); // Verifica que los datos se están cargando
    });
  }

  // Crear un grupo de control para un producto vendido
  createProductoVendido(): FormGroup {
    return this.fb.group({
      ProductoId: [1, Validators.required],
      Cantidad: [1, [Validators.required, Validators.min(1)]]
    });
  }

  // Obtener el array de productos vendidos
  get Productos(): FormArray {
    return this.ventaForm.get('Productos') as FormArray;
  }

  // Agregar un producto al array de productos vendidos
  agregarProductoVendido() {
    this.Productos.push(this.createProductoVendido());
  }

  // Remover un producto del array de productos vendidos
  removerProductoVendido(index: number) {
    this.Productos.removeAt(index);
  }

  // Enviar la venta
  enviarVenta() {
    if (this.ventaForm.valid) {
      this.ventaService.realizarVenta(this.ventaForm.value).subscribe(
        (res) => {
          this.mensaje = {
            texto: 'Venta realizada con éxito',
            tipo: 'exito'
          };
          // Mostrar el mensaje durante 3 segundos antes de resetear
          setTimeout(() => {
            this.mensaje = null;
            this.ventaForm.reset();
            while (this.Productos.length !== 0) {
              this.Productos.removeAt(0);
            }
          }, 3000);
        },
        (error) => {
          this.mensaje = {
            texto: 'Error al realizar la venta',
            tipo: 'error'
          };
          // Mostrar el mensaje durante 3 segundos antes de resetear
          setTimeout(() => {
            this.mensaje = null;
          }, 3000);
          console.error(error);
        }
      );
    } else {
      this.mensaje = {
        texto: 'Por favor, completa todos los campos correctamente',
        tipo: 'error'
      };
      // Mostrar el mensaje durante 3 segundos antes de resetear
      setTimeout(() => {
        this.mensaje = null;
      }, 3000);
    }
  }
}
