import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createElement(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="image-container">
            <img src="${image}" alt="${name}">
        </div>
        <div class="card-container__informacao">
            <p>${name}</p>
        <div class="card-container__price">
            <p>R$${price}</p>
            <button class="delete-button" data-id="${id}">
                <img src="imagens/icone-excluir.png" alt="icone">
            </button>    
        </div>
        </div>
    `

    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try{
        const listProduct = await servicesProducts.productList();
        
        listProduct .forEach(product => {
            productContainer.appendChild(
                createElement(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
        });

    } catch(error) {
        console.log(error);
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProduct(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

productContainer.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-button") || event.target.closest(".delete-button")) {
        const deleteButton = event.target.closest(".delete-button") || event.target;
        const id = deleteButton .dataset.id;
        try {
            await servicesProducts.deleteProduct(id);
            deleteButton .closest(".card").remove();
        } catch (err) {
            console.log(err);
        }
    }
});

render();

