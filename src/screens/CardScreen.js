import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import GoodCard from "../components/GoodCard";
import { CartContext } from '../context/Context.js';

const CartScreen = () => {
    const { cart, updateCartQuantity, clearCart } = useContext(CartContext);

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.product.id}
                renderItem={({ item }) => (
                    <GoodCard
                        item={item}
                        updateCartQuantity={updateCartQuantity}
                    />
                )}
            />
            <TouchableOpacity style={styles.button} onPress={clearCart}>
                <Text style={styles.buttonText}>Очистить корзину</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    button: { backgroundColor: '#ff4d4d', padding: 16, alignItems: 'center', marginVertical: 16 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default CartScreen;
