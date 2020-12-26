import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.models';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit,OnDestroy {

  ingresoEgresos : IngresoEgreso [] = [];
  ingresosSubs : Subscription;

  constructor(private store : Store<AppStateWithIngreso>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresosSubs = this.store.select('ingresosEgresos')
      .subscribe(({items}) => this.ingresoEgresos = items);
  }

  ngOnDestroy(){
    this.ingresosSubs.unsubscribe();
  }

  borrar(uid: string){
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(() => Swal.fire('Ingreso-Egreso', 'Borrado Satisfactoriamente!', 'success'))
      .catch((err => Swal.fire('Error!', err.message, 'error')))
  }

}
