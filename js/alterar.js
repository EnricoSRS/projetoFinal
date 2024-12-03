window.addEventListener("DOMContentLoaded", function () {
    let stockTable = document.getElementById("stockTable");
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function renderTable() {
        stockTable.innerHTML = ""; 
        if (products.length === 0) {
            stockTable.innerHTML = "<tr><td colspan='4'>Nenhum produto no estoque.</td></tr>";
        } else {
            products.forEach((product, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td><input type="text" value="${product.name}" data-index="${index}" class="edit-name" disabled></td>
                    <td><input type="number" value="${product.quantity}" data-index="${index}" class="edit-quantity" disabled></td>
                    <td><input type="number" value="${product.price.toFixed(2)}" data-index="${index}" class="edit-price" step="0.01" disabled></td>
                    <td>
                        <button class="edit-btn" data-index="${index}">Alterar</button>
                        <button class="save-btn" data-index="${index}" style="display: none;">Salvar</button>
                    </td>
                `;
                stockTable.appendChild(row);
            });

           
            document.querySelectorAll(".edit-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const index = this.getAttribute("data-index");
                    toggleEditMode(index, true);
                });
            });

            document.querySelectorAll(".save-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const index = this.getAttribute("data-index");
                    saveChanges(index);
                });
            });
        }
    }

    function toggleEditMode(index, enable) {
        const nameInput = document.querySelector(`.edit-name[data-index="${index}"]`);
        const quantityInput = document.querySelector(`.edit-quantity[data-index="${index}"]`);
        const priceInput = document.querySelector(`.edit-price[data-index="${index}"]`);
        const editButton = document.querySelector(`.edit-btn[data-index="${index}"]`);
        const saveButton = document.querySelector(`.save-btn[data-index="${index}"]`);

        nameInput.disabled = !enable;
        quantityInput.disabled = !enable;
        priceInput.disabled = !enable;
        editButton.style.display = enable ? "none" : "inline";
        saveButton.style.display = enable ? "inline" : "none";
    }

    function saveChanges(index) {
        const nameInput = document.querySelector(`.edit-name[data-index="${index}"]`);
        const quantityInput = document.querySelector(`.edit-quantity[data-index="${index}"]`);
        const priceInput = document.querySelector(`.edit-price[data-index="${index}"]`);

        
        products[index] = {
            name: nameInput.value,
            quantity: parseInt(quantityInput.value, 10),
            price: parseFloat(priceInput.value)
        };

        
        localStorage.setItem("products", JSON.stringify(products));
        renderTable();
    }

    
    renderTable();
});