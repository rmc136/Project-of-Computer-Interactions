"use strict";

/* ------------------------------------------------------------------------- */
/*                                                          GLOBAL VARIABLES */
/* ------------------------------------------------------------------------- */

let routines = [];
let dispositivosRotina = [];
let dispositivo = null;


// Functions etc

function saveRoutines() {
    localStorage.setItem("routines", JSON.stringify(routines));
}

function loadRoutines() {
    routines = JSON.parse(localStorage.getItem("routines")) || [];
}

function displayRoutines() {
    const routineContainer = document.querySelector('.routine-container');
    routineContainer.innerHTML = ''; // Limpa o conteúdo anterior

    loadRoutines();

    if (routines.length === 0) {
        const emptyRoutine = document.createElement('p');
        emptyRoutine.className = 'routineEmpty';
        emptyRoutine.textContent = 'Ainda não há rotinas criadas, experimente criar uma nova';
        routineContainer.appendChild(emptyRoutine);
    } else {
        routines.forEach((routine, index) => {
            const routineSquare = document.createElement('div');
            routineSquare.className = 'square';

            const routineName = document.createElement('span');
            routineName.textContent = `Routine ${index + 1}: ${routine.nome}`;

            const infoButton = document.createElement('button');
            infoButton.className = 'button';
            infoButton.innerHTML = '<i class="fa fa-info-circle" aria-hidden="true"></i>';
            infoButton.addEventListener('click', function () {
                console.log('Info button clicked');
                showModalRoutine(routine); // Passa o objeto de rotina para a função do modal
            });

            routineSquare.appendChild(routineName);
            routineSquare.appendChild(infoButton);
            routineContainer.appendChild(routineSquare);
        });
    }
}

function showModalRoutine(routine) {
    const routineModal = document.getElementById('routineModal');
    const routineInfo = document.getElementById('routineInfo');

    routineInfo.innerHTML = ''; // Limpa as informações anteriores

    const routineName = document.createElement('h3');
    routineName.textContent = `Routine Name: ${routine.nome}`;
    routineInfo.appendChild(routineName);
    routineInfo.appendChild(document.createElement('br'));

    if (routine.dispositivos && routine.dispositivos.length > 0) {
        const devicesHeader = document.createElement('h4');
        devicesHeader.textContent = 'Devices:';
        routineInfo.appendChild(devicesHeader);

        const devicesContainer = document.createElement('div');

        routine.dispositivos.forEach((device, index) => {
            const deviceButton = document.createElement('button');
            deviceButton.textContent = device.nome;
            deviceButton.onclick = () => showDeviceConfig(routine, index);
            devicesContainer.appendChild(deviceButton);
        });

        routineInfo.appendChild(devicesContainer);
    } else {
        const noDevicesText = document.createElement('p');
        noDevicesText.textContent = 'No devices associated with this routine.';
        routineInfo.appendChild(noDevicesText);
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Apagar Rotina';
    deleteButton.onclick = () => deleteRoutine(routine.id);
    routineInfo.appendChild(deleteButton);

    routineModal.style.display = 'block';
}

function showDeviceConfig(routine, deviceIndex) {
    const deviceConfigModal = document.getElementById('deviceConfigModal');
    const deviceConfigInfo = document.getElementById('deviceConfigInfo');

    deviceConfigInfo.innerHTML = ''; // Clear previous configurations

    const device = routine.dispositivos[deviceIndex];
    const config = routine.config[deviceIndex]; // Get the corresponding config

    const deviceName = document.createElement('h3');
    deviceName.textContent = `Device: ${device.nome}`;
    deviceConfigInfo.appendChild(deviceName);
    deviceConfigInfo.appendChild(document.createElement('br'));

    // Display the configuration details
    if (config && config.ligarTime) {
        const ligarTimeConfig = document.createElement('p');
        ligarTimeConfig.textContent = `Hora para ligar: ${config.ligarTime}`;
        deviceConfigInfo.appendChild(ligarTimeConfig);
    }

    if (config && config.desligarTime) {
        const desligarTimeConfig = document.createElement('p');
        desligarTimeConfig.textContent = `Hora para desligar: ${config.desligarTime}`;
        deviceConfigInfo.appendChild(desligarTimeConfig);
    }

    if (config && config.temperatura) {
        const temperatureConfig = document.createElement('p');
        temperatureConfig.textContent = `Temperatura: ${config.temperatura}`;
        deviceConfigInfo.appendChild(temperatureConfig);
    }

    if (config && config.selectedCoffee) {
        const selectedCoffeeConfig = document.createElement('p');
        selectedCoffeeConfig.textContent = `Bebida a preparar: ${config.selectedCoffee}`;
        deviceConfigInfo.appendChild(selectedCoffeeConfig);
    }

    if (config && config.volumeLevel) {
        const volumeLevelConfig = document.createElement('p');
        volumeLevelConfig.textContent = `Volume: ${config.volumeLevel}`;
        deviceConfigInfo.appendChild(volumeLevelConfig);
    }

    if (config && config.selectedMusic) {
        const selectedMusicConfig = document.createElement('p');
        selectedMusicConfig.textContent = `Música selecionada: ${config.selectedMusic}`;
        deviceConfigInfo.appendChild(selectedMusicConfig);
    }

    if (config && config.openingTime) {
        const openingTimeConfig = document.createElement('p');
        openingTimeConfig.textContent = `Hora para abrir: ${config.openingTime}`;
        deviceConfigInfo.appendChild(openingTimeConfig);
    }

    if (config && config.openingPercentage) {
        const openingPercentageConfig = document.createElement('p');
        openingPercentageConfig.textContent = `Percentagem de abertura: ${config.openingPercentage}`;
        deviceConfigInfo.appendChild(openingPercentageConfig);
    }

    if (config && config.closingTime) {
        const closingTimeConfig = document.createElement('p');
        closingTimeConfig.textContent = `Hora para fechar: ${config.closingTime}`;
        deviceConfigInfo.appendChild(closingTimeConfig);
    }

    if (config && config.regulatorEnabled) {
        const regulatorEnabledConfig = document.createElement('p');
        regulatorEnabledConfig.textContent = `Regular a temperatura: sim`;
        deviceConfigInfo.appendChild(regulatorEnabledConfig);
    }

    if (config && config.temperatureRegulate) {
        const temperatureRegulateConfig = document.createElement('p');
        temperatureRegulateConfig.textContent = `Regular temperatura a: ${config.temperatureRegulate}`;
        deviceConfigInfo.appendChild(temperatureRegulateConfig);
    }

    if (config && config.selectedChannel) {
        const selectedChannelConfig = document.createElement('p');
        selectedChannelConfig.textContent = `Canal selecionado: ${config.selectedChannel}`;
        deviceConfigInfo.appendChild(selectedChannelConfig);
    }

    deviceConfigModal.style.display = 'block';
}

function closeRoutineModal() {
    const routineModal = document.getElementById('routineModal');
    routineModal.style.display = 'none';
}

function closeDeviceConfigModal() {
    const deviceConfigModal = document.getElementById('deviceConfigModal');
    deviceConfigModal.style.display = 'none';
}

window.addEventListener("load", principal);

function principal() {
    let path = window.location.pathname;
    let page = path.split("/").pop();
    console.log(page);

    const hasSaved = localStorage.getItem('hasSavedRoutines');

    if (!hasSaved && page === "rotina.html") {
        saveRoutines();
        localStorage.setItem('hasSavedRoutines', 'true');
    }

    switch (page) {
        case "rotina.html":
            displayRoutines();
            break;
        default:
            console.log("Tá tudo lixado que não funcemina");
    }
}

function deleteRoutine(routineId) {
    const index = routines.findIndex(routine => routine.id === routineId);
    if (index !== -1) {
        const confirmDelete = confirm(`Are you sure you want to delete routine with ID ${routineId}?`);
        if (confirmDelete) {
            console.log(`Rotina com ID ${routineId} excluída.`);
            routines.splice(index, 1);
            saveRoutines();
            displayRoutines(); // Atualiza a exibição após a exclusão

            // Exibe uma mensagem de confirmação na interface
            alert(`Rotina com ID ${routineId} excluída com sucesso!`);

            closeRoutineModal(); // Fecha o modal após a exclusão
        }
    }
}


function deleteCurrentRoutine(routineId) {
    deleteRoutine(routineId);
}

function validateRoutineName() {
    const routineName = document.getElementById('routineName').value.trim();
    if (routineName === '') {
        alert('Por favor, insira um nome para a rotina.');
        return false; // Impede o envio do formulário se o nome estiver vazio
    }
    return true; // Permite o envio do formulário se um nome for inserido
}