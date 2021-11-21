export default class ClientService{
    static transformClients(clients){
        let clientList = [];

        const countLastOrderDate = orders => {
            let lastOrderDate = null;

            orders.forEach(order => {
                if(!order.createdAt){
                    return;
                }
                const orderDate = new Date(order.createdAt);
                
                if(!lastOrderDate){
                    lastOrderDate = orderDate;
                    return;
                }
                if(orderDate > lastOrderDate){
                    lastOrderDate = orderDate;
                }
            })
            if(!lastOrderDate){
                return 'Нет заказов';
            }
            return lastOrderDate.toDateString();
        }

        clients.forEach(client => {
            clientList.push({
                id: client.id,
                name: client.name,
                phoneNumber: client.phoneNumber,
                contactEmail: client.contactEmail,
                lastOrderDate: countLastOrderDate(client.orders)
            });
        });

        return clientList;
    }
}