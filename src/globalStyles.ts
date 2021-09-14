import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Views using this Style must also specify a width and height
    P_overlappingContainer: {
        position: 'relative',
	},
    C_overlappingContainer: {
        position: 'absolute', 
        width: '100%', 
        height: '100%',
	},

    whiteText: {
        color: '#e8e6ff',
    },
    blackBackground: {
        backgroundColor: '#131516'
    },
})