import React, {createContext, useReducer} from "react";
import { database } from "../data/baseDeDatos";

//Funcion para obtener los insumos de la base de datos
const getSupplies = async () => {
    const supplies = await database.getSupply()
    return supplies
}

let Supplies = []

//Obtener todos los insumos y agregarlos a una lista
getSupplies().then((supplies) => {
    supplies.map((supply) => {
        Supplies.push({
            id: supply.id,
            name: supply.name,
            cantidad: supply.cantidad
        })
    })
})

//Crear un estado con la lista de insumos
const initialState = { Supplies }
const SupplyContext = createContext();

const generateID = () => {
    const randomNumber = Math.floor(Math.random() * 10000)
    return randomNumber
}

const actions = {
    createSupply(state, action) {
        const supply = action.payload
        supply.id = generateID
        // agregar insumo a la base de datos
        database.insertSupply(supply)
        return {
            ...state,
            Supplies: [...state.Supplies, supply] 
        }
    },
    updateSupply(state, action) {
        const supplyUpdated = action.payload
        // actualizar el insumo en la base de datos
        const id = supplyUpdated.id
        console.log('Insumo actualizado', id)
        database.editSupply(supplyUpdated)
        return {
            ...state,
            Supplies: state.Supplies.map((supply) => supply.id === supplyUpdated.id ? supplyUpdated : supply)
        }
    },
    deleteSupply(state, action) {
        const supplyDelete = action.payload
        // Borrar el insumo de la base de datos
        database.deleteSupply(supplyDelete.id)
        return {
            ...state,
            Supplies: state.Supplies.filter((supply) =>  supply.id !== supplyDelete.id)
        }
    }
}
export const SupplyProvider = props => {
    const reducer = (state, action) => {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <SupplyContext.Provider value={{state, dispatch}}>
            {props.children}
        </SupplyContext.Provider>
    )
}

export default SupplyContext