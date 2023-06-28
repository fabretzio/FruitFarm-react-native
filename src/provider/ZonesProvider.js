import React, {createContext, useReducer} from "react";
import { database } from "../data/baseDeDatos";

const getZones = async () => {
    const zones = await database.getZones()
    return zones
}

let Zones = []

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

const initialState = { Zones }
const ZoneContext = createContext();

const generateID = () => {
    const randomNumber = Math.floor(Math.random() * 10000)
    return randomNumber
}

const actions = {
    createZone(state, action) {
        const zone = action.payload
        zone.id = generateID
        // guardar el usuario en la db
        database.insertZone(zone)
        return {
            ...state,
            Zones: [...state.Zones, zone] 
        }
    },
    updateZone(state, action) {
        const zoneUpdated = action.payload
        // update del usuario en la db
        const id = zoneUpdated.id
        console.log('### id ###', id)
        database.editZone(zoneUpdated)
        return {
            ...state,
            Zones: state.Zones.map((zone) => zone.id === zoneUpdated.id ? zoneUpdated : zone)
        }
    },
    deleteZone(state, action) {
        const zoneDelete = action.payload
        // Borrar el usuario de la db
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

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <ZoneContext.Provider value={{state, dispatch}}>
            {props.children}
        </ZoneContext.Provider>
    )
}

export default ZoneContext