
import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';
import { StateObservable } from '@ngrx/store';

export interface PizzaState {
  entities:{[id:number]: Pizza};
  loaded:boolean;
  loading: boolean
}

export const initialState : PizzaState = {
    entities:{},
    loaded: false,
    loading: false
}

export function reducer(state = initialState, action:fromPizzas.PizzasAction) : PizzaState{
   
    switch(action.type){
      case fromPizzas.LOAD_PIZZAS : {
          return {
              ...state,
              loading:true
          };
      }
      case fromPizzas.LOAD_PIZZAS_SUCCESS : {
        console.log(action.payload);
        const pizzas = action.payload;

        const entities = pizzas.reduce((entities:{[id:number]: Pizza}, pizza)=>{
                return {
                    ...entities,
                    [pizza.id]:pizza
                }
        },{...state.entities});
        return {
            ...state,
            loading:false,
            loaded:true,
            entities
        }
    }
    case fromPizzas.LOAD_PIZZAS_FAIL : {
        return {
            ...state,
            loading:false,
            loaded:false
        }

    
    }
    
    }
  

    return state;
}


//-----Methods which returns piece of data (used for selectors)----

export const getPizzasEnities = (state:PizzaState)=> state.entities;