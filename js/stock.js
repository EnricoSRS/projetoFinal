window.addEventListener("DOMContentLoaded", function () {
    let stockTable = document.getElementById("stockTable");
    let products = JSON.parse(localStorage.getItem("products")) || [];
  
    if (products.length === 0) {
      stockTable.innerHTML = "<tr><td colspan='3'>Nenhum produto no estoque.</td></tr>";
    } else {
      products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${product.name}</td>
          <td>${product.quantity}</td>
          <td>${product.price.toFixed(2)}</td>
        `;
        stockTable.appendChild(row);
      });
    }
  });
  