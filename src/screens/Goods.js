import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import GoodCard from "../components/GoodCard";
import { CartContext } from '../context/Context.js';

const Goods = ({ navigation }) => {
    const { cart, addToCart, updateCartQuantity } = useContext(CartContext);

    const products = [
        { id: '1', name: 'Товар 1', price: 100, description: "Описание товара 1" },
        { id: '2', name: 'Товар 2', price: 200, description: "Описание товара 2" },
        { id: '3', name: 'Товар 3', price: 300, description: "Описание товара 3" },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const cartItem = cart.find((cartItem) => cartItem.product.id === item.id);
                    return (
                        <GoodCard
                            item={cartItem || { product: item }}
                            addToCart={addToCart}
                            updateCartQuantity={updateCartQuantity}
                        />
                    );
                }}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cart')}>
                <Text style={styles.buttonText}>Перейти в корзину</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    button: { backgroundColor: '#007bff', padding: 16, alignItems: 'center', marginVertical: 16 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default Goods;
