import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/Context.js';

const GoodCard = ({ item }) => {
    const {
        deleteGoodDalay,
        returnToCart,
    } = useContext(CartContext);

    const { product, amount } = item;

    return (
        <View style={styles.card}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>
                Цена: {amount ? product.price * amount : product.price} ₽
            </Text>
            <Text style={styles.description}>{product.description}</Text>

            <View style={styles.controlBox}>
                <TouchableOpacity
                    style={styles.returnButton}
                    onPress={() => returnToCart(product.id)}
                >
                    <Text style={styles.returnText}>Вернуть в корзину</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteGoodDalay(product.id)}
                >
                    <Text style={styles.deleteText}>Удалить</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        color: '#555',
    },
    description: {
        marginVertical: 8,
        fontSize: 14,
        color: '#777',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        justifyContent: 'center',
    },
    controlButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 8,
    },
    controlText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    amount: {
        marginHorizontal: 16,
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#d32f2f',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,
    },
    deleteText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    controlBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
    },
    delayButton: {
        backgroundColor: '#ff9800',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6,

    },
    delayText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    deleteButton: { backgroundColor: 'red', padding: 8, borderRadius: 4 },
    deleteText: { color: 'white', fontWeight: 'bold' },
    delayButton: { backgroundColor: 'orange', padding: 8, borderRadius: 4 },
    delayText: { color: 'white', fontWeight: 'bold' },
    returnButton: { backgroundColor: 'green', padding: 8, borderRadius: 4 },
    returnText: { color: 'white', fontWeight: 'bold' },
});

export default GoodCard;
