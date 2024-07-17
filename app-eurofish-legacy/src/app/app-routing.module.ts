import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { LayoutPageComponent } from './shared/pages/layout-page/layout-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./user/usuario.module').then((m) => m.UsuarioModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('./asignacion/asignacion.module').then(
            (m) => m.AsignacionModule
          ),
      
      }, {
        path: '',
        loadChildren: () =>
          import('./config-request/config.module').then((m) => m.ConfigModule),
      }, {
        path: '',
        loadChildren: () =>
          import('./rotacion/movimiento.module').then((m) => m.MovimientoModule),
      },{
        path: '',
        loadChildren: () =>
          import('./parada/parada.module').then((m) => m.ParadaModule),
      },{
        path: '',
        loadChildren: () =>
          import('./notificacion/notificacion.module').then((m) => m.NotificacionModule),
      },{
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },{
        path: '',
        loadChildren: () =>
          import('./apis-tally/api-tally.module').then((m) => m.ApisTallyModule),
      },
    ],
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
