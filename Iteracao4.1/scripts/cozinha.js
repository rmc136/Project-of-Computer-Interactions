"use strict";

/* ------------------------------------------------------------------------- */
/*                                                                 CONSTANTS */
/* ------------------------------------------------------------------------- */
let checkedItems = [];
const ALIMENTOS1 = [
    new Alimento("Brócolos", "./images/brocolos.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f"),
    new Alimento("Couve", "./images/couve.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f"),
    new Alimento("Espinafres", "./images/espinafres.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f"),
    new Alimento("Laranjas", "./images/laranjas.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f"),
    new Alimento("Lentilhas", "./images/lentilhas.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f")
];

const ALIMENTOS2 = [
    new Alimento("Abacate", "./images/abacate.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f"),
    new Alimento("Iogurte-grego", "./images/grego.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f"),
    new Alimento("Quinoa", "./images/quinoa.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f"),
    new Alimento("Salmão", "./images/salmao.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f"),
    new Alimento("Iogurte", "./images/yogurt.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f")
];

const ALIMENTOS3 = [
    new Alimento("Amêndoas", "./images/Amendoas.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f"),
    new Alimento("Azeite", "./images/azeite.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f"),
    new Alimento("Batata-doce", "./images/batatadoce.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f"),
    new Alimento("Chocolate", "./images/chocolate.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f"),
    new Alimento("Nozes", "./images/nozes.png", "12/12/2023", getRandomNumberBetween4And60(), getRandomNumberBetween4And60(), "f")
];

/* ------------------------------------------------------------------------- */
/*                                                          GLOBAL VARIABLES */
/* ------------------------------------------------------------------------- */

let alimentosFrig = [
    new Alimento("Queijo","./images/queijo.png", "15/08/2023", getRandomNumberBetween4And60(), null, "f", 1),
    new Alimento("Iogurte","./images/yogurt.png", "01/03/2023", getRandomNumberBetween4And60(), null, "f", 1),
    new Alimento("Leite", "./images/leite.png", "22/09/2023", getRandomNumberBetween4And60(), null, "f", 1),
    new Alimento("Fiambre", "./images/fiambre.png", "12/12/2023", getRandomNumberBetween4And60(), null, "f", 1),
    
];

let alimentosDesp = [
    new Alimento("Bolachas Maria","./images/bolachas.png", "12/12/2023", getRandomNumberBetween4And60(), null, "f", 1),
    new Alimento("Batatas Fritas","./images/chips.png", "12/12/2023", getRandomNumberBetween4And60(), null, "f", 1),
    new Alimento("Coca","./images/soda.png", "12/12/2023", getRandomNumberBetween4And60(), null, "f", 1),
];

/* ------------------------------------------------------------------------- */
/*                                                      OBJECTS CONSTRUCTORS */
/* ------------------------------------------------------------------------- */

function Alimento(nome, source, validade, calorias, preco, local, quantity) {
    this.nome = nome
    this.source = source
    this.validade = validade
    this.calorias = calorias
    this.preco = preco
    this.local = local
    this.quantity = quantity
}

// Functions etc

function getRandomNumberBetween4And60() {
    const randomNumber = Math.random();
    const min = 3;
    const max = 20;
    const scaledNumber = min + (randomNumber * (max - min + 1));
    return Math.floor(scaledNumber);
}

// Listas

function toggleCheckboxes(source) {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = source.checked;
        updateCheckedItems(checkbox);
    });
}

function updateCheckedItems(checkbox) {
    const checkboxIdentifier = `${checkbox.name}-${checkbox.dataset.source}`;
    const quantity = getQuantityForCheckbox(checkbox);

    const checkboxData = {
        identifier: checkboxIdentifier,
        quantity: quantity
    };

    if (checkbox.checked && !isCheckedItemStored(checkboxData)) {
        checkedItems.push(checkboxData);
    } else if (!checkbox.checked) {
        removeCheckedItem(checkboxData);
    }

    // Store the checked items in local storage
    saveCheckedItemsToLocalStorage();
}

function handleCheckboxClick(checkbox) {
    updateCheckedItems(checkbox);
}

document.addEventListener("change", function (event) {
    if (event.target.classList.contains("checkbox")) {
        handleCheckboxClick(event.target);
    }
});



function restoreSelectedCheckboxesState() {
    const checkboxes = document.querySelectorAll(".checkbox");
    const quantityInputs = document.querySelectorAll(".quantity-input");

    checkboxes.forEach((checkbox) => {
        const checkboxIdentifier = `${checkbox.name}-${checkbox.dataset.source}`;
        const quantityInput = getQuantityInputForCheckbox(checkbox);
        const quantity = quantityInput ? parseInt(quantityInput.value, 10) : 1;

        const checkboxData = {
            identifier: checkboxIdentifier,
            quantity: quantity
        };

        const storedCheckboxData = checkedItems.find(item => item.identifier === checkboxData.identifier);

        if (storedCheckboxData) {
            checkbox.checked = true;
            quantityInput.value = storedCheckboxData.quantity;
        } else {
            checkbox.checked = false;
        }
    });
}

function isCheckedItemStored(checkboxData) {
    return checkedItems.some(item => item.identifier === checkboxData.identifier);
}

function removeCheckedItem(checkboxData) {
    const index = checkedItems.findIndex(item => item.identifier === checkboxData.identifier);
    if (index !== -1) {
        checkedItems.splice(index, 1);
    }
}

function saveCheckedItemsToLocalStorage() {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
}

function getQuantityForCheckbox(checkbox) {
    const quantityInput = getQuantityInputForCheckbox(checkbox);
    return quantityInput ? parseInt(quantityInput.value, 10) : 1;
}

function getQuantityInputForCheckbox(checkbox) {
    const checkboxName = checkbox.name;
    return document.querySelector(`.quantity-input[name="${checkboxName}"]`);
}

function populateGrid(alimentosArray) {
    const buttonCompra = document.querySelector(".buttonCompra");
    const grid = document.getElementById("imageGrid");
    // Retrieve the checked items from local storage
    const storedCheckedItems = JSON.parse(localStorage.getItem('checkedItems'));
    checkedItems = storedCheckedItems ? storedCheckedItems : [];

    // Call updateCheckedItems for each checkbox initially
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach(checkbox => {
        updateCheckedItems(checkbox);
    });

    document.getElementById('selectAllCheckbox').checked = false; 
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    buttonCompra.style.display = "flex";

    for (const alimento of alimentosArray) {
        const item = new Alimento(alimento.nome, alimento.source, alimento.validade, alimento.calorias, alimento.preco, alimento.local, alimento.quantity);
        const gridItem = document.createElement("div");
        gridItem.className = "grid-item";

        const image = document.createElement("img");
        image.src = alimento.source;
        image.alt = alimento.nome;
        image.className = "alimento-image";

        const nameLabel = document.createElement("label");
        nameLabel.textContent = alimento.nome;
        nameLabel.className = "alimento-name";

        const priceLabel = document.createElement("label");
        priceLabel.textContent = `Preço: ${alimento.preco}€`;
        priceLabel.className = "alimento-price";

        const checkboxLabel = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.name = alimento.nome;

        checkboxLabel.appendChild(checkbox);
        checkbox.dataset.source = `${alimento.nome}-${alimento.source}`;
        checkboxLabel.className = "checkbox-label";

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = 1;
        quantityInput.max = 15;
        quantityInput.value = alimento.quantity || 1; // Set a default value
        quantityInput.className = "quantity-input";
        quantityInput.name = alimento.nome;
        quantityInput.readOnly = true; // Set input to readonly
        const quantityLabel = document.createElement("label");
        quantityLabel.textContent = "Quantidade:";
        quantityLabel.className = "quantity-label";

        // Add event listeners for up and down buttons
        const upButton = createFormButton("up", quantityInput);
        const downButton = createFormButton("down", quantityInput);

        gridItem.appendChild(image);
        gridItem.appendChild(nameLabel);
        gridItem.appendChild(priceLabel);
        gridItem.appendChild(checkboxLabel);
        gridItem.appendChild(quantityLabel);
        gridItem.appendChild(quantityInput);
        gridItem.appendChild(document.createElement("br"));
        gridItem.appendChild(upButton);
        gridItem.appendChild(downButton);
        grid.appendChild(gridItem);
    }

    setTimeout(() => {
        restoreSelectedCheckboxesState();
    }, 0);
}

// Create form buttons for quantity input
function createFormButton(direction, inputField) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = direction === "up" ? "+" : "-";
    button.className = `form-button ${direction}`;
    button.addEventListener("click", () => handleFormButtonClick(direction, inputField));
    return button;
}

// Handle up and down button clicks
function handleFormButtonClick(direction, inputField) {
    const currentValue = parseInt(inputField.value, 10);
    const newValue = direction === "up" ? currentValue + 1 : Math.max(currentValue - 1, 1);

    // Update the input field value
    inputField.value = newValue;

    // Update the quantities in the localStorage immediately
    updateQuantityInLocalStorage(inputField.name, newValue);
}

// Update quantity in localStorage
function updateQuantityInLocalStorage(name, quantity) {
    const storedCheckedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];

    // Update the quantity in the storedCheckedItems array
    storedCheckedItems.forEach(item => {
        if (item.identifier === `${name}-${document.querySelector(`.checkbox[name="${name}"]`).dataset.source}`) {
            item.quantity = quantity;
        }
    });

    // Save the updated array to localStorage
    localStorage.setItem('checkedItems', JSON.stringify(storedCheckedItems));
}

function displayCartItems() {
    // Step 1: Retrieve data from local storage
    const cartData = localStorage.getItem('checkedItems');

    // Step 2: Parse the JSON data
    const parsedCartData = JSON.parse(cartData);

    // Step 3: Sort the array alphabetically by the 'identifier' property
    parsedCartData.sort((a, b) => {
        const identifierA = a.identifier.toLowerCase();
        const identifierB = b.identifier.toLowerCase();
        return identifierA.localeCompare(identifierB);
    });

    // Step 4: Display items on the page
    const cartItemsContainer = document.getElementById('cartItems');

    // Clear existing content
    cartItemsContainer.innerHTML = '';
    cartItemsContainer.innerHTML = `
    <h1 style="text-align: center; margin-top:10px;"> Carrinho de Compras </h1>
`;
    if (parsedCartData && parsedCartData.length > 0) {
        
        parsedCartData.forEach(item => {
            const itemDiv = document.createElement('div');
            let imagePath = item.identifier.split('-').pop();
            console.log(parsedCartData)
            itemDiv.innerHTML = `
                <p>${item.identifier.split('-')[0]}</p>
                <img src="${imagePath}" style="width: 120px; height: 100px; margin-left: 10px;">
                <p>Quantidade: ${item.quantity}</p>
                <button class="button" onclick="removerItem(${parsedCartData.indexOf(item)})"> Remover Item</button>
                <hr>
            `;
            cartItemsContainer.appendChild(itemDiv);
        });
    } else {
        // Display a message if the cart is empty
        cartItemsContainer.innerHTML = '<p>No items in the cart</p>';
    }
}

function removerItem(index) {
    // Step 1: Retrieve data from local storage
    const cartData = localStorage.getItem('checkedItems');

    // Step 2: Parse the JSON data
    let parsedCartData = JSON.parse(cartData);
    // Step 3: Sort the array alphabetically by the 'identifier' property
    parsedCartData.sort((a, b) => {
        const identifierA = a.identifier.toLowerCase();
        const identifierB = b.identifier.toLowerCase();
        return identifierA.localeCompare(identifierB);
    });

    parsedCartData.splice(index, 1);
    localStorage.setItem('checkedItems', JSON.stringify(parsedCartData));

    displayCartItems();
}

// ---------------------------Modal------------------------------------------
function clearFieldsAndErrors() {
    const inputs = document.querySelectorAll('.payment-fields input');
    const errorMessages = document.querySelectorAll('.error-message');
    
    inputs.forEach(input => {
        input.value = ''; // Clear input values
    });
    
    errorMessages.forEach(error => {
        error.innerHTML = ''; // Clear error messages
    });
}

function showModal() {
    // Hide all payment fields
    const paymentFields = document.querySelectorAll('.payment-fields');
    paymentFields.forEach(field => {
        field.style.display = 'none';
    });
    
    const modal = document.getElementById("modal");
    const totalPrice = document.getElementById("totalPrice");
    const quantityInputs = document.querySelectorAll(".quantity-input");

    // Retrieve the state of selected checkboxes from local storage
    const storedCheckedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];
    let total = 0;
    let atLeastOneSelected = false;

    // Iterate over all items stored in local storage
    storedCheckedItems.forEach(checkboxData => {
        const checkboxIdentifier = checkboxData.identifier.split('-')[0];
        if ([...ALIMENTOS1, ...ALIMENTOS2, ...ALIMENTOS3].some(alimento => alimento.nome === checkboxIdentifier)) {
            // Set the checkbox state
            atLeastOneSelected = true;  // Update the flag when items are found
        
            const itemName = checkboxData.identifier.split('-')[0];
            const itemQuantity = checkboxData.quantity;
        
            const itemLabel = document.createElement("label");
            itemLabel.textContent = `${itemName} (${itemQuantity});`;

        
            // Find the corresponding Alimento object from all arrays
            const alimento = [...ALIMENTOS1, ...ALIMENTOS2, ...ALIMENTOS3].find(a => a.nome === itemName);
        
            if (alimento) {
                total += alimento.preco * itemQuantity;
                if (alimento.local === "f") {
                    // Update the quantity property
                    alimento.quantity = itemQuantity;
                    addAlimentsFrig(alimento);
                }
            }
        }
    });

    if (!atLeastOneSelected) {
        alert("Por favor, selecione pelo menos um item antes de comprar.");
        return;
    }

    // Add event listeners to payment buttons to remove the error message when clicked
    const paymentBtns = document.querySelectorAll('.payment-btn');
    paymentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const errorContainer = document.getElementById('paymentSelectionError');
            errorContainer.style.display = 'none';
        });
    });

    // Clear fields and errors when the modal is closed
    clearFieldsAndErrors();

    totalPrice.textContent = `Total: ${total}€`;

    // Save the updated alimentosFrig array to local storage
    saveAlimentsFrig();

    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

function showSuccessModal() {
    const modalSuccess = document.getElementById("modalSuccess");
    modalSuccess.style.display = "block";
}

function selectPayment(paymentMethod) {
    // Remove 'selected' class from all payment buttons
    const paymentButtons = document.querySelectorAll('.payment-btn');
    paymentButtons.forEach(button => {
        button.classList.remove('selected');
    });

    // Hide all payment fields
    const paymentFields = document.querySelectorAll('.payment-fields');
    paymentFields.forEach(field => {
        field.style.display = 'none';
    });

    // Show the selected payment method fields
    const selectedFields = document.getElementById(`${paymentMethod}Fields`);
    if (selectedFields) {
        selectedFields.style.display = 'block';
    }

    // Add 'selected' class to the clicked payment button
    const clickedButton = document.getElementById(`payment-btn-${paymentMethod}`);
    if (clickedButton) {
        clickedButton.classList.add('selected');
    }
}

function processPayment() {
    const selectedPayment = document.querySelector('.payment-btn.selected');

    if (selectedPayment) {
        let paymentMethod = selectedPayment.textContent;
        let isValid = true;

        if (paymentMethod === 'Cartão de Crédito') {
            paymentMethod = 'credit'
        } else if (paymentMethod === 'MBWay') {
            paymentMethod = 'mbway'
        } else if (paymentMethod === 'PayPal') {
            paymentMethod = 'paypal'
        }

        const selectedFields = document.getElementById(`${paymentMethod}Fields`);

        if (selectedFields) {
            const inputs = selectedFields.querySelectorAll('input');
            const errorContainer = document.getElementById(`${paymentMethod.toLowerCase()}ErrorMessage`);
            errorContainer.innerHTML = ''; // Clear previous error messages
    
            inputs.forEach(input => {
                // Check if the field is empty and it's required
                if (input.value.trim() === '' && input.hasAttribute('required')) {
                    isValid = false;
                    // Show an error message below the input field
                    errorContainer.innerHTML += `<p>Por favor preencha o campo ${input.placeholder}.</p>`;
                }
    
                // Check if the field doesn't match the specified length
                if (input.hasAttribute('maxlength') && input.value.trim().length !== parseInt(input.getAttribute('maxlength'))) {
                    isValid = false;
                    // Show an error message below the input field
                    errorContainer.innerHTML += `<p>O campo ${input.placeholder} deve ter um tamanho de ${input.getAttribute('maxlength')} dígitos.</p>`;
                }

                // Check if the phone number doesn't start with 9
                if (input.getAttribute('type') === 'text' && input.placeholder === 'Número de telefone') {
                    if (!/^9/.test(input.value.trim())) {
                        isValid = false;
                        errorContainer.innerHTML += `<p>O número de telefone deve começar com 9.</p>`;
                    }
                }

                // Check if it's an email
                if (input.getAttribute('type') === 'email' && input.placeholder === 'PayPal Email') {
                    const emailRegex = /\S+@\S+\.\S+/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        errorContainer.innerHTML += `<p>O email não está no formato correto.</p>`;
                    }
                }
            });
        }

        if (isValid) {
            // Process the payment if all fields are valid
            console.log(`Payment method selected: ${paymentMethod}`);
            showSuccessModal(); 
        } else {
            console.log('Please correct the errors in the form.');
        }
    } else {
        const errorContainer = document.getElementById('paymentSelectionError');
        errorContainer.style.display = 'block';
    }
}


function closeAllModalsAndRedirect() {
    const modal = document.getElementById("modal");
    const modalSuccess = document.getElementById("modalSuccess");

    modal.style.display = "none";
    modalSuccess.style.display = "none";

    window.location.href = "frigorifico.html";
}

// Frigorifico

function saveAlimentsFrig () {
    localStorage.setItem("alimentosFrig", JSON.stringify(alimentosFrig));
}

function loadAlimentsFrig () {
    alimentosFrig = JSON.parse(localStorage.getItem("alimentosFrig")) || [];
}

function addAlimentsFrig (alimento) {
    loadAlimentsFrig();
    alimentosFrig.push(alimento);
    console.log(alimentosFrig);
    saveAlimentsFrig();
}

// Function to dynamically add items to the frigorifico container
function addItemsToFrigorifico() {
    const alimentsContainer = document.querySelector(".aliments-container");
    loadAlimentsFrig();

    const uniqueAlimentosFrig = [];

    for (let i = 0; i < alimentosFrig.length; i++) {
        const currentAlimento = alimentosFrig[i];
        const existingAlimento = uniqueAlimentosFrig.find(
            (alimento) => alimento.nome === currentAlimento.nome
        );

        if (!existingAlimento) {
            uniqueAlimentosFrig.push({ ...currentAlimento, quantity: 1 });
        } else {
            existingAlimento.quantity++;
        }
    }

    // Update the quantities in the original alimentosFrig array
    alimentosFrig.forEach((alimento) => {
        const matchingItem = uniqueAlimentosFrig.find(
            (uniqueAlimento) => uniqueAlimento.nome === alimento.nome
        );
        if (matchingItem) {
            alimento.quantity = matchingItem.quantity;
        }
    });

    for (let i = 0; i < uniqueAlimentosFrig.length; i++) {
        const alimento = uniqueAlimentosFrig[i];
        const squareDiv = document.createElement("div");
        squareDiv.className = "square";

        const nomeAlimento = document.createElement("p");
        nomeAlimento.textContent = alimento.nome;
        nomeAlimento.className = "alimento-name";

        const foodImg = document.createElement("img");
        foodImg.src = alimento.source;
        foodImg.alt = alimento.nome;
        foodImg.className = "food-img";

        squareDiv.appendChild(nomeAlimento);
        squareDiv.appendChild(foodImg);

        const infoButton = document.createElement("button");
        infoButton.className = "button";
        infoButton.innerHTML = '<i class="fa fa-info-circle" aria-hidden="true"></i>';
        infoButton.addEventListener("click", function () {
            console.log("Botão clicado");
            showModalAlimento(alimento);
        });

        squareDiv.appendChild(infoButton);

        alimentsContainer.appendChild(squareDiv);
    }
}
// Function to show the modal with information about the selected item
function showModalAlimento(alimento) {
    const textAlimentos = document.querySelector(".textAlimentos");

    textAlimentos.innerHTML = `
        <p style="font-weight: bold;">${alimento.nome}</p>
        <p>Calorias: ${alimento.calorias}</p>
        <p>Validade: ${alimento.validade}</p>
        <p>Quantidade: ${alimento.quantity}</p>
    `;

    const modal = document.getElementById("myModalAlimento");
    modal.style.display = "block";
}

// Function to hide the modal
function hideModal() {
    const modal = document.getElementById("myModalAlimento");
    modal.style.display = "none";
}

// Despensa

function saveAlimentsDesp () {
    localStorage.setItem("alimentosDesp", JSON.stringify(alimentosDesp));
}

function loadAlimentsDesp () {
    alimentosDesp = JSON.parse(localStorage.getItem("alimentosDesp")) || [];
}

function addAlimentsDesp (alimento) {
    loadAlimentsDesp();
    alimentosDesp.push(alimento);
    console.log(alimentosDesp);
    saveAlimentsDesp();
}

// Function to dynamically add items to the despensa container
function addItemsToDespensa() {
    const alimentsContainer = document.querySelector(".aliments-container");
    loadAlimentsDesp();

    const uniqueAlimentosDesp = [];

    for (let i = 0; i < alimentosDesp.length; i++) {
        const currentAlimento = alimentosDesp[i];
        const existingAlimento = uniqueAlimentosDesp.find(
            (alimento) => alimento.nome === currentAlimento.nome
        );

        if (!existingAlimento) {
            uniqueAlimentosDesp.push({ ...currentAlimento, quantity: 1 });
        } else {
            existingAlimento.quantity++;
        }
    }

    // Update the quantities in the original alimentosDesp array
    alimentosDesp.forEach((alimento) => {
        const matchingItem = uniqueAlimentosDesp.find(
            (uniqueAlimento) => uniqueAlimento.nome === alimento.nome
        );
        if (matchingItem) {
            alimento.quantity = matchingItem.quantity;
        }
    });

    for (let i = 0; i < uniqueAlimentosDesp.length; i++) {
        const alimento = uniqueAlimentosDesp[i];
        const squareDiv = document.createElement("div");
        squareDiv.className = "square";

        const nomeAlimento = document.createElement("p");
        nomeAlimento.textContent = alimento.nome;
        nomeAlimento.className = "alimento-name";

        const foodImg = document.createElement("img");
        foodImg.src = alimento.source;
        foodImg.alt = alimento.nome;
        foodImg.className = "food-img";

        squareDiv.appendChild(nomeAlimento);
        squareDiv.appendChild(foodImg);

        const infoButton = document.createElement("button");
        infoButton.className = "button";
        infoButton.innerHTML = '<i class="fa fa-info-circle" aria-hidden="true"></i>';
        infoButton.addEventListener("click", function () {
            console.log("Botão clicado");
            showModalAlimento(alimento);
        });

        squareDiv.appendChild(infoButton);

        alimentsContainer.appendChild(squareDiv);
    }
}

/* ------------------------------------------------------------------------- */
/*                                                       APPLICATION STARTUP */
/* ------------------------------------------------------------------------- */

window.addEventListener("load", principal);

function principal() {
    let path = window.location.pathname;
    let page = path.split("/").pop();
    console.log(page);

    const hasSaved = localStorage.getItem('hasSavedAlimentsFrig');
    const hasSavedDesp = localStorage.getItem('hasSavedAlimentsDesp');
    if (page == "listas.html") {
        localStorage.removeItem('checkedItems');
    }

    if (!hasSaved && page === "frigorifico.html") {
        saveAlimentsFrig();
        localStorage.setItem('hasSavedAlimentsFrig', 'true');
    }

    if (!hasSavedDesp && page === "despensa.html") {
        saveAlimentsDesp();
        localStorage.setItem('hasSavedAlimentsDesp', 'true');
    }

    switch (page) {
        case "frigorifico.html":
            addItemsToFrigorifico();
            break;
        case "despensa.html":
            addItemsToDespensa();
            break;
        case "carrinho.html":
            displayCartItems();
            break;
        default:
            console.log("Tá tudo lixado que não funcemina");
    }
}
