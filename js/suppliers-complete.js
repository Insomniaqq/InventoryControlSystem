document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        window.location.href = "index.html"; 
    }

    const ordersContainer = document.querySelector('.order-table');

    
    let completedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
    
    
    if (completedOrders.length > 0) {
        completedOrders.forEach(order => {
            const orderRow = document.createElement('div');
            orderRow.classList.add('order-row');
            orderRow.innerHTML = `
                <div>Поставщик ID: <span>${order.buyerID}</span></div>
                <div>Заказ ID: <span>${order.orderID}</span></div>
                <div>Дата: <span>${order.date}</span></div>
                <div>Статус: <span>Выполнено</span></div>`;
            ordersContainer.appendChild(orderRow);
        });
    } else {
        ordersContainer.innerHTML = '<p>Нет завершенных заказов.</p>';
    }

    
    document.querySelector('.clear-button').addEventListener('click', function() {
        if (confirm("Вы уверены, что хотите удалить все завершенные заказы?")) {
            localStorage.removeItem('completedOrders'); 
            ordersContainer.innerHTML = ''; 
            ordersContainer.innerHTML = '<p>Нет завершенных заказов.</p>'; 
        }
    });
});