import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GoodCard = ({ item, addToCart, updateCartQuantity }) => {
    const { product, amount } = item;

    return (
        <View style={styles.card}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>Цена: {product.price} ₽</Text>
            <Text style={styles.description}>{product.description}</Text>

            {amount !== undefined ? (
                <View style={styles.quantityControls}>
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => updateCartQuantity(product.id, amount - 1)}
                    >
                        <Text style={styles.controlText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.amount}>{amount}</Text>
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => updateCartQuantity(product.id, amount + 1)}
                    >
                        <Text style={styles.controlText}>+</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => addToCart(product)}
                >
                    <Text style={styles.buttonText}>Добавить</Text>
                </TouchableOpacity>
            )}
            
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
});

export default GoodCard;
