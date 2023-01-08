import { UIState } from './';

type UiActionType=
|{type: 'UI - ToogleMenu'}

//!uiReducer va a regresar un estado con el tipado (firma) :UIState
export const uiReducer=(state:UIState,action:UiActionType):UIState=>{
switch (action.type) {
   case 'UI - ToogleMenu':
      return {
           ...state,
           //*Sobreescribimos la propiedad con el valor contrario
           isMenuOpen:!state.isMenuOpen

            }
            //break;
       default:
       return state;
}

}