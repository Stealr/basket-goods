import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Goods from './screens/Goods';
import CartScreen from './screens/CardScreen';
import Delay from './screens/Delay.js';

import OrderPage from './screens/orderPage.js';
import OrderList from './screens/orderList.js';

import { CartProvider } from './context/Context.js';
import { OrderProvider } from './context/ContextOrder.js';


const Stack = createStackNavigator();

export default function App() {
    return (
        <CartProvider>
            <OrderProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="AllProducts" component={Goods} options={{ title: 'Все товары' }} />
                        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Корзина' }} />
                        <Stack.Screen name="Delay" component={Delay} options={{ title: 'Отложенные' }} />
                        <Stack.Screen name="OrderPage" component={OrderPage} options={{ title: 'Оформление заказа' }} />
                        <Stack.Screen name="OrderList" component={OrderList} options={{ title: 'Список заказов' }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </OrderProvider>
        </CartProvider>
    );
}
