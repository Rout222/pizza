import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, FlatList, Dimensions, Modal, TouchableHighlight } from 'react-native';

import { Square } from '../components/Square';
import { Buttons } from '../components/Buttons';

const { width} = Dimensions.get('window');

export default function HomeScreen(){

  const [participantes, setParticipantes] = useState([])

  const [i_edit, setI] = useState(-1)

  // modais
  const [modalVisible, setModalVisible] = useState(false)
  const [editando, setEditando] = useState(false)
  const [nome, changeNome] = useState('');
  const [pedaco, changePedaco] = useState(0);

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
      cor   : gera_cor(),
      nome  : ""
    }
    setParticipantes([...participantes, novo]);
  };


  const adicionarPedaco = (i) => {
    if(editando){
      setI(i);
  
      changeNome(participantes[i].nome);
      changePedaco(participantes[i].count);
      setModalVisible(true);  

    } else {
      var p = participantes;
      p[i].count = parseInt(p[i].count)+1;
      setParticipantes([...p]);
    }
  }

  const editMode = () => {
    setEditando(!editando);

  }

  const finishEdition = () => {
    if(editando && i_edit >= 0){
      var p = participantes;
      p[i_edit].count = pedaco;
      p[i_edit].nome = nome;
      setParticipantes([...p]);
    }
    setModalVisible(false); 
    setEditando(false)
  }


  const botoes = [Buttons(editando ?"#6c757d" : "#28a745", "+", editando ? () =>{}  : adicionarPessoa), Buttons("#17a2b8", "Editar", editMode), Buttons(editando ?"#6c757d" : "#dc3545", "Zerar", editando ? () =>{}  : () => {setParticipantes([])})]
  return (
    <>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {}}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Nome: 
            </Text>
            <TextInput
                style={styles.textinput}
                onChangeText={text => changeNome(text)}
                value={nome}
                outlined
                label={"Nome"}
              />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              Quant: 
            </Text>
            <TextInput
                style={styles.textinput}
                numeric
                keyboardType={'numeric'}
                onChangeText={numeric => changePedaco(numeric)}
                value={pedaco.toString()}
              />
          </View>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={finishEdition}
          >
            <Text style={styles.textStyle}>Confirmar</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
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
    </>
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  row : {
    flexDirection : 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    height: 40,
    fontSize: 20,
    alignContent: 'center',
    textAlign: 'center',
    lineHeight: 40,
    justifyContent: 'center',
  },
  textinput : {
    flex: 2,
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'grey',
  }
});
