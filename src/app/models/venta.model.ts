// models/venta.model.ts
export interface ProductsVenta {
  id: number;
  nombre: string;
}

export interface ProductoVentaDto {
  ProductoId: number;
  Cantidad: number;
}

export interface VentaRequest {
  Productos: ProductoVentaDto[];
}