import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Goods from './screens/Goods';
import CartScreen from './screens/CardScreen';
import Delay from './screens/Delay.js';
import { CartProvider } from './context/Context.js';

const Stack = createStackNavigator();

export default function App() {
    return (
        <CartProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="AllProducts" component={Goods} options={{ title: 'Все товары' }} />
                    <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Корзина' }} />
                    <Stack.Screen name="Delay" component={Delay} options={{ title: 'Отложенные' }} />
                </Stack.Navigator>
            </NavigationContainer>
        </CartProvider>
    );
}
