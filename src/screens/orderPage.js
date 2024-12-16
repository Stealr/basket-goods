import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { OrderContext } from '../context/ContextOrder.js';
import { CartContext } from '../context/Context.js';
import MapView, { Marker } from 'react-native-maps';

const OrderPage = ({ navigation, route }) => {
    const { addOrder } = useContext(OrderContext);
    const { totalSum } = route.params;
    const { cart, clearCart } = useContext(CartContext);

    const [orderDetails, setOrderDetails] = useState({
        userId: 10, // Укажите актуальный userId
        products: [], // Изначально пустой массив товаров
    });
    const [address, setAddress] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [location, setLocation] = useState({
        latitude: 55.751244,
        longitude: 37.618423,
    });

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setLocation({ latitude, longitude });
        setAddress(`Lat: ${latitude}, Lon: ${longitude}`); // Для простоты, можно подключить геокодинг для преобразования в адрес
    };

    const handleCreateOrderDetails = () => {
        const products = cart.map(item => ({
            id: item.product.id,
            quantity: item.amount,
        }));

        const updatedOrderDetails = {
            ...orderDetails,
            products,
        };

        addOrder(updatedOrderDetails, totalSum, address, deliveryDate); // Передаём адрес и дату
        alert('Заказ отправлен!');
        clearCart();
        navigation.navigate('OrderList');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Оформление заказа</Text>

            <TextInput
                style={styles.input}
                placeholder="Введите адрес доставки"
                value={address}
                onChangeText={setAddress}
            />

            <TextInput
                style={styles.input}
                placeholder="Введите дату доставки"
                value={deliveryDate}
                onChangeText={setDeliveryDate}
            />

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                onPress={handleMapPress}
            >
                <Marker coordinate={location} />
            </MapView>

            <Button title="Отправить заказ" onPress={handleCreateOrderDetails} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
    map: { flex: 1, marginBottom: 20 },
});

export default OrderPage;
