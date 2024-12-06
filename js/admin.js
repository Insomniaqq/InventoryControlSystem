document.addEventListener("DOMContentLoaded", function() {
    const toggleFormButton = document.getElementById("toggleFormButton");
    const formContainer = document.getElementById("formContainer-store");
    const closeButton = document.querySelector(".close-button");
    const submitButton = document.querySelector(".submit");
    const buyersList = document.querySelector(".buyers-list");
    const errorMessagesContainer = document.getElementById("errorMessages");    
    const phoneInput = document.getElementById("phone");
    phoneInput.addEventListener("input", function(event) {
        const cursorPosition = this.selectionStart; 
        this.setSelectionRange(cursorPosition, cursorPosition); 
    });

    

    
    function addSupplier(supplier) {
        const buyerItem = document.createElement("div");
        buyerItem.classList.add("buyer-item");
        buyerItem.innerHTML = `
            <div>ЗакупщикID: <span>${supplier.id}</span></div>
            <div>Имя: <span>${supplier.name}</span></div>
            <div>Логин: <span>${supplier.login}</span></div>
            <div>Пароль: <span>${supplier.password}</span></div>
            <div>Телефон: <span>${supplier.phone}</span></div>
            <div>Почта: <span>${supplier.email}</span></div>
            <button class="delete-button">✖</button>
        `;
        buyersList.appendChild(buyerItem);
        
        buyerItem.querySelector(".delete-button").addEventListener("click", function() {
            removeSupplier(supplier.id, buyerItem);
        });
    }

    
    function removeSupplier(id, buyerItem) {
        buyersList.removeChild(buyerItem);
        let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
        suppliers = suppliers.filter(supplier => supplier.id !== id);
        localStorage.setItem("suppliers", JSON.stringify(suppliers));
    }

    
    function loadSuppliers() {
        const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
        suppliers.forEach(addSupplier);
    }

    
    function showError(message) {
        errorMessagesContainer.innerText = message;
        errorMessagesContainer.style.display = 'block';
    }

    
    function validateForm(supplierId, name, login, password, phone, email) {
        errorMessagesContainer.style.display = 'none'; 
        let errorMessage = '';

    
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const loginPattern = /^[a-zA-Z0-9]{1,12}$/;

        if (!/^\d+$/.test(supplierId)) {
            errorMessage += 'ЗакупщикID должен содержать только цифры.\n';
        }
        
        if (supplierId.trim() === '') {
            errorMessage += 'ЗакупщикID не может быть пустым.\n';
        }

        if (name.trim() === '') {
            errorMessage += 'Имя не может быть пустым.\n';
        }

        if (!loginPattern.test(login)) {
            errorMessage += 'Логин должен содержать только буквы и цифры и не превышать 12 символов.\n';
        }

        if (password.length > 12) {
            errorMessage += 'Пароль не должен превышать 12 символов.\n';
        }

        if (!emailPattern.test(email)) {
            errorMessage += 'Электронная почта должна быть в формате zakupchik@mail.ru.\n';
        }

        if (errorMessage) {
            showError(errorMessage);
            return false; 
        }

        return true; 
    }

    
    function preventSpaces(event) {
        if (event.key === " ") {
            event.preventDefault();
        }
    }

    
    const inputFields = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="password"], input[type="email"]');
    
    inputFields.forEach(input => {
        input.addEventListener('keypress', preventSpaces);
    });

   
   toggleFormButton.addEventListener("click", function() {
       formContainer.style.display = "flex"; 
   });

   
   closeButton.addEventListener("click", function() {
       formContainer.style.display = "none"; 
   });

   
   submitButton.addEventListener("click", function(event) {
       event.preventDefault(); 

       const supplierId = document.getElementById("companyName").value.trim();
       const name = document.getElementById("contactPerson").value.trim();
       const login = document.getElementById("login").value.trim();
       const password = document.getElementById("password").value.trim();
       const phone = document.getElementById("phone").value.trim();
       const email = document.getElementById("email").value.trim();

       
       if (!validateForm(supplierId, name, login, password, phone, email)) {
           return; 
       }

       
       const newSupplier = { id: supplierId, name: name, login: login, password: password, phone: phone, email: email };

       
       let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
       
       
       if (suppliers.some(supplier => supplier.id === supplierId)) {
           showError('Поставщик с таким ID уже существует!');
           return;
       }

       suppliers.push(newSupplier);
       localStorage.setItem("suppliers", JSON.stringify(suppliers));

       
       addSupplier(newSupplier);

       
       formContainer.style.display = "none"; 

      
      document.getElementById("companyName").value = '';
      document.getElementById("contactPerson").value = '';
      document.getElementById("login").value = '';
      document.getElementById("password").value = '';
      document.getElementById("phone").value = '';
      document.getElementById("email").value = '';
   });

   
   loadSuppliers();
});