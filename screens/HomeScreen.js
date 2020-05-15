import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Square } from '../components/Square';
import { Buttons } from '../components/Buttons';

const { width} = Dimensions.get('window');

export default function HomeScreen(){

  const [participantes, setParticipantes] = useState([])


  const maxColumns = Math.floor(width / 110);

  const gera_cor = () => {
    var hexadecimais = '0123456789ABCDEF';
    var cor = '#';

    // Pega um número aleatório no array acima
    for (var i = 0; i < 6; i++ ) {
    //E concatena à variável cor
        cor += hexadecimais[Math.floor(Math.random() * 16)];
    }
    return cor;
  }

  const adicionarPessoa = () => {
    const novo = {
      count : 0,
      cor   : gera_cor()
    }
    setParticipantes([...participantes, novo]);
  };

  const adicionarPedaco = (i) => {
    var p = participantes;
    p[i].count = p[i].count+1;
    setParticipantes([...p]);
  }

  const botoes = [Buttons("#28a745", "+", adicionarPessoa), Buttons("#17a2b8", "Editar", adicionarPessoa), Buttons("#dc3545", "Zerar", () => {setParticipantes([])})]
  return (
    <View style={styles.container}>
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
        <FlatList 
          data={botoes} 
          style={styles.actions}
          contentContainerStyle={styles.listContainerAction}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          renderItem= { ({ item, index }) => item} />
        <FlatList 
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={participantes} 
          keyExtractor={(item, index) => index.toString()}
          numColumns = {maxColumns}
          renderItem= { ({ item, index }) => Square(item, adicionarPedaco, index)} />
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'stretch',
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    width: '100%'
  },
  list :{
    width: '100%'
  },
  actions : {
    height: 120
  },
  listContainerAction: {
    justifyContent: 'space-around',
    flex: 1
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
