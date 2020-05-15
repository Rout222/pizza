import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, Image} from 'react-native';

export function Square(pessoa, adiciona, i) {

	const sqStyle = {
		backgroundColor: pessoa.cor,
		padding: 20,
		height: 100,
		width: 100,
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 5,
		marginRight: 5,
		justifyContent: 'center',
    	alignItems: 'center',
		borderRadius: 5,
	};

	const tStyle = {
		textAlign: 'center',
		fontSize: 20,
		backgroundColor: 'white',
		borderColor: 'grey',
		borderRadius : 10,
		borderWidth: 1,
		width: '100%',
		color: 'black',
	}

	const iStyle = {
		height: 40, 
		width: 40, 
		borderRadius: 5, 
		justifyContent: 'center',
		borderColor: 'grey',
		backgroundColor: 'white',
		borderWidth: 1,
	}

	return  <TouchableOpacity onPress={() => adiciona(i)}> 
				<View style={sqStyle}>
					<Image source={{uri: 'https://api.adorable.io/avatars/80/'+i.toString()}} style = {iStyle} />
					<Text style={tStyle}>{pessoa.count}</Text>
				</View>
			</TouchableOpacity>;
}