import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Header(){
    return(
        <View style={styles.header}>
            <Text style={styles.title}>
            LookUp
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 80, 
        paddingTop: 38, 
        backgroundColor: '#0a031d', 
    }, 
    title: {
        textAlign: 'center', 
        color: 'cyan',
        fontSize: 24, 
        fontWeight: 'bold',
    }
})