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
                <div class="item">ПоставщикID: <span>${currentUser.id}</span></div>
                <div class="item">ЗаказID: <span>${order.orderID}</span></div>
                <div class="item">Дата: <span>${order.date}</span></div>
                <div class="item">Статус: <span class="status">${order.status}</span></div>
                <button class="info-button item">Информация</button>
                <button class="edit-button item" ${order.status === "Подтверждено" || order.status === "Отменен" ? 'disabled' : ''}>Подтвердить</button>
                <button class="delete-button item" data-order-id="${order.orderID}">Отменить</button>`;

            orderItem.querySelector('.info-button').addEventListener('click', function () {
                showOrderDetails(order);
            });

            orderItem.querySelector('.delete-button').addEventListener('click', function (event) {
                const orderID = event.target.getAttribute('data-order-id');
                cancelOrder(orderID); 
            });

            orderItem.querySelector('.edit-button').addEventListener('click', function () {
                let orders = JSON.parse(localStorage.getItem('orders')) || [];
                const orderToUpdate = orders.find(o => o.orderID === order.orderID);

                if (orderToUpdate) {
                    if (orderToUpdate.status === "Подтверждено") {
                        displayErrorMessage("Этот заказ уже был подтвержден.");
                        return;
                    }

                    if (orderToUpdate.status === "Отменен") {
                        displayErrorMessage("Этот заказ был отменен и не может быть подтвержден.");
                        return;
                    }

                    
                    orderToUpdate.status = "Подтверждено";

                    
                    this.disabled = true;
                    this.textContent = "Подтверждено";

                    localStorage.setItem('orders', JSON.stringify(orders));

                    let completedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
                    completedOrders.push({
                        buyerID: currentUser.id,
                        orderID: order.orderID,
                        date: order.date,
                        status: "Подтверждено"
                    });
                    localStorage.setItem('completedOrders', JSON.stringify(completedOrders));

                    window.location.href = "suppliers-complete.html";
                }
            });

            ordersContainer.appendChild(orderItem);
        });
    }

    function showOrderDetails(order) {
        if (!currentUser) {
            console.error("Данные текущего пользователя недоступны.");
            return;
        }

        
        document.getElementById('detailId').textContent = order.orderID || "Не указано";
        document.getElementById('detailCategory').textContent = order.category || "Не указано";
        document.getElementById('detailName').textContent = order.name || "Не указано";
        document.getElementById('detailQuantity').textContent = order.quantity || "Не указано";

        const addressParts = order.address ? order.address.split(', ') : [];
        document.getElementById('detailCity').textContent = addressParts[0] || 'Не указано';
        document.getElementById('detailStreet').textContent = addressParts[1] || 'Не указано';
        document.getElementById('detailHouse').textContent = addressParts[2] || 'Не указано';

        
        document.getElementById('detailPhone').textContent = order.phone || "Не указано"; 

        
        const modal = document.getElementById("detailsModal");
        modal.style.display = "block";

        
        modal.querySelector('.close-button').onclick = function () {
            modal.style.display = "none";
        };

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }

    function cancelOrder(orderID) { 
        let orders = JSON.parse(localStorage.getItem('orders')) || [];

        
        const orderToCancel = orders.find(order => order.orderID === orderID);

        if (orderToCancel) {
            orderToCancel.status = "Отменен"; 

            localStorage.setItem('orders', JSON.stringify(orders)); 

            loadActiveOrders(); 

            
            let canceledOrders = JSON.parse(localStorage.getItem('canceledOrders')) || [];
            canceledOrders.push({
                buyerID: currentUser.id,
                orderID: orderToCancel.orderID,
                date: orderToCancel.date,
                status: "Отменен"
            });
            localStorage.setItem('canceledOrders', JSON.stringify(canceledOrders));

        }
    }

    
    const clearButton = document.querySelector('.clear-button');
    if (clearButton) {
        clearButton.addEventListener('click', function () {
            if (confirm("Вы уверены, что хотите очистить отображение активных заказов?")) {
                const ordersContainer = document.querySelector('.buyers-list');
                ordersContainer.innerHTML = ''; 
                ordersContainer.style.display = 'none'; 
            }
        });
    }

    loadActiveOrders();

    if (!currentUser || currentUser.role !== "Администратор") {
        const adminMenuItem = document.querySelector(".nav__menu .admin");
        if (adminMenuItem) {
            adminMenuItem.style.display = "none";
        }
    }
});