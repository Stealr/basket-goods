// order.js
import React from 'react';
import { OrderProvider } from './ContextOrder';
import OrderPage from './orderPage';
import OrderList from './orderList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const OrderApp = () => {
    return (
        <OrderProvider>
            <Tab.Navigator>
                <Tab.Screen name="Оформление заказа" component={OrderPage} />
                <Tab.Screen name="История заказов" component={OrderList} />
            </Tab.Navigator>
        </OrderProvider>
    );
};

export default OrderApp;