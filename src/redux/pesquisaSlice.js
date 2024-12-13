import {createSlice} from '@reduxjs/toolkit'

const initialValues = {
  pesquisaId: null,
  nome: null,
  data: null,
  imagem: null,
  coleta: {
    excelente: 0,
    bom: 0,
    neutro: 0,
    ruim: 0,
    pessimo: 0,
  },
}

export const pesquisaSlice = createSlice({
  name: 'pesquisa',
  initialState: initialValues,
  reducers: {
    reducerSetPesquisa: (state, action) => {
      state.pesquisaId = action.payload.pesquisaId;
      state.nome = action.payload.nome;
      state.data = action.payload.data;
      state.imagem = action.payload.imagem;
      state.coleta = action.payload.coleta;
    },
    incrementarColeta: (state, action) => {
      const categoria = action.payload
      if (state.coleta[categoria] !== undefined) {
        state.coleta[categoria] += 1
      }
    },
  },
})

export const {reducerSetPesquisa, incrementarColeta} = pesquisaSlice.actions
export default pesquisaSlice.reducer