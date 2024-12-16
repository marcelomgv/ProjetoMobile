import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icones from '../components/Icones';
import {useDispatch} from 'react-redux';
import {incrementarColeta} from '../redux/pesquisaSlice';
import { useSelector } from 'react-redux';
import app from '../firebase/firebase'
import { initializeFirestore, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { useComposedEventHandler } from 'react-native-reanimated';

const Coleta = props => {
  const dispatch = useDispatch();
  const goToAcoesPesquisa = () => {
    props.navigation.navigate('AcoesPesquisa');
  };
  const goToAgradecimento = categoria => {
    // Dispara a ação para atualizar o Redux
    dispatch(incrementarColeta(categoria));
    // Navega para a tela de agradecimento
    props.navigation.navigate('Agradecimento');
  };
  const nomePesq = useSelector((state) => state.pesquisa.nome)
  const userId = useSelector((state) => state.login.userId)
  const pesquisaId = useSelector((state) => state.pesquisa.pesquisaId)
  const coletaInicial = useSelector((state) => state.pesquisa.coleta)
  const db = initializeFirestore(app, { experimentalForceLongPolling: true })
  const pesquisaRef = doc(db, 'pesquisasUsers', userId, 'pesquisas', pesquisaId)

  const updateColeta = (opcao) => {
    let pessimo = coletaInicial.pessimo
    let ruim = coletaInicial.ruim
    let neutro = coletaInicial.neutro
    let bom = coletaInicial.bom
    let excelente = coletaInicial.excelente
    if(opcao == 'pessimo'){
      pessimo = pessimo+1
    }
    if(opcao == 'ruim'){
      ruim = ruim+1
    }
    if(opcao == 'neutro'){
      neutro = neutro+1
    }
    if(opcao == 'bom'){
      bom = bom+1
    }
    if(opcao == 'excelente'){
      excelente = excelente+1
    }

    updateDoc(pesquisaRef, {
      coleta: {
        pessimo:pessimo,
        ruim:ruim,
        neutro:neutro,
        bom:bom,
        excelente:excelente
      }
    })


    goToAgradecimento()
  }
  return (
        <View style={estilos.principal}>
            <View style = {estilos.header}>
                <Pressable onPress={goToAcoesPesquisa} style = {estilos.botaoVoltar}>
                </Pressable>
            </View>
            <Text style={estilos.textoPrincipal}>
                O que você achou de {nomePesq}?
            </Text>
            <View style={estilos.opcoes}>
                <Icones
                    texto="Péssimo"
                    icone="emoticon-angry-outline"
                    cor="#D71616"
                    tela="Coleta"
                    funcao={() => updateColeta('pessimo')}
                />
                <Icones
                    texto="Ruim"
                    icone="emoticon-sad-outline"
                    cor="#FF360A"
                    tela="Coleta"
                    funcao={() => updateColeta('ruim')}
                />
                <Icones
                    texto="Neutro"
                    icone="emoticon-neutral-outline"
                    cor="#FFC632"
                    tela="Coleta"
                    funcao={() => updateColeta('neutro')}
                />
                <Icones
                    texto="Bom"
                    icone="emoticon-happy-outline"
                    cor="#37BD6D"
                    tela="Coleta"
                    funcao={() => updateColeta('bom')}
                />
                <Icones
                    texto="Excelente"
                    icone="emoticon-cool-outline"
                    cor="#25BC22"
                    tela="Coleta"
                    funcao={() => updateColeta('excelente')}
                />
            </View>
            <View style = {estilos.header}>

            </View>
        </View>
  );
};

const estilos = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: 'rgba(55, 39, 117, 1)',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header:{
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  botaoVoltar:{
    height:'100%',
    width: '10%',
  },
  textoPrincipal: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'AveriaLibre-Regular',
  },
  opcoes: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textoIcones: {
    color: 'white',
    fontSize: 26,
  },
});

export default Coleta;