import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { authGuard } from './guards/auth.guard';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { MembresiaPageComponent } from './pages/membresia-page/membresia-page.component';
import { CrearMembresiaComponent } from './pages/membresia-page/crear-membresia/crear-membresia.component';
import { EditarMembresiaPageComponent } from './pages/membresia-page/editar-membresia-page/editar-membresia-page.component';
import { UsuariosPageComponent } from './pages/usuarios-page/usuarios-page.component';
import { CrearUsuarioComponent } from './pages/usuarios-page/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './pages/usuarios-page/editar-usuario/editar-usuario.component';
import { MetodoPagoComponent } from './pages/membresia-page/metodo-pago/metodo-pago.component';
import { adminGuard } from './guards/admin.guard';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'inicio',
    component: DashboardPageComponent,
    canActivate: [authGuard],
    title: 'Inicio',
    data: { 'icono': 'bx bx-home text-xl mr-3' }
  },
  {
    path: 'membresias',
    component: MembresiaPageComponent,
    canActivate: [authGuard],
    title: 'Membresias',
    data: { 'icono': 'bx bx-credit-card-front' }
  },
  {
    path: 'membresias/crear',
    component: CrearMembresiaComponent,
    canActivate: [authGuard],
    title: 'Crear membresia',
  },
  {
    path: 'membresias/:id',
    component: EditarMembresiaPageComponent,
    canActivate: [authGuard],
    title: 'Editar membresia',
  },
  {
    path: 'membresias/metodo-pago/:id',
    component: MetodoPagoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'usuarios',
    component: UsuariosPageComponent,
    canActivate: [authGuard, adminGuard],
    title: 'Usuarios',
    data: {'icono': 'bx bx-user'}
  },
  {
    path: 'usuarios/crear',
    component: CrearUsuarioComponent,
    canActivate: [authGuard],
    title: 'Crear Usuario'
  },
  {
    path: 'usuarios/:id',
    component: EditarUsuarioComponent,
    canActivate: [authGuard],
    title: 'Editar usuario'
  },
  {
    path: 'perfil',
    component: PerfilUsuarioComponent,
    canActivate: [authGuard],
    title: 'Perfil'
  },
  {
    path: 'unauthorized',
    component: UnauthorizedPageComponent
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
];
