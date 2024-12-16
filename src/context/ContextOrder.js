import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const API_URL = 'https://dummyjson.com/carts'; // Базовый URL API

    // Сохранение заказов в AsyncStorage
    const saveOrdersToStorage = async (orders) => {
        try {
            await AsyncStorage.setItem('orders', JSON.stringify(orders));
        } catch (error) {
            console.error('Error saving orders to AsyncStorage:', error);
        }
    };

    // Загрузка заказов из AsyncStorage
    const loadOrdersFromStorage = async () => {
        try {
            const storedOrders = await AsyncStorage.getItem('orders');
            if (storedOrders) {
                setOrders(JSON.parse(storedOrders));
            } else {
                fetchOrders(); // Если в AsyncStorage нет данных, загрузить с сервера
            }
        } catch (error) {
            console.error('Error loading orders from AsyncStorage:', error);
        }
    };

    // Получение списка заказов
    const fetchOrders = async () => {
        try {
            const response = await fetch('https://dummyjson.com/carts/user/5');
            const data = await response.json();
            setOrders(data.carts); // Сохраняем заказы в состоянии
            saveOrdersToStorage(data.carts); // Сохраняем в AsyncStorage
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    // Добавление нового заказа
    const addOrder = async (order, totalSum, address, deliveryDate) => {
        try {
            const response = await fetch(`${API_URL}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            });
            const data = await response.json();
            const min = Math.ceil(1000);
            const max = Math.floor(9999);
            data.id = Math.floor(Math.random() * (max - min) + min);
            data.total = totalSum;
            data.address = address;
            data.deliveryDate = deliveryDate;
            console.log(data)
            const updatedOrders = [...orders, data];
            setOrders(updatedOrders); // Добавляем новый заказ в состояние
            saveOrdersToStorage(updatedOrders); // Сохраняем в AsyncStorage
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    // Удаление заказа
    const deleteOrder = async (orderId) => {
        try {
            await fetch(`${API_URL}/${orderId}`, {
                method: 'DELETE',
            });
            const updatedOrders = orders.filter((order) => order.id !== orderId);
            setOrders(updatedOrders); // Обновляем состояние
            saveOrdersToStorage(updatedOrders); // Сохраняем в AsyncStorage
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    useEffect(() => {
        loadOrdersFromStorage(); // Загружаем заказы из AsyncStorage при инициализации
    }, []);

    return (
        <OrderContext.Provider value={{ orders, addOrder, deleteOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
