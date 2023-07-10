import React, {createContext, useReducer} from "react";
import { database } from "../data/baseDeDatos";

//Funcion para obtener los usuarios de la base de datos
const getUsers = async () => {
    const users = await database.getUsers()
    return users
}

let Users = []

//Obtener todos los usuarios y agregarlos a una lista
getUsers().then((users) => {
    users.map((user) => {
        Users.push({
            id: user.id,
            name: user.name,
            apellido: user.apellido,
            cedula: user.cedula,
            avatar: user.avatarUrl
        })
    })
})

//Crear un estado con la lista de usuarios
const initialState = { Users }
const UserContext = createContext();


const actions = {
    createUser(state, action) {
        const user = action.payload
        const randomNumber = Math.floor(Math.random() * 10000)
        user.id = randomNumber
        // agregar el usuario en la base de datos
        database.insertUser(user)
        return {
            ...state,
            Users: [...state.Users, user] 
        }
    },
    updateUser(state, action) {
        const userUpdated = action.payload
        // actualizar el usuario en la base de datos
        database.editUser(userUpdated)
        return {
            ...state,
            Users: state.Users.map((user) => user.id === userUpdated.id ? userUpdated : user)
        }
    },
    deleteUser(state, action) {
        const userDelete = action.payload
        // Borrar el usuario en la base de datos
        database.deleteUser(userDelete.id)
        return {
            ...state,
            Users: state.Users.filter((user) =>  user.id !== userDelete.id)
        }
    }
}

export const UserProvider = props => {
    const reducer = (state, action) => {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [stateU, dispatch] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider value={{stateU, dispatch}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext