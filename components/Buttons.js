import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, Image} from 'react-native';

export function Buttons(Style, Icon, Action) {

	const sButton = {
		backgroundColor: Style,
    	padding: 20,
    	height: 100,
    	width: 100,
    	marginBottom : 10,
    	justifyContent: 'center',
    	borderRadius: 5,
  	};

  	const sIcon = {
    	textAlign: 'center',
    	fontSize: 20,
    	color: 'white',
  	};

	return 	<TouchableOpacity onPress={Action} style={sButton}>
				<Text style={sIcon}>{Icon}</Text>
			</TouchableOpacity>;
}
