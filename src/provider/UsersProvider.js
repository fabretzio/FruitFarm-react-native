import React, {createContext, useReducer} from "react";
import { database } from "../data/baseDeDatos";

const getUsers = async () => {
    const users = await database.getUsers()
    return users
}

let Users = []

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


const initialState = { Users }
const UserContext = createContext();

const generateID = () => {
    const randomNumber = Math.floor(Math.random() * 10000)
    return randomNumber
}

const actions = {
    createUser(state, action) {
        const user = action.payload
        user.id = generateID
        // guardar el usuario en la db
        database.insertUser(user)
        return {
            ...state,
            Users: [...state.Users, user] 
        }
    },
    updateUser(state, action) {
        const userUpdated = action.payload
        // update del usuario en la db
        const id = userUpdated.id
        console.log('### id ###', id)
        database.editUser(userUpdated)
        return {
            ...state,
            Users: state.Users.map((user) => user.id === userUpdated.id ? userUpdated : user)
        }
    },
    deleteUser(state, action) {
        const userDelete = action.payload
        // Borrar el usuario de la db
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

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext