"use strict";

/* ------------------------------------------------------------------------- */
/*                                                                 CONSTANTS */
/* ------------------------------------------------------------------------- */

const dispositivos = [
    new Dispositivo("Estores", ["estado", "regulador", "temperatura"], ["Sala", "Quarto", "Cozinha", "Escritório"], "images/estores.png"),
    new Dispositivo("Despertador", ["estado", "musica"], ["Quarto"], "images/despertador.png"),
    new Dispositivo("Cafeteira", ["estado", "produto"], ["Cozinha"], "images/cafeteira.png"),
    new Dispositivo("Aquecedor", ["estado", "temperatura"], ["Sala", "Quarto", "Cozinha", "Escritório", "Casa de banho"], "images/aquecedor.png"),
    new Dispositivo("TV", ["estado", "canal"], ["Sala", "Quarto"], "images/tv.png"),
    new Dispositivo("Colunas", ["estado", "volume"], ["Sala", "Quarto"], "images/coluna.png"),
];

/* ------------------------------------------------------------------------- */
/*                                                          GLOBAL VARIABLES */
/* ------------------------------------------------------------------------- */

let routines = [];
let dispositivosRotina = [];
let configDispRotina = [];

/* ------------------------------------------------------------------------- */
/*                                                      OBJECTS CONSTRUCTORS */
/* ------------------------------------------------------------------------- */

function Dispositivo(nome, configuracoes, local, source) {
    this.nome = nome
    this.configuracoes = configuracoes
    this.local = local
    this.source = source
}

function generateUniqueId() {
    return Math.floor(Math.random() * 15) + 1; // Gera um ID numérico aleatório de 1 a 15
}

function Rotina(nome, dispositivos, config) {
    this.id = generateUniqueId(); 
    this.nome = nome;
    this.dispositivos = dispositivos;
    this.config = config;
}

// Functions etc

function saveRoutines() {
    localStorage.setItem("routines", JSON.stringify(routines));
}

function loadRoutines() {
    routines = JSON.parse(localStorage.getItem("routines")) || [];
}

// Create dropdown function
function createDropdown(options) {
    const dropdown = document.createElement('select');
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        dropdown.appendChild(optionElement);
    });
    return dropdown;
}

function configEstado (configElement, mode) {
    if (mode === 1) {
        const ligarLabel = document.createElement('span');
        ligarLabel.textContent = 'Hora para ligar: ';
        const ligarTime = document.createElement('input');
        ligarTime.type = 'time';
        
        const desligarLabel = document.createElement('span');
        desligarLabel.textContent = 'Hora para desligar: ';
        const desligarTime = document.createElement('input');
        desligarTime.type = 'time';

        configElement.appendChild(ligarLabel);
        configElement.appendChild(ligarTime);
        configElement.appendChild(document.createElement('br'));
        configElement.appendChild(document.createElement('br'));
        configElement.appendChild(desligarLabel);
        configElement.appendChild(desligarTime);
        configElement.appendChild(document.createElement('br'));
        configElement.appendChild(document.createElement('br'));
    } else if (mode === 2) {
        const ligarLabel = document.createElement('span');
        ligarLabel.textContent = 'Hora para ligar: ';
        const ligarTime = document.createElement('input');
        ligarTime.type = 'time';

        configElement.appendChild(ligarLabel);
        configElement.appendChild(ligarTime);
        configElement.appendChild(document.createElement('br'));
        configElement.appendChild(document.createElement('br'));
    }
}

function configEstadoEstores(configElement) {
    const ligarLabel = document.createElement('span');
    ligarLabel.textContent = 'Hora para abrir: ';
    const ligarTime = document.createElement('input');
    ligarTime.type = 'time';

    configElement.appendChild(ligarLabel);
    configElement.appendChild(ligarTime);
    configElement.appendChild(document.createElement('br'));
    configElement.appendChild(document.createElement('br'));

    const aberturaLabel = document.createElement('span');
    aberturaLabel.textContent = 'Abertura: ';
    const aberturaContainer = document.createElement('div');
    aberturaContainer.classList.add('range-control'); // Apply the same class for consistent styling

    const aberturaValue = document.createElement('span');
    const aberturaRange = document.createElement('input');

    aberturaRange.type = 'range';
    aberturaRange.min = '10';
    aberturaRange.max = '100';
    aberturaRange.value = '50'; // Set a default value if needed

    aberturaValue.textContent = aberturaRange.value + '%'; // Display the initial value

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.classList.add('control-button');
    decreaseButton.id = 'decreaseAbertura'; // Set an ID if needed

    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.classList.add('control-button');
    increaseButton.id = 'increaseAbertura'; // Set an ID if needed

    aberturaRange.addEventListener('input', () => {
        aberturaValue.textContent = aberturaRange.value + '%';
    });

    decreaseButton.addEventListener('click', () => {
        if (parseInt(aberturaRange.value) > parseInt(aberturaRange.min)) {
            aberturaRange.value = parseInt(aberturaRange.value) - 1;
            aberturaValue.textContent = aberturaRange.value + '%';
        }
    });

    increaseButton.addEventListener('click', () => {
        if (parseInt(aberturaRange.value) < parseInt(aberturaRange.max)) {
            aberturaRange.value = parseInt(aberturaRange.value) + 1;
            aberturaValue.textContent = aberturaRange.value + '%';
        }
    });

    aberturaContainer.appendChild(aberturaLabel);
    aberturaContainer.appendChild(aberturaValue);
    aberturaContainer.appendChild(document.createElement('br'));
    aberturaContainer.appendChild(decreaseButton);
    aberturaContainer.appendChild(aberturaRange);
    aberturaContainer.appendChild(increaseButton);

    configElement.appendChild(aberturaContainer);

    const desligarLabel = document.createElement('span');
    desligarLabel.textContent = 'Hora para fechar: ';
    const desligarTime = document.createElement('input');
    desligarTime.type = 'time';

    configElement.appendChild(desligarLabel);
    configElement.appendChild(desligarTime);
    configElement.appendChild(document.createElement('br'));
    configElement.appendChild(document.createElement('br'));
}


function configRegulador(configElement) {
    const regulateCheckbox = document.createElement('input');
    regulateCheckbox.type = 'checkbox';
    regulateCheckbox.id = 'regulateCheckbox';
    const regulateLabel = document.createElement('label');
    regulateLabel.textContent = 'Regular temperatura';
    regulateLabel.htmlFor = 'regulateCheckbox';
    configElement.appendChild(regulateCheckbox);
    configElement.appendChild(regulateLabel);

    // Event listener for the checkbox change event
    regulateCheckbox.addEventListener('change', function () {
        if (this.checked) {
            configTemperatura(configElement); // Call the configTemperatura function if checkbox is checked
        } else {
            // Remove the temperature configuration if checkbox is unchecked
            const temperatureContainer = configElement.querySelector('#rangeTemp');
            if (temperatureContainer) {
                configElement.removeChild(temperatureContainer);
            }
        }
    });
}

function configTemperatura (configElement) {
    const temperatureContainer = document.createElement('div');
    temperatureContainer.classList.add('range-control');
    temperatureContainer.id = 'rangeTemp';
    const temperatureLabel = document.createElement('span');
    const temperatureValue = document.createElement('span');
    const temperatureRange = document.createElement('input');
    
    temperatureRange.type = 'range';
    temperatureRange.min = '15';
    temperatureRange.max = '30';
    temperatureRange.value = '15'; // Set the default temperature
    temperatureRange.classList.add('onVis');
    temperatureRange.id = 'temperatureSlider';

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.classList.add('control-button');
    decreaseButton.id = 'decreaseTemperature';

    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.classList.add('control-button');
    increaseButton.id = 'increaseTemperature';

    temperatureLabel.textContent = 'Temperatura: ';
    temperatureValue.textContent = temperatureRange.value + '°C';

    temperatureRange.addEventListener('input', () => {
        temperatureValue.textContent = temperatureRange.value + '°C';
    });

    decreaseButton.addEventListener('click', () => {
        if (parseInt(temperatureRange.value) > parseInt(temperatureRange.min)) {
            temperatureRange.value = parseInt(temperatureRange.value) - 1;
            temperatureValue.textContent = temperatureRange.value + '°C';
        }
    });

    increaseButton.addEventListener('click', () => {
        if (parseInt(temperatureRange.value) < parseInt(temperatureRange.max)) {
            temperatureRange.value = parseInt(temperatureRange.value) + 1;
            temperatureValue.textContent = temperatureRange.value + '°C';
        }
    });

    temperatureContainer.appendChild(temperatureLabel);
    temperatureContainer.appendChild(temperatureValue);
    temperatureContainer.appendChild(document.createElement('br'));
    temperatureContainer.appendChild(decreaseButton);
    temperatureContainer.appendChild(temperatureRange);
    temperatureContainer.appendChild(increaseButton);

    configElement.appendChild(temperatureContainer);
}

function configMusica (configElement) {
    const musicDropdown = createDropdown(['Happy', 'Birds', 'Stars']); // Replace with your song names
    configElement.appendChild(musicDropdown);
}

function configProduto (configElement) {
    const coffeeDropdown = createDropdown(['Expresso', 'Latte', 'Cappucinno']); // Replace with your coffee names
    configElement.appendChild(coffeeDropdown);
}

function configCanal (configElement) {
    const tvDropdown = createDropdown(['Canal 1', 'Canal 2', 'Canal 3']); // Replace with your TV shows
    configElement.appendChild(tvDropdown);
}

function configVolume(configElement) {
    const volumeContainer = document.createElement('div');
    volumeContainer.classList.add('range-control'); // Use the same class
    volumeContainer.id = 'rangeVolume'; // Set an ID if needed

    const volumeLabel = document.createElement('span');
    const volumeValue = document.createElement('span');
    const volumeRange = document.createElement('input');

    volumeRange.type = 'range';
    volumeRange.min = '0';
    volumeRange.max = '15';
    volumeRange.value = '0'; // Set the default volume
    volumeRange.id = 'volumeSlider'; // Set an ID if needed

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.classList.add('control-button');
    decreaseButton.id = 'decreaseVolume'; // Set an ID if needed

    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.classList.add('control-button');
    increaseButton.id = 'increaseVolume'; // Set an ID if needed

    volumeLabel.textContent = 'Volume: ';
    volumeValue.textContent = volumeRange.value;

    volumeRange.addEventListener('input', () => {
        volumeValue.textContent = volumeRange.value;
    });

    decreaseButton.addEventListener('click', () => {
        if (parseInt(volumeRange.value) > parseInt(volumeRange.min)) {
            volumeRange.value = parseInt(volumeRange.value) - 1;
            volumeValue.textContent = volumeRange.value;
        }
    });

    increaseButton.addEventListener('click', () => {
        if (parseInt(volumeRange.value) < parseInt(volumeRange.max)) {
            volumeRange.value = parseInt(volumeRange.value) + 1;
            volumeValue.textContent = volumeRange.value;
        }
    });

    volumeContainer.appendChild(volumeLabel);
    volumeContainer.appendChild(volumeValue);
    volumeContainer.appendChild(document.createElement('br'));
    volumeContainer.appendChild(decreaseButton);
    volumeContainer.appendChild(volumeRange);
    volumeContainer.appendChild(increaseButton);

    configElement.appendChild(volumeContainer);
}


document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.deviceButtonDeac');

    function toggleClass() {
        this.classList.toggle('deviceButtonActiv');
        this.classList.toggle('deviceButtonDeac');
        if (this.classList.contains('deviceButtonActiv')) {
            this.style.border = '4px solid green';
        } else {
            this.style.border = 'none'; // Change this to whatever the default border style is
        }
    }

    function openConfigModal() {
        if (this.classList.contains('deviceButtonActiv')) {
            const configModal = document.getElementById('configModal');
            const configurations = document.getElementById('configurations');
            configurations.innerHTML = ''; // Clear previous configurations
            const closeButton = document.createElement('button');
            closeButton.textContent = 'x';
            closeButton.classList.add('close-button'); // Add CSS class to the button
            closeButton.onclick = closeConfigModal;

            const selectedDeviceName = this.textContent; // Get the device name from the button text
            const selectedDevice = dispositivos.find(device => device.nome === selectedDeviceName);

            if (selectedDevice) {
                const configElement = document.createElement('div');

                switch (this.textContent) {
                    case 'Aquecedor':
                        configEstado(configElement, 1);
                        configTemperatura(configElement);
                        break;
                    case 'Cafeteira':
                        configEstado(configElement, 2);
                        configProduto(configElement);
                        break;
                    case 'Colunas':
                        configEstado(configElement, 1);
                        configVolume(configElement);
                        break;
                    case 'Despertador':
                        configEstado(configElement, 2);
                        configMusica(configElement);
                        break;
                    case 'Estores':
                        configEstadoEstores(configElement);
                        configRegulador(configElement);
                        break;
                    case 'TV':
                        configEstado(configElement, 1);
                        configCanal(configElement);
                        break; 
                    default:
                        configElement.textContent = 'Unknown configuration';
                }

                configurations.appendChild(configElement);

                const saveButton = document.createElement('button');
                saveButton.textContent = 'Save';
                switch (this.textContent) {
                    case 'Aquecedor':
                        saveButton.onclick = () => {
                            // Logic to save configurations
                            const configElement = configurations.firstChild; // Assuming the configElement is the first child of configurations
            
                            // Accessing values from the configuration elements
                            const ligarTimeValue = configElement.querySelector('input[type="time"]:nth-of-type(1)').value;
                            const desligarTimeValue = configElement.querySelector('input[type="time"]:nth-of-type(2)').value;
                            const temperaturaValue = configElement.querySelector('#temperatureSlider').value;
        
                            // Create an object to store the values
                            const savedValues = {
                                ligarTime: ligarTimeValue,
                                desligarTime: desligarTimeValue,
                                temperatura: temperaturaValue,
                            };

                            const existingIndex = dispositivosRotina.findIndex(device => device.nome === 'Aquecedor');

                            if (existingIndex !== -1) {
                                // Update existing "Aquecedor" configurations
                                configDispRotina[existingIndex] = savedValues;
                        
                                console.log("Updated existing 'Aquecedor' configurations:");
                                console.log(configDispRotina);
                            } else {
                                // If "Aquecedor" does not exist, add it along with configurations
                                dispositivosRotina.push(dispositivos.find(device => device.nome === 'Aquecedor'));
                                configDispRotina.push(savedValues);
                        
                                console.log("Added 'Aquecedor' device with configurations:");
                                console.log(dispositivosRotina);
                                console.log(configDispRotina);
                            }

                            console.log(savedValues);
        
                            // Close the modal after saving configurations
                            configModal.style.display = 'none';
                        };
                        break;
                    case 'Cafeteira':
                        saveButton.onclick = () => {
                            const configElement = configurations.firstChild; // Assuming the configElement is the first child of configurations

                            // Accessing values from the configuration elements
                            const ligarTimeValue = configElement.querySelector('input[type="time"]:nth-of-type(1)').value;
                            
                            let selectedCoffee = null;
                        
                            // For "Cafeteira", check if the configProduto function has been called
                            const coffeeDropdown = configElement.querySelector('select');
                            if (coffeeDropdown) {
                                selectedCoffee = coffeeDropdown.value;
                            }
                        
                            // Create an object to store the values
                            const savedValues = {
                                ligarTime: ligarTimeValue,
                                selectedCoffee: selectedCoffee,
                            };

                            const existingIndex = dispositivosRotina.findIndex(device => device.nome === 'Cafeteira');

                            if (existingIndex !== -1) {
                                configDispRotina[existingIndex] = savedValues;
                        
                                console.log("Updated existing 'Cafeteira' configurations:");
                                console.log(configDispRotina);
                            } else {
                                dispositivosRotina.push(dispositivos.find(device => device.nome === 'Cafeteira'));
                                configDispRotina.push(savedValues);
                        
                                console.log("Added 'Cafeteira' device with configurations:");
                                console.log(dispositivosRotina);
                                console.log(configDispRotina);
                            }
                            console.log(savedValues);
                        
                            // Close the modal after saving configurations
                            configModal.style.display = 'none';
                        };
                        
                        break;
                    case 'Colunas':
                        saveButton.onclick = () => {
                            const configElement = configurations.firstChild; // Assuming the configElement is the first child of configurations

                            // Accessing values from the configuration elements
                            const ligarTimeValue = configElement.querySelector('input[type="time"]:nth-of-type(1)').value;
                            const desligarTimeValue = configElement.querySelector('input[type="time"]:nth-of-type(2)').value;
                            
                            let volumeLevel = null;
                        
                            // For "Colunas", check if the configVolume function has been called
                            const volumeRange = configElement.querySelector('input[type="range"]');
                            if (volumeRange) {
                                volumeLevel = volumeRange.value;
                            }
                        
                            // Create an object to store the values
                            const savedValues = {
                                ligarTime: ligarTimeValue,
                                desligarTime: desligarTimeValue,
                                volumeLevel: volumeLevel,
                            };

                            const existingIndex = dispositivosRotina.findIndex(device => device.nome === 'Colunas');
                            
                            if (existingIndex !== -1) {
                                configDispRotina[existingIndex] = savedValues;
                        
                                console.log("Updated existing 'Colunas' configurations:");
                                console.log(configDispRotina);
                            } else {
                                dispositivosRotina.push(dispositivos.find(device => device.nome === 'Colunas'));
                                configDispRotina.push(savedValues);
                        
                                console.log("Added 'Colunas' device with configurations:");
                                console.log(dispositivosRotina);
                                console.log(configDispRotina);
                            }
                            console.log(savedValues);
                        
                            // Close the modal after saving configurations
                            configModal.style.display = 'none';
                        };
                        
                        break;
                    case 'Despertador':
                        saveButton.onclick = () => {
                            const configElement = configurations.firstChild; // Assuming the configElement is the first child of configurations

                            // Accessing values from the configuration elements
                            const ligarTimeValue = configElement.querySelector('input[type="time"]:nth-of-type(1)').value;
                            
                            let selectedMusic = null;
                        
                            // For "Despertador", check if the configMusica function has been called
                            const musicDropdown = configElement.querySelector('select');
                            if (musicDropdown) {
                                selectedMusic = musicDropdown.value;
                            }
                        
                            // Create an object to store the values
                            const savedValues = {
                                ligarTime: ligarTimeValue,
                                selectedMusic: selectedMusic,
                            };

                            const existingIndex = dispositivosRotina.findIndex(device => device.nome === 'Despertador');
                            
                            if (existingIndex !== -1) {
                                configDispRotina[existingIndex] = savedValues;
                        
                                console.log("Updated existing 'Despertador' configurations:");
                                console.log(configDispRotina);
                            } else {
                                dispositivosRotina.push(dispositivos.find(device => device.nome === 'Despertador'));
                                configDispRotina.push(savedValues);
                        
                                console.log("Added 'Despertador' device with configurations:");
                                console.log(dispositivosRotina);
                                console.log(configDispRotina);
                            }
                            console.log(savedValues);
                        
                            // Close the modal after saving configurations
                            configModal.style.display = 'none';
                        };
                        
                        break;
                    case 'Estores':
                        saveButton.onclick = () => {
                            const configElement = configurations.firstChild; // Assuming the configElement is the first child of configurations
                            
                            let openingTime = null;
                            let openingPercentage = null;
                            let closingTime = null;
                            let regulatorEnabled = false;
                        
                            // For "Estores", check if the configEstadoEstores function has been called
                            const abrirTimeInput = configElement.querySelector('input[type="time"]:nth-of-type(1)');
                            const abrirPercentageInput = configElement.querySelector('input[type="range"]');
                            const fecharTimeInput = configElement.querySelector('input[type="time"]:nth-of-type(2)');
                            if (abrirTimeInput && abrirPercentageInput && fecharTimeInput) {
                                openingTime = abrirTimeInput.value;
                                openingPercentage = abrirPercentageInput.value;
                                closingTime = fecharTimeInput.value;
                            }

                            let temperatureValue = null;

                            // Check if the configRegulador function has been called for "Estores"
                            const regulateCheckbox = document.getElementById('regulateCheckbox');
                            if (regulateCheckbox && regulateCheckbox.checked) {
                                regulatorEnabled = true;
                            
                                // Get the temperature value if it's available
                                const temperatureRange = configElement.querySelector('#temperatureSlider');
                            
                                if (temperatureRange) {
                                    temperatureValue = temperatureRange.value;
                                }
                            }
                        
                            // Create an object to store the values
                            const savedValues = {
                                openingTime: openingTime,
                                openingPercentage: openingPercentage,
                                closingTime: closingTime,
                                regulatorEnabled: regulatorEnabled,
                                temperatureRegulate: temperatureValue,
                            };

                            const existingIndex = dispositivosRotina.findIndex(device => device.nome === 'Estores');
                            
                            if (existingIndex !== -1) {
                                configDispRotina[existingIndex] = savedValues;
                        
                                console.log("Updated existing 'Estores' configurations:");
                                console.log(configDispRotina);
                            } else {
                                dispositivosRotina.push(dispositivos.find(device => device.nome === 'Estores'));
                                configDispRotina.push(savedValues);
                        
                                console.log("Added 'Estores' device with configurations:");
                                console.log(dispositivosRotina);
                                console.log(configDispRotina);
                            }
                            console.log(savedValues);
                        
                            // Close the modal after saving configurations
                            configModal.style.display = 'none';
                        };
                        
                        break;
                    case 'TV':
                        saveButton.onclick = () => {
                            const configElement = configurations.firstChild; // Assuming the configElement is the first child of configurations

                            // Accessing values from the configuration elements
                            const ligarTimeValue = configElement.querySelector('input[type="time"]:nth-of-type(1)').value;
                            const desligarTimeValue = configElement.querySelector('input[type="time"]:nth-of-type(2)').value;
                            
                            let selectedChannel = null;
                        
                            // For "TV", check if the configCanal function has been called
                            const tvDropdown = configElement.querySelector('select');
                            if (tvDropdown) {
                                selectedChannel = tvDropdown.value;
                            }
                        
                            // Create an object to store the values
                            const savedValues = {
                                ligarTime: ligarTimeValue,
                                desligarTime: desligarTimeValue,
                                selectedChannel: selectedChannel,
                            };

                            const existingIndex = dispositivosRotina.findIndex(device => device.nome === 'TV');

                            if (existingIndex !== -1) {
                                configDispRotina[existingIndex] = savedValues;
                        
                                console.log("Updated existing 'TV' configurations:");
                                console.log(configDispRotina);
                            } else {
                                dispositivosRotina.push(dispositivos.find(device => device.nome === 'TV'));
                                configDispRotina.push(savedValues);
                        
                                console.log("Added 'TV' device with configurations:");
                                console.log(dispositivosRotina);
                                console.log(configDispRotina);
                            }
                            console.log(savedValues);
                        
                            // Close the modal after saving configurations
                            configModal.style.display = 'none';
                        };
                        
                        break; 
                    default:
                        console.log("atoa");
                }
                
                configurations.appendChild(closeButton);
                configurations.appendChild(document.createElement('br'));
                // Append the Save button to the configurations
                configurations.appendChild(saveButton);
            }
            configModal.style.display = 'block';
        }
    }

    // Add event listeners to each button
    buttons.forEach(button => {
        button.addEventListener('click', toggleClass);
        button.addEventListener('click', openConfigModal);
    });

    // Function to close the modal
    function closeConfigModal() {
        const configModal = document.getElementById('configModal');
        configModal.style.display = 'none';
    }
});

function removeDeviceIfExist(deviceName) {
    const indexToRemove = dispositivosRotina.findIndex(device => device.nome === deviceName);

    if (indexToRemove !== -1) {
        dispositivosRotina.splice(indexToRemove, 1);
        configDispRotina.splice(indexToRemove, 1);
    }
}

function saveNewRoutine() {
    const routineName = document.getElementById('routineNameInput').value;

    const buttons = document.querySelectorAll('.deviceButtonDeac');

    buttons.forEach(button => {
        const deviceName = button.textContent.trim();
        removeDeviceIfExist(deviceName);
    });

    const newRoutine = new Rotina (routineName, dispositivosRotina, configDispRotina);

    loadRoutines();
    routines.push(newRoutine)
    saveRoutines();
}