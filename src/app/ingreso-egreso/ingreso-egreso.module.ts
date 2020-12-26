//MOdulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

//Components
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';

//Charts
import { ChartsModule } from 'ng2-charts';

//Ngrx
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    EstadisticaComponent,
    DetalleComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    OrdenIngresoPipe,
  ],
  imports: [
    SharedModule,
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    RouterModule,
    ChartsModule,
    ReactiveFormsModule,
    DashboardRoutesModule
  ]
})
export class IngresoEgresoModule { }
