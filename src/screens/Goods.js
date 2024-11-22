import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import GoodCard from "../components/GoodCard";
import DelayCard from "../components/DelayCard";
import { CartContext } from '../context/Context.js';

const Goods = ({ navigation }) => {
    const { cart, delay, addToCart, updateCartQuantity, deleteGood, delayGood, returnToCart, deleteGoodDalay } = useContext(CartContext);

    const products = [
        { id: '1', name: 'Товар 1', price: 100, description: "Описание товара 1" },
        { id: '2', name: 'Товар 2', price: 200, description: "Описание товара 2" },
        { id: '3', name: 'Товар 3', price: 300, description: "Описание товара 3" },
        { id: '4', name: 'Товар 4', price: 400, description: "Описание товара 4" },
        { id: '5', name: 'Товар 5', price: 500, description: "Описание товара 5" },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    const cartItem = cart.find((cartItem) => cartItem.product.id === item.id);
                    const delayedItem = delay.find((delayItem) => delayItem.product.id === item.id);

                    if (delayedItem) {
                        return (
                            <DelayCard
                                item={delayedItem}
                                returnToCart={returnToCart}
                                deleteGoodDalay={deleteGoodDalay}
                            />
                        );
                    }

                    return (
                        <GoodCard
                            item={cartItem || { product: item }}
                            addToCart={addToCart}
                            updateCartQuantity={updateCartQuantity}
                            deleteGood={deleteGood}
                            delayGood={delayGood}
                        />
                    );
                }}
            />
            <View style={styles.buttonBox}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cart')}>
                    <Text style={styles.buttonText}>Перейти в корзину</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.delayButton} onPress={() => navigation.navigate('Delay')}>
                    <Text style={styles.buttonText}>Отложенные</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    button: { backgroundColor: '#007bff', padding: 16, alignItems: 'center', marginVertical: 16 },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    delayButton: {
        backgroundColor: '#007bff',
        padding: 16,
        alignItems: 'center',
    },
    buttonBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
});

export default Goods;
