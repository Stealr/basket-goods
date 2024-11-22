import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO:  1. При изменении количества автоматически пересчитывать итоговую стоимость выбранного товара +
// 2. Реализовать кнопку для удаления товара из корзины с автоматическим обновлением состояния корзины +
// 3. Корзина должна отображать итоговую стоимость всех товаров +
// 4. Применение промокода +
// 5. Перемещение товара в отложенные(новая страница) +-
// 6. Анимация 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [delay, setDelay] = useState([]);
    const [discount, setDiscount] = useState(0);
    const promoCodes = { PROMO10: 10, PROMO20: 20, PROMO99: 99 };

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

    const deleteGood = async (productId) => {
        let updatedCart = [...cart];
        const index = updatedCart.findIndex((item) => item.product.id === productId);

        updatedCart.splice(index, 1);

        setCart(updatedCart);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // -------------- Отложенные --------------

    const deleteGoodDalay = async (productId) => {
        console.log("test");
        let updatedDelay = [...delay];
        const index = updatedDelay.findIndex((item) => item.product.id === productId);

        updatedDelay.splice(index, 1);

        setDelay(updatedDelay);
        await AsyncStorage.setItem('delay', JSON.stringify(updatedDelay));
    };

    const delayGood = async (productId) => {
        const itemToDelay = cart.find((item) => item.product.id === productId);

        const updatedCart = cart.filter((item) => item.product.id !== productId);
        const updatedDelay = [...delay, itemToDelay];

        setCart(updatedCart);
        setDelay(updatedDelay);

        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        await AsyncStorage.setItem('delay', JSON.stringify(updatedDelay));
    };

    const returnToCart = async (productId) => {
        const itemToReturn = delay.find((item) => item.product.id === productId);
    
        const updatedDelay = delay.filter((item) => item.product.id !== productId);
        const updatedCart = [...cart, { ...itemToReturn }];
    
        setCart(updatedCart);
        setDelay(updatedDelay);
    
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
        await AsyncStorage.setItem('delay', JSON.stringify(updatedDelay));
    };

    const clearDelay = async () => {
        await AsyncStorage.removeItem('delay');
        setDelay([]);
    };

    // -------------- Промокоды --------------

    const applyPromoCode = (code) => {
        const discountValue = promoCodes[code.toUpperCase()] || 0;
        setDiscount(discountValue);
    };

    const calculateTotal = () => {
        const total = cart.reduce((sum, item) => sum + item.product.price * item.amount, 0);
        return total - (total * discount) / 100;
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                delay,
                discount,
                addToCart,
                updateCartQuantity,
                clearCart,
                deleteGood,
                applyPromoCode,
                calculateTotal,
                delayGood,
                deleteGoodDalay,
                returnToCart,
                clearDelay
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
