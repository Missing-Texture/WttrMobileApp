import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    // Views using this Style must also specify a width and height
    P_overlappingContainer: {
        position: 'relative',
	},
    C_overlappingContainer: {
        position: 'absolute', 
        width: '100%', 
        height: '100%',
	},
})