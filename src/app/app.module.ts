import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component'
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { InventarioComponent } from './inventario/inventario.component';
import { BuscarProductosComponent } from './buscar-productos/buscar-productos.component';
import { AnadirProductosComponent } from './anadir-productos/anadir-productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { EliminarProductosComponent } from './eliminar-productos/eliminar-productos.component';
import { GestionarUsuariosComponent } from './gestionar-usuarios/gestionar-usuarios.component';
import { ReporteInventarioComponent } from './reporte-inventario/reporte-inventario.component';
import { HistoricoVentasComponent } from './historico-ventas/historico-ventas.component';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { NgxPaginationModule } from 'ngx-pagination'; 
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MenuComponent,
    InventarioComponent,
    BuscarProductosComponent,
    AnadirProductosComponent,
    EditarProductosComponent,
    EliminarProductosComponent,
    GestionarUsuariosComponent,
    ReporteInventarioComponent,
    HistoricoVentasComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[InventarioComponent]
})
export class AppModule { }
