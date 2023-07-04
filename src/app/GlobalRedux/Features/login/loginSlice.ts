'use client';

import { createSlice } from '@reduxjs/toolkit';

import data from '../../../../../public/data.json'

interface FormLogin  {
  email: string,
  password: string,
}
  

export interface LoginSlice {
    formLogin: FormLogin,
    isConnected: boolean,
    message: string,
    user: {
      id: number | null,
      firstname: string,
      lastname: string,
      password: string,
      street: string,
      zipcode: string,
      country: string,
      payments: {
        method: string,
        periodicity: string
      },
      notes: {
        id: number,
        title: string,
        message:string
      }[],
      contacts: {
        id: number,
        me: boolean,
        message: string
      }[]
      children: {
        id: number,
        firstname: string,
        lastname: string,
        class: string,
        naissance: string,
        présences: {
          id: number,
          jour: string,
          wasHere: boolean | null
        }[]
      }[],
      menus: {
        id: number,
        date: string,
        jour : string,
        entrées: string[],
        plats: string[],
        desserts: string[]
      }[]
    }
}



const initialState: LoginSlice = {
    formLogin: {
      email: '',
      password: "",
    },
    isConnected: false,
    message: '',
    user: {
      id: null,
      firstname: "",
      lastname: "",
      password: "",
      street: "",
      zipcode: "",
      country: "",
      payments: {
        method: "string",
        periodicity: "string"
      },
      notes: [],
      contacts: [],
      children: [],
      menus: []
    }
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      setFormLogin: (state, action) => {
        state.formLogin[action.payload.name as keyof FormLogin] = action.payload.value;
      },
      login: (state, action) => {
        
        const foundUser = data.find(user => user.email = action.payload)

        if (foundUser) {
          state.isConnected = true;
          console.log('user found')
          state.user = foundUser;
        } else {
          state.message = "Utilisateur non trouvé"
          console.log('user not found')
        }
      },
      addContact: (state, action) => {
        state.user.contacts.push({
          id: state.user.contacts.length + 1,
          me: true,
          message: action.payload
        })
      }
    }
})

export const { setFormLogin, login, addContact } = loginSlice.actions;

export default loginSlice.reducer;