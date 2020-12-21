import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.models';

export const unSetItems = createAction('[IngresoEgreso] Unset Items');

export const setItems   = createAction(
    '[IngresoEgreso] setItems',
     props<{ items : IngresoEgreso[] }>()
    );