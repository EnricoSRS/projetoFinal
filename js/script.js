document.getElementById("addButton").addEventListener("click", function () {
    let name = document.getElementById("nomeProduto").value;
    let quantity = document.getElementById("quantidade").value;
    let price = document.getElementById("preco").value;

    if (name && quantity && price) {
        let product = { 
            name, 
            quantity: parseInt(quantity), 
            price: parseFloat(price) 
        };
        
        let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        storedProducts.push(product);
        localStorage.setItem("products", JSON.stringify(storedProducts));

        showNotification("Produto adicionado com sucesso!", "success");
        document.getElementById("Form").reset();
    } else {
        showNotification("Por favor, preencha todos os campos!", "error");
    }
});

function showNotification(message, type = "success") {
    let notificationContainer = document.getElementById("notification");

   
    let notification = document.createElement("div");
    notification.innerText = message;

    
    notification.classList.add("notification", type);

    
    notificationContainer.appendChild(notification);

    
    setTimeout(() => {
        notificationContainer.removeChild(notification);
    }, 2000);
}

