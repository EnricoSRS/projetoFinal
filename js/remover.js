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
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>R$ ${product.price.toFixed(2)}</td>
                    <td><button class="delete-btn" data-index="${index}">Excluir</button></td>
                `;
                stockTable.appendChild(row);
            });

            
            const deleteButtons = document.querySelectorAll(".delete-btn");
            deleteButtons.forEach(button => {
                button.addEventListener("click", function () {
                    const index = this.getAttribute("data-index");
                    removeProduct(index);
                });
            });
        }
    }

    function removeProduct(index) {
        products.splice(index, 1); 
        localStorage.setItem("products", JSON.stringify(products)); 
        renderTable(); 
    }

    
    renderTable();
});
