import React, {createContext, useReducer} from "react";
import { database } from "../data/baseDeDatos";

//Funcion para obtener las observaciones de la base de datos
const getOb = async () => {
    const observation = await database.getObservacion()
    return observation
}

let Observations = []

//Obtener todas las observaciones y agregarlas a una lista
getOb().then((observations) => {
    observations.map((observation) => {
        Observations.push({
            id: observation.id,
            titulo: observation.titulo,
            foto: observation.foto,
            latitud: observation.latitud,
            longitud: observation.longitud
        })
    })
}) 

//Crear un estado con la lista de observaciones
const initialState = { Observations }
const ObservationContext = createContext();

const actions = {
    createObservation(state, action) {
        const observation = action.payload
        const randomNumber = Math.floor(Math.random() * 10000)
        observation.id = randomNumber
        // agregar observacion a la base de datos
        database.insertObservacion(observation)
        return {
            ...state,
            Observations: [...state.Observations, observation] 
        }
    },
    updateObservation(state, action) {
        const observationUpdated = action.payload
        // actualizar observacion en la base de datos
        database.editObservacion(observationUpdated)
        return {
            ...state,
            Observations: state.Observations.map((observation) => observation.id === observationUpdated.id ? observationUpdated : observation)
        }
    },
    deleteObservation(state, action) {
        const observationDelete = action.payload
        // Borrar observacion de la base de datos
        database.deleteObservacion(observationDelete.id)
        return {
            ...state,
            Observations: state.Observations.filter((observation) =>  observation.id !== observationDelete.id)
        }
    }
}
export const ObservationProvider = props => {
    const reducer = (state, action) => {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [stateO, dispatch] = useReducer(reducer, initialState)

    return (
        <ObservationContext.Provider value={{stateO, dispatch}}>
            {props.children}
        </ObservationContext.Provider>
    )
}

export default ObservationContext