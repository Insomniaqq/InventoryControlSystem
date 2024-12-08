let currentEditingProductId;

document.addEventListener("DOMContentLoaded", function () {
    const jsonData = {
        "КатегорииТоваров": [
            { "КатегорияID": "1", "Категория": "Метал.добавки", "Вещества": [{ "Наименование": "Ферромарганец", "Поставщик": "ООО Металлург" }, { "Наименование": "Силикокальций", "Поставщик": "ООО Металлург" }] },
            { "КатегорияID": "2", "Категория": "Горючие вещества", "Вещества": [{ "Наименование": "Бензин", "Поставщик": "ИП Горючева" }, { "Наименование": "Керосин", "Поставщик": "ИП Горючева" }, ] },
            { "КатегорияID": "3", "Категория": "Хим.реактивы и окислители", "Вещества": [{ "Наименование": "Перекись водорода", "Поставщик": "ООО Химреактив" }, { "Наименование": "Нитрат аммония", "Поставщик": "ООО Химреактив" }, { "Наименование": "Натрий хлорид", "Поставщик": "ООО Химреактив" }, { "Наименование": "Серная кислота", "Поставщик": "ООО Химреактив" }, { "Наименование": "Уксусная кислота", "Поставщик": "ООО Химреактив" }] },
            { "КатегорияID": "4", "Категория": "Связующие вещества", "Вещества": [{ "Наименование": "Эпоксидная смола", "Поставщик": "ООО Полимер" }, { "Наименование": "Клей ПВА", "Поставщик": "ООО Полимер" }] },
            { "КатегорияID": "5", "Категория": "Конструкционные материалы", "Вещества": [{ "Наименование": "Арматура", "Поставщик": "ИП Стройматериалы" }, { "Наименование": "Металлопрофиль", "Поставщик": "ИП Стройматериалы" }, { "Наименование": "Цемент", "Поставщик": "ИП Стройматериалы" }, { "Наименование": "Песок", "Поставщик": "ИП Стройматериалы" }, { "Наименование": "Щебень", "Поставщик": "ИП Стройматериалы" }] }
        ],
        data: [
            { ТоварID: 1, Наименование: 'Ферромарганец', КоличествоНаСкладе: '90 кг', КатегорияID: '1' },
            { ТоварID: 2, Наименование: 'Силикокальций', КоличествоНаСкладе: '45 кг', КатегорияID: '1' },
            { ТоварID: 3, Наименование: 'Бензин', КоличествоНаСкладе: '480 л', КатегорияID: '2' },
            { ТоварID: 4, Наименование: 'Керосин', КоличествоНаСкладе: '290 л', КатегорияID: '2' },
            { ТоварID: 5, Наименование: 'Перекись водорода', КоличествоНаСкладе: '190 л', КатегорияID: '3' },
            { ТоварID: 6, Наименование: 'Нитрат аммония', КоличествоНаСкладе: '95 кг', КатегорияID: '3' },
            { ТоварID: 7, Наименование: 'Эпоксидная смола', КоличествоНаСкладе: '48 л', КатегорияID: '4' },
            { ТоварID: 8, Наименование: 'Клей ПВА', КоличествоНаСкладе: '98 л', КатегорияID: '4' },
            { ТоварID: 9, Наименование: 'Арматура', КоличествоНаСкладе: '95 шт', КатегорияID: '5' },
            { ТоварID: 10, Наименование: 'Металлопрофиль', КоличествоНаСкладе: '190 шт', КатегорияID: '5' },
            { ТоварID: 11, Наименование: 'Натрий хлорид', КоличествоНаСкладе: '100 л', КатегорияID: '3' },
            { ТоварID: 12, Наименование: 'Серная кислота', КоличествоНаСкладе: '100 л', КатегорияID: '3' },
            { ТоварID: 13, Наименование: 'Уксусная кислота', КоличествоНаСкладе: '100 л', КатегорияID: '3' },
            { ТоварID: 14, Наименование: 'Цемент', КоличествоНаСкладе: '200 кг', КатегорияID: '5' },
            { ТоварID: 15, Наименование: 'Песок', КоличествоНаСкладе: '200 кг', КатегорияID: '5' },
            { ТоварID: 16, Наименование: 'Щебень', КоличествоНаСкладе: '200 кг', КатегорияID: '5' },

        ]
    };

    
    function populateForm() {
        const categorySelect = document.querySelector('.category select');
        const nameSelect = document.querySelector('.name select');
        const supplierSelect = document.querySelector('.man select');

        categorySelect.innerHTML = '<option value="">Выберите категорию</option>';
        nameSelect.innerHTML = '<option value="">Выберите наименование</option>';
        supplierSelect.innerHTML = '<option value="">Выберите поставщика</option>';

        jsonData.КатегорииТоваров.forEach(category => {
            const option = document.createElement('option');
            option.value = category.КатегорияID;
            option.textContent = category.Категория;
            categorySelect.appendChild(option);
        });

        categorySelect.addEventListener('change', function () {
            nameSelect.innerHTML = '<option value="">Выберите наименование</option>';
            supplierSelect.innerHTML = '<option value="">Выберите поставщика</option>';

            const selectedCategoryId = this.value;
            jsonData.КатегорииТоваров.forEach(category => {
                if (category.КатегорияID === selectedCategoryId) {
                    category.Вещества.forEach(substance => {
                        const option = document.createElement('option');
                        option.textContent = substance.Наименование;
                        option.value = substance.Наименование;
                        nameSelect.appendChild(option);
                    });
                }
            });

            if (nameSelect.options.length > 1) {
                nameSelect.selectedIndex = 1;
                nameSelect.dispatchEvent(new Event('change'));
            }
        });

        nameSelect.addEventListener('change', function () {
            const selectedSubstanceName = this.value;
            supplierSelect.innerHTML = '<option value="">Выберите поставщика</option>';

            jsonData.КатегорииТоваров.forEach(category => {
                category.Вещества.forEach(substance => {
                    if (substance.Наименование === selectedSubstanceName) {
                        const supplierOption = document.createElement('option');
                        supplierOption.textContent = substance.Поставщик;
                        supplierOption.value = substance.Поставщик;
                        supplierSelect.appendChild(supplierOption);
                    }
                });
            });
        });
    }

    populateForm();

    
    document.getElementById('addButton').addEventListener('click', function () {
        document.getElementById('formContainer-store').style.display = 'flex';
    });

    
    document.querySelector('.close-button').addEventListener('click', function () {
        document.getElementById('formContainer-store').style.display = 'none';
    });

    
    function loadProductsFromLocalStorage() {
        const productsList = JSON.parse(localStorage.getItem("inventoryProductsSuppliers")) || [];
        
        if (productsList.length === 0) {
            displayEmptyMessage();
        } else {
            productsList.forEach(product => {
                addProductToTable(product);
            });
        }
    }

    
    function displayEmptyMessage() {
        const inventoryBody = document.getElementById('inventoryBody');
        const messageRow = document.createElement('tr');
        const messageCell = document.createElement('td');
        
        messageCell.colSpan = 5; 
        messageCell.textContent = 'Вы еще не добавляли товары на склад';
        messageCell.style.textAlign = 'center'; 
        messageCell.style.color = 'white';
        messageCell.style.padding = '20px'; 
        
        messageRow.appendChild(messageCell);
        inventoryBody.appendChild(messageRow);
    }

    
    function addProductToTable(product) {
        const inventoryBody = document.getElementById('inventoryBody');
        
        
        if (inventoryBody.querySelector('tr td') && inventoryBody.querySelector('tr td').textContent === 'Вы еще не добавляли товары на склад') {
             inventoryBody.innerHTML = ''; 
         }

         const newRow = document.createElement('tr');

         const categoryCell = document.createElement('th');
         categoryCell.scope = 'row';
         categoryCell.textContent = product.category;

         const nameCell = document.createElement('td');
         nameCell.textContent = product.name;

         const quantityCell = document.createElement('td');
         quantityCell.textContent = product.quantity;

         const idCell = document.createElement('td');
         idCell.textContent = product.id;

         const actionsCell = document.createElement('td');

         
         const editButton = document.createElement('button');
         editButton.className = 'edit-button';
         editButton.textContent = '✎';
         
         editButton.addEventListener('click', function () {
             openEditForm(product);
         });

         actionsCell.appendChild(editButton);

         
         const deleteButton = document.createElement('button');
         deleteButton.className = 'delete-button';
         
         deleteButton.textContent = '✖';
         deleteButton.addEventListener('click', function () {
             inventoryBody.removeChild(newRow);
             removeProductFromLocalStorage(product.id);
             if (inventoryBody.children.length === 0) displayEmptyMessage(); 
         });

         actionsCell.appendChild(deleteButton);

         newRow.appendChild(categoryCell);
         newRow.appendChild(nameCell);
         newRow.appendChild(quantityCell);
         newRow.appendChild(idCell);
         newRow.appendChild(actionsCell);

         inventoryBody.appendChild(newRow);
     }

     loadProductsFromLocalStorage(); 

     
     function openEditForm(product) {
         currentEditingProductId = product.id;

         
         const [quantity, unit] = product.quantity.split(' ');
         
         document.getElementById('editQuantityInput').value = quantity;
         document.getElementById('editUnitSelect').value = unit;

         
         document.getElementById('editFormContainer').style.display = 'flex';
     }

     
     document.getElementById('closeEditButton').addEventListener('click', function () {
          document.getElementById('editFormContainer').style.display = 'none';
     });

     
     document.getElementById('editProductForm').addEventListener('submit', function (event) {
          event.preventDefault();

          const quantityInputValue = document.getElementById('editQuantityInput').value;
          const unitInputValue = document.getElementById('editUnitSelect').value;

          const updatedProduct = {
              id: currentEditingProductId,
              quantity: `${quantityInputValue} ${unitInputValue}`
          };

          updateProductInLocalStorage(updatedProduct);
          updateProductInTable(updatedProduct);

          document.getElementById('editFormContainer').style.display = 'none';
      });

      function updateProductInLocalStorage(updatedProduct) {
          let productsList = JSON.parse(localStorage.getItem("inventoryProductsSuppliers")) || [];
          
          productsList.forEach(product => {
              if (product.id === updatedProduct.id) {
                  product.quantity = updatedProduct.quantity; 
              }
          });
          
          localStorage.setItem("inventoryProductsSuppliers", JSON.stringify(productsList));
      }

      function updateProductInTable(updatedProduct) {
          const rows = document.querySelectorAll('#inventoryBody tr');
          rows.forEach(row => {
              const cells = row.querySelectorAll('td');
              if (cells[3].textContent == updatedProduct.id) { 
                  cells[2].textContent= updatedProduct.quantity; 
              }
          });
      }

      
      function validateForm(formId) {
          const form=document.getElementById(formId);
          const inputs=form.querySelectorAll ('input[required], select[required]');
          let valid=true;

          
          const errorContainer=document.getElementById ('errorContainer');
          errorContainer.innerHTML='';

          inputs.forEach(input => {
              if (!input.value) {
                  valid=false;
                  const errorMessage=document.createElement ('div');
                  errorMessage.textContent=`${input.previousElementSibling.textContent} обязательно для заполнения.`;
                  errorMessage.style.color='red';
                  errorContainer.appendChild(errorMessage);
              }
          });

          return valid;
      }

      
      document.getElementById ('productForm').addEventListener ('submit', function (event) {
          event.preventDefault(); 
          if (validateForm ('productForm')) {
              const categoryID=document.getElementById ('categorySelect').value;
              const name=document.getElementById ('nameSelect').value;

              
              const productData=jsonData.data.find(product => product.Наименование===name);
              if (!productData) {
                  alert ("Товар не найден в базе данных.");
                  return;
              }

              const quantityInputValue=document.getElementById ('quantityInput').value; 
              const unitInputValue=document.getElementById ('unitSelect').value; 

              const newProduct={
                  id : productData.ТоварID,
                  category : categoryID,
                  name : productData.Наименование,
                  quantity : `${quantityInputValue} ${unitInputValue}`
              };

              saveProductToLocalStorage(newProduct);
              addProductToTable(newProduct);

              document.getElementById ('formContainer-store').style.display='none';
          }
      });

      
      function saveProductToLocalStorage(product) {
          let productsList=JSON.parse(localStorage.getItem ("inventoryProductsSuppliers")) || [];
          productsList.push(product);
          localStorage.setItem ("inventoryProductsSuppliers", JSON.stringify(productsList));
      }

      
      function removeProductFromLocalStorage(productId) {
          let productsList=JSON.parse(localStorage.getItem ("inventoryProductsSuppliers")) || [];
          productsList=productsList.filter(product => product.id !== productId);
          
          localStorage.setItem ("inventoryProductsSuppliers", JSON.stringify(productsList));
          
          if(productsList.length===0){
               displayEmptyMessage(); 
           }
      }

      
      document.getElementById ('searchInput').addEventListener ('input', function () {
           const query=this.value.toLowerCase();
           const rows=document.querySelectorAll('#inventoryBody tr');

           rows.forEach(row=>{
               const cells=row.querySelectorAll ('td');
               const matches=Array.from(cells).some(cell=>cell.textContent.toLowerCase().includes(query));
               row.style.display=matches ? '' : 'none';
           });
       });
});