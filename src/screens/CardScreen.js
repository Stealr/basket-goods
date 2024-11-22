import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Animated } from 'react-native';
import GoodCard from '../components/GoodCard';
import { CartContext } from '../context/Context.js';

const CartScreen = ({ navigation }) => {
    const { cart, updateCartQuantity, clearCart, deleteGood, delayGood, applyPromoCode, calculateTotal, discount } =
        useContext(CartContext);
    const [promoCode, setPromoCode] = useState('');

    const totalAmount = cart.reduce((total, item) => {
        return total + item.product.price * item.amount;
    }, 0);


    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.product.id.toString()}
                renderItem={({ item }) => (
                    <GoodCard
                        item={item}
                        updateCartQuantity={updateCartQuantity}
                        deleteGood={deleteGood}
                        delayGood={delayGood}
                    />
                )}
            />
            <View style={styles.bottom}>
                <Text style={styles.total}>Итоговая стоимость: {calculateTotal().toFixed(2)} ₽
                    {discount !== 0 ? (<Text style={styles.prev}>({totalAmount} ₽)</Text>) : (<Text></Text>)} </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Введите промокод"
                    value={promoCode}
                    onChangeText={setPromoCode}
                />
                <TouchableOpacity style={styles.button} onPress={() => applyPromoCode(promoCode)}>
                    <Text style={styles.buttonText}>Применить промокод</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={clearCart}>
                    <Text style={styles.buttonText}>Очистить корзину</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Delay')}>
                    <Text style={styles.buttonText}>Отложенные</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    bottom: { marginTop: 16 },
    total: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    input: { borderWidth: 1, padding: 8, borderRadius: 4, marginBottom: 8 },
    button: { backgroundColor: '#007bff', padding: 10, borderRadius: 8, marginBottom: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    prev: { textDecorationLine: 'line-through', fontSize: 14 },
});

export default CartScreen;
