import React, {createContext, useReducer} from "react";
import { database } from "../data/baseDeDatos";

//Funcion para obtener los tratamientos de la base de datos
const getTratamientos = async () => {
    const tratamientos = await database.getTratamientos()
    return tratamientos
}

let Tratamientos = []

//Obtener todos los tratamientos y agregarlos a una lista
getTratamientos().then((tratamientos) => {
    tratamientos.map((tratamiento) => {
        Tratamientos.push({
            id: tratamiento.id,
            name: tratamiento.name,
            zone: tratamiento.zone,
            user: tratamiento.user,
            inicio: tratamiento.inicio,
            fin: tratamiento.fin,
            tiempo: tratamiento.tiempo,
            orden: tratamiento.orden,
            insumos: tratamiento.insumos,
            observaciones: tratamiento.observaciones
        })
    })
})

//Crear un estado con la lista de tratamientos
const initialState = { Tratamientos }
const TratamientosContext = createContext();

const generateID = () => {
    const randomNumber = Math.floor(Math.random() * 10000)
    return randomNumber
}

const actions = {
    createTratamiento(state, action) {
        const tratamiento = action.payload
        tratamiento.id = generateID
        // agregar tratamiento a la base de datos
        database.insertTratamiento(tratamiento)
        return {
            ...state,
            Tratamientos: [...state.Tratamientos, supply] 
        }
    },
    updateTratamiento(state, action) {
        const tratamientoUpdated = action.payload
        // actualizar el tratamiento en la base de datos
        const id = tratamientoUpdated.id
        console.log('Tratamiento actualizado', id)
        database.editTratamiento(tratamientoUpdated)
        return {
            ...state,
            Tratamientos: state.Tratamientos.map((tratamiento) => tratamiento.id === tratamientoUpdated.id ? tratamientoUpdated : tratamiento)
        }
    },
    deleteTratamiento(state, action) {
        const tratamientoDelete = action.payload
        // Borrar el tratamiento de la base de datos
        database.deleteTratamiento(tratamientoDelete.id)
        return {
            ...state,
            Tratamientos: state.Tratamientos.filter((tratamiento) =>  tratamiento.id !== tratamientoDelete.id)
        }
    }
}
export const TratamientosProvider = props => {
    const reducer = (state, action) => {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <TratamientosContext.Provider value={{state, dispatch}}>
            {props.children}
        </TratamientosContext.Provider>
    )
}

export default TratamientosContext