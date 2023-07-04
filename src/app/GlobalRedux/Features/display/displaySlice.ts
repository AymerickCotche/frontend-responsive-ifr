'use client';

import { createSlice } from '@reduxjs/toolkit';

export interface DisplaySlice {
  displayedMenuIndex: number | null;
  displayedMenu : {
    "id": number,
    "date": string,
    "jour": string,
    "entrées": string[],
    "plats": string[],
    "desserts": string[]
  },
  today: string,
  contactInput: string,
  mobileMenu: boolean
}

const initialState: DisplaySlice = {
  displayedMenuIndex: null,
  displayedMenu: {
    "id": 0,
    "date": "",
    "jour": "",
    "entrées": [],
    "plats": [],
    "desserts": []
  },
  today: '',
  contactInput: '',
  mobileMenu: false,
}

export const displaySlice = createSlice({
    name: 'display',
    initialState,
    reducers: {
      incrementDisplayedMenuIndex: (state) => {
        if (state.displayedMenuIndex !== null && state.displayedMenuIndex < 4){
          state.displayedMenuIndex += 1;
          console.log(state.displayedMenuIndex)
        };
      },
      decrementDisplayedMenuIndex: (state) => {
        if (state.displayedMenuIndex !== null && state.displayedMenuIndex > 0) {
          state.displayedMenuIndex -= 1;
        };
      },
      setDisplayedMenuIndex: (state, action) => {
        state.displayedMenuIndex = action.payload;
      },
      setDisplayedMenu: (state, action) => {
        state.displayedMenu = action.payload;
      },
      setToday: (state, action) => {
        state.today = action.payload;
      },
      setContactInput: (state, action) => {
        state.contactInput = action.payload
      },
      toggleMobileMenu: (state, action) => {
        state.mobileMenu = action.payload;
      },
    }
})

export const { incrementDisplayedMenuIndex, decrementDisplayedMenuIndex, setDisplayedMenuIndex, setDisplayedMenu, setToday, setContactInput, toggleMobileMenu} = displaySlice.actions;

export default displaySlice.reducer;