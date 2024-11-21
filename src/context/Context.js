import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
            const savedCart = await AsyncStorage.getItem('cart');
            if (savedCart) setCart(JSON.parse(savedCart));
        };
        loadCart();
    }, []);

    const addToCart = async (product) => {
        const updatedCart = [...cart];
        const index = updatedCart.findIndex((item) => item.product.id === product.id);

        if (index !== -1) {
            updatedCart[index].amount += 1;
        } else {
            updatedCart.push({ amount: 1, product });
        }

        setCart(updatedCart);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const updateCartQuantity = async (productId, newAmount) => {
        let updatedCart = [...cart];
        const index = updatedCart.findIndex((item) => item.product.id === productId);

        if (newAmount === 0) {
            updatedCart.splice(index, 1);
        } else {
            updatedCart[index].amount = newAmount;
        }

        setCart(updatedCart);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = async () => {
        await AsyncStorage.removeItem('cart');
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
