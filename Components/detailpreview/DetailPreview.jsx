import React from 'react';
import {View,Text,StyleSheet} from 'react-native'
import { SafeAreaProvider } from "react-native-safe-area-context";


const DetailView = () => {
    return ( <SafeAreaProvider>
        <Text>DetailView</Text>
    </SafeAreaProvider> );
}
 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default DetailView;