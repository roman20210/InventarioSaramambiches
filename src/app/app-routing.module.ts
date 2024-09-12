import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { InventarioComponent } from './inventario/inventario.component';
import { BuscarProductosComponent } from './buscar-productos/buscar-productos.component';
import { AnadirProductosComponent } from './anadir-productos/anadir-productos.component';
import { authGuard } from './auth.guard';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { EliminarProductosComponent } from './eliminar-productos/eliminar-productos.component';
import { GestionarUsuariosComponent } from './gestionar-usuarios/gestionar-usuarios.component';
import { HistoricoVentasComponent } from './historico-ventas/historico-ventas.component';
import { ReporteInventarioComponent } from './reporte-inventario/reporte-inventario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  {
    path: 'menu', component: MenuComponent, canActivate: [authGuard],
    children:
      [  // Rutas hijas para el contenido del menú
        { path: 'inventario', component: InventarioComponent },
        { path: 'buscar-productos', component: BuscarProductosComponent },
        { path: 'anadir-productos', component: AnadirProductosComponent },
        { path: 'editar-productos', component: EditarProductosComponent },
        { path: 'eliminar-productos', component: EliminarProductosComponent },
        { path: 'gestionar-usuarios', component: GestionarUsuariosComponent },
        { path: 'historico-ventas', component: HistoricoVentasComponent },
        { path: 'reporte-inventario', component: ReporteInventarioComponent },
      ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
