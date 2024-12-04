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
                <button class="delete-button item" data-order-id="${order.orderID}">Удалить</button>`;
        
            orderItem.querySelector('.info-button').addEventListener('click', function () {
                showOrderDetails(order);
            });
        
            orderItem.querySelector('.delete-button').addEventListener('click', function (event) {
                const orderID = event.target.getAttribute('data-order-id');
                deleteOrder(orderID);
            });
        
            ordersContainer.appendChild(orderItem);
        });
    }

    function showOrderDetails(order) {
        if (!currentUser) {
            console.error("Данные текущего пользователя недоступны.");
            return;
        }

        // Заполнение данных в модальном окне
        document.getElementById('detailId').textContent = order.orderID || "Не указано";
        document.getElementById('detailCategory').textContent = order.category || "Не указано";
        document.getElementById('detailName').textContent = order.name || "Не указано";
        document.getElementById('detailQuantity').textContent = order.quantity || "Не указано";

        const addressParts = order.address ? order.address.split(', ') : [];
        document.getElementById('detailCity').textContent = addressParts[0] || 'Не указано';
        document.getElementById('detailStreet').textContent = addressParts[1] || 'Не указано';
        document.getElementById('detailHouse').textContent = addressParts[2] || 'Не указано';

        // Добавляем отображение номера телефона
        document.getElementById('detailPhone').textContent = order.phone || "Не указано"; // Отображение номера телефона

        // Открытие модального окна
        const modal = document.getElementById("detailsModal");
        modal.style.display = "block";

        // Закрытие модального окна
        modal.querySelector('.close-button').onclick = function () {
            modal.style.display = "none";
        };

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }

    function deleteOrder(orderID) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        
        orders = orders.filter(order => order.orderID !== orderID);
        
        localStorage.setItem('orders', JSON.stringify(orders));
        
        loadActiveOrders();
    }

    const clearButton = document.querySelector('.add-button');
    if (clearButton) {
        clearButton.addEventListener('click', function () {
            if (confirm("Вы уверены, что хотите удалить все активные заказы?")) {
                localStorage.removeItem('orders');
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