import { Injectable } from "@angular/core";
import {Effect, Actions} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import { map, switchMap, catchError } from "rxjs/operators";
import * as pizzasActions from '../actions';
 import * as fromServices from '../../services'
@Injectable()
export class  PizzasEffects {
    constructor(private actions$: Actions, private pizaasService: fromServices.PizzasService){
   }
    // listen to below action
    @Effect()
    loadPizzas$ = this.actions$.ofType(pizzasActions.LOAD_PIZZAS)
                  .pipe(
                      switchMap(()=>{
                            return this.pizaasService.getPizzas().pipe(
                                map((pizzas) => new pizzasActions.LoadPizzasSuccess(pizzas)),
                                catchError(error => of(new pizzasActions.LoadPizzasFail(error)))
                            )
                      })
                  )

}