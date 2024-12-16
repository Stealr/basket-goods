import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { OrderContext } from '../context/ContextOrder.js';


const OrderList = () => {
    const { orders, deleteOrder } = useContext(OrderContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>История заказов</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.orderItem}>
                        <Text>Заказ #{item.id}</Text>
                        <Text>Пользователь: {item.userId}</Text>
                        <Text>Товаров: {item.products.length}</Text>
                        <Text>Сумма: {item.total}р</Text>
                        <Text>Адрес доставки: {item.address}</Text>
                        <Text>Дата доставки: {item.deliveryDate}</Text>
                        <Button title="Удалить" onPress={() => deleteOrder(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    orderItem: { padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
});

export default OrderList;
