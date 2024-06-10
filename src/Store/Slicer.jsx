import { createSlice } from '@reduxjs/toolkit';

const initState = {
  droplist: null,
  customer: null,
  icons: {
    GAIL: 'icons/Gail.png',
    ONGC: 'icons/ongc.png',
    IOCL: 'icons/iocl.png',
    BPCL: 'icons/bpcl.png',
    HPCL: 'icons/hpcl.png',
    RIL: 'icons/ril.png',
    IGL: 'icons/igl.png',
    MGL: 'icons/mgl.png',
    'Adani Gas': 'icons/adani.png',
    'Petronet LNG': 'icons/petronet.png',
    'Shell India': 'icons/shell.png',
    'Gujarat Gas Ltd': 'icons/gujarat.png',
  },
  categorySelected: 'All',
  providerSelected: 'All',
};

const slice = createSlice({
  name: 'NammaSlicer',
  initialState: initState,
  reducers: {
    setCategory(state, action) {
      state.categorySelected = action.payload;
    },
    setProvider(state, action) {
      state.providerSelected = action.payload;
    },
    getDBProviders(state, action) {
      state.droplist = action.payload;
    },
    setCustomer(state, action) {
      state.customer = action.payload;
    },
    resetState(state,action){
      state.categorySelected = "All";
      state.providerSelected = "All";
      state.customer = null;
    }
  },
});

export const { resetState, setCategory, setProvider, getDBProviders, setCustomer } = slice.actions;
export default slice.reducer;
