import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: SidebarState;
};
type SidebarState = {
  isOpen: boolean;
  isMinimal: boolean;
  isThemeDark?: boolean;
};

const initialState = {
  value: {
    isOpen: false,
    isMinimal: false,
    isThemeDark: false,
  } as SidebarState,
} as InitialState;
const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleOpenOrClose: (state) => {
      // redux co cai dat 1 cai goi la IMMER// du la viet code mutation nhung that chac no hoat dong immutation
      //   state.search = action.payload; // hoat dong nhu immutation
      state.value.isOpen = !state.value.isOpen;
    },
    closeSidebar: (state) => {
      state.value.isOpen = false;
    },
    changeSidebar: (state) => {
      state.value.isMinimal = !state.value.isMinimal;
    },
    changeTheme: (state) => {
      state.value.isThemeDark = !state.value.isThemeDark;
    },
  },
});

export const { toggleOpenOrClose, closeSidebar, changeSidebar, changeTheme } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
