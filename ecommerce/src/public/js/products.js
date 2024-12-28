const productsList = document.getElementById("products-list");
const btnRefreshproductsList = document.getElementById("btn-refresh-products-list");

const loadproductsList = async () => {
    const response = await fetch("/api/products", { method: "GET" });
    const data = await response.json();
    const products = data.payload.docs ?? [];

    productsList.innerText = "";

    products.forEach((product) => {
        productsList.innerHTML += `<li>Id: ${product.id} - Nombre: ${product.title}</li>`;
    });
};

btnRefreshproductsList.addEventListener("click", () => {
    loadproductsList();
    console.log("¡Lista recargada!");
});

// Se ejecuta para cargar la lista de productos al ingresar o refrescar
loadproductsList();