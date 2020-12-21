import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { auth } from 'firebase';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.action';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresosSubs : Subscription;

  constructor( private store : Store<AppState>,
               private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.userSubs = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null)
      )
      .subscribe( ({user}) => {
        console.log(user);
        this.ingresosSubs = this.ingresoEgresoService.initIngresoEgresosListener(user.uid)
          .subscribe( ingresosEgresosFB => {
            
            this.store.dispatch( ingresoEgresoActions.setItems({ items: ingresosEgresosFB}))
          })
      });
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
    this.ingresosSubs.unsubscribe();
  }

}
