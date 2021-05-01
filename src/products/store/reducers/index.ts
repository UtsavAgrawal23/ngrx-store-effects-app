import * as fromPizzas from './pizaas.reducers'
import {ActionReducerMap} from '@ngrx/store';

import {createSelector, createFeatureSelector} from '@ngrx/store'

export interface ProductsState {
 pizzas: fromPizzas.PizzaState  // slice of state

}


export const reducers : ActionReducerMap <ProductsState> = {
    pizzas: fromPizzas.reducer // slice of reducer state function
}


export const getProductsState = createFeatureSelector<ProductsState>('products');

//pizzas state
export const getPizzasState = createSelector(getProductsState, (state:ProductsState)=>state.pizzas);
export const getPizzasEntities = createSelector(getPizzasState, fromPizzas.getPizzasEnities);

export const getAllPizzas = createSelector(getPizzasEntities, (entities)=>{
        return Object.keys(entities).map( id => entities[parseInt(id, 10)])
});