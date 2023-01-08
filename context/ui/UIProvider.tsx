import React, { useReducer } from 'react';
import { UIContext,uiReducer } from './';


export interface UIState{
isMenuOpen: boolean;
}


interface Props{
children:JSX.Element|JSX.Element[]
}

//Inicializamos
const UI_INITIAL_STATE:UIState={
isMenuOpen:false
}


export const UIProvider = ({children}:Props) => {
const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)
const toogleSideMenu =()=>{
    dispatch({type: "UI - ToogleMenu"})
}
return (
<UIContext.Provider value={{...state,toogleSideMenu}}>
    {children}
</UIContext.Provider>
)
}