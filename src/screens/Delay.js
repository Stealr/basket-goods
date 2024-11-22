import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import DelayCard from "../components/DelayCard";
import { CartContext } from '../context/Context.js';

const Delay = () => {
    const { delay, clearDelay } = useContext(CartContext);

    return (
        <View style={styles.container}>
            <FlatList
                data={delay}
                keyExtractor={(item) => item.product.id}
                renderItem={({ item }) => (
                    <DelayCard
                        item={item}
                    />
                )}
            />
            <TouchableOpacity style={styles.button} onPress={clearDelay}>
                <Text style={styles.buttonText}>Очистить отложенные</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    button: { backgroundColor: '#ff4d4d', padding: 16, alignItems: 'center', marginVertical: 16 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Delay;
