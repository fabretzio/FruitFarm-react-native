import React, {createContext, useReducer } from "react";
import { database } from "../data/baseDeDatos";

let Zones = []


//Funcion para obtener las zonas de la base de datos
const getZones = async () => {
    const zones = await database.getZones()
    return zones
}

//Obtener todas las zonas y agregarlas a una lista
getZones().then((zones) => {
    zones.map((zone) => {
        Zones.push({
            id: zone.id,
            lugar: zone.lugar,
            departamento: zone.departamento,
            trabajadores: zone.trabajadores,
            latitud: zone.latitud,
            longitud: zone.longitud
        })
    })
})

//Crear un estado con la lista de zonas
const initialState = { Zones }
const ZoneContext = createContext();

const actions = {
    createZone(state, action) {
        const zone = action.payload
        const randomNumber = Math.floor(Math.random() * 10000)
        zone.id = randomNumber
        // guardar la zona en la base de datos
        database.insertZone(zone)
        return {
            ...state,
            Zones: [...state.Zones, zone] 
        }
    },
    updateZone(state, action) {
        const zoneUpdated = action.payload
        // actualizar la zona en la base de datos
        database.editZone(zoneUpdated)
        return {
            ...state,
            Zones: state.Zones.map((zone) => zone.id === zoneUpdated.id ? zoneUpdated : zone)
        }
    },
    deleteZone(state, action) {
        const zoneDelete = action.payload
        // eliminar la zona de la base de datos
        database.deleteZone(zoneDelete.id)
        return {
            ...state,
            Zones: state.Zones.filter((zone) =>  zone.id !== zoneDelete.id)
        }
    }
}

export const ZoneProvider = props => {
    const reducer = (state, action) => {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [stateZ, dispatch] = useReducer(reducer, initialState)

    return (
        <ZoneContext.Provider value={{stateZ, dispatch}}>
            {props.children}
        </ZoneContext.Provider>
    )
}

export default ZoneContext