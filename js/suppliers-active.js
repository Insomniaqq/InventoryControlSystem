document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        window.location.href = "index.html"; 
    }

    function loadActiveOrders() {
        const ordersContainer = document.querySelector('.buyers-list');
        ordersContainer.innerHTML = ''; 

        let orders = JSON.parse(localStorage.getItem('orders')) || []; 

        if (orders.length === 0) {
            ordersContainer.style.display = 'none'; 
            return;
        }

        ordersContainer.style.display = 'block'; 

        orders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.classList.add('buyer-item');
            
            orderItem.innerHTML = `
                <div class="item">ЗакупщикID: <span>${currentUser.id}</span></div>
                <div class="item">ЗаказID: <span>${order.orderID}</span></div>
                <div class="item">Дата: <span>${order.date}</span></div>
                <div class="item">Статус: <span class="status">${order.status}</span></div>
                <button class="info-button item">Информация</button>
                <button class="edit-button item">Подтвердить</button>
                <button class="delete-button item" data-order-id="${order.orderID}">Отменить</button>`; 
            
            orderItem.querySelector('.info-button').addEventListener('click', function() {
                showOrderDetails(order);
            });

            orderItem.querySelector('.delete-button').addEventListener('click', function(event) {
                const orderID = event.target.getAttribute('data-order-id'); 
                deleteOrder(orderID); 
            });

            orderItem.querySelector('.edit-button').addEventListener('click', function() {
                
                order.status = "Подтверждено";
                
                
                localStorage.setItem('orders', JSON.stringify(orders));
            
                
                let completedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
                
                
                completedOrders.push({
                    buyerID: currentUser.id, 
                    orderID: order.orderID,
                    date: order.date,
                    status: order.status
                });
                
                localStorage.setItem('completedOrders', JSON.stringify(completedOrders)); 
            
                
                window.location.href = "suppliers-complete.html"; 
            });

            ordersContainer.appendChild(orderItem); 
        });
    }

    loadActiveOrders(); 
});