import {$authHost} from './index';

export const getSales = async () => {
    const orders = (await $authHost.get('api/order/data')).data;
    let months = [];
    let sales = [];
    let quantity = [];
    const namesOfMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let todaysMonth =  (new Date()).getMonth(); 
    for(let i = 0; i < 6; i++){
        if(todaysMonth > -1){
            if(todaysMonth === 11) todaysMonth--;
            months.push(namesOfMonths[todaysMonth]);
            todaysMonth--;
        }else{
            todaysMonth = 11;
            months.push(namesOfMonths[todaysMonth]);
        }
    }
    months.reverse();
    for(let i = 0; i < 6; i++){
        const orderList = orders.filter(order => {
            const orderDateNumber = Date.parse(order.createdAt);
            const orderDate = new Date(orderDateNumber);
            return orderDate.getMonth() === namesOfMonths.indexOf(months[i]) && orderDate.getFullYear() === (new Date()).getFullYear();
        });

        let monthSales = 0;
        let count = 0;

        orderList.forEach(order => {
            monthSales += order.totalPrice;
            count++;
        })
        
        sales.push(monthSales);
        quantity.push(count);
    }

    return {months, sales, quantity}
}