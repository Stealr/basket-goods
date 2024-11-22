import { React, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/Context.js';

const GoodCard = ({ item, addToCart, updateCartQuantity, deleteGood,  }) => {
    const { product, amount } = item;
    const { discount, delayGood } = useContext(CartContext);

    return (
        <View style={styles.card}>
            <Text style={styles.name}>{product.name}</Text>

                {amount !== undefined ? (
                    discount !== 0 ? (<Text style={styles.price}>
                        Цена: {(product.price * amount) - ((product.price * amount) * discount) / 100} ₽ <Text style={styles.prev}>({product.price * amount} ₽)</Text>
                        ({(product.price) - ((product.price) * discount) / 100} ₽ <Text style={styles.prev}>({product.price} ₽)</Text>) 
                        </Text>) : (
                        <Text style={styles.price}>Цена: {product.price * amount} ₽ ({product.price} ₽)</Text>
                    )
                ) : (
                    <Text style={styles.price}>Цена: {product.price} ₽</Text>
                )}

            <Text style={styles.description}>{product.description}</Text>

            {amount !== undefined ? (
                <View style={styles.controlBox}>
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
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deleteGood(product.id)}
                    >
                        <Text style={styles.deleteText}>Удалить</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.delayButton}
                        onPress={() => delayGood(product.id)}
                    >
                        <Text style={styles.delayText}>Отложить</Text>
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
    prev: { textDecorationLine: 'line-through', fontSize: 14 },
});

export default GoodCard;
