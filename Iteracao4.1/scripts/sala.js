// Obtendo referências para os elementos do DOM
const toggleButton = document.getElementById("toggleButton");
const temperatureValue = document.getElementById("temperatureValue");
const speedValue = document.getElementById("speedValue");
const temperatureSlider = document.getElementById("temperatureSlider");
const speedSlider = document.getElementById("speedSlider");
const toggleTextElements = document.querySelectorAll(".onVis");
const closeModalButton = document.querySelector(".close");
const saveChangesButton = document.getElementById("saveChangesButton");
const decreaseTemperatureButton = document.getElementById("decreaseTemperature");
const increaseTemperatureButton = document.getElementById("increaseTemperature");
const decreaseSpeedButton = document.getElementById("decreaseSpeed");
const increaseSpeedButton = document.getElementById("increaseSpeed");
const acStatus = document.getElementById("acStatus");



// Verificar se o estado está armazenado no localStorage
let isOn = localStorage.getItem("isOn") === "true";
let temperature = parseInt(localStorage.getItem("temperature")) || 15;
let speed = parseInt(localStorage.getItem("speed")) || 1;
let hasChanges = false;

// Adicionando o evento de clique no botão de fechar do modal
if (closeModalButton) {
  closeModalButton.addEventListener("click", () => {
    // Verificar se houve alterações
    if (!hasChanges) {
      isOn = localStorage.getItem("isOn") === "true";
      temperature = parseInt(localStorage.getItem("temperature")) || 0;
      speed = parseInt(localStorage.getItem("speed")) || 0;

      // Atualizar os valores no modal com os valores armazenados
      updateToggleButton();
      updateTextVisibility();
      updateTemperatureValue();
      updateSpeedValue();
      temperatureSlider.value = temperature;
      speedSlider.value = speed;
    } else {
      // Armazenar as alterações feitas no localStorage se houver
      localStorage.setItem("isOn", isOn);
      localStorage.setItem("temperature", temperature);
      localStorage.setItem("speed", speed);
    }

    hasChanges = false;
    saveChangesButton.setAttribute("disabled", true);
  });
}

// Adicionando eventos de clique e input nos elementos do modal
toggleButton.addEventListener("click", () => {
  isOn = !isOn; // Invertendo o estado (ON para OFF e vice-versa)
  hasChanges = true;
  updateToggleButton();
  updateTextVisibility();
  saveChangesButton.removeAttribute("disabled");
});

temperatureSlider.addEventListener("input", () => {
  temperature = parseInt(temperatureSlider.value);
  hasChanges = true;
  updateTemperatureValue();
  saveChangesButton.removeAttribute("disabled");
});

speedSlider.addEventListener("input", () => {
  speed = parseInt(speedSlider.value);
  hasChanges = true;
  updateSpeedValue();
  saveChangesButton.removeAttribute("disabled");
});

// Adicionando o evento de clique no botão "Pronto"
saveChangesButton.addEventListener("click", () => {
  const confirmation = confirm;
  if (confirmation) {
    window.location.reload();
    // Lógica para salvar as alterações feitas no ar-condicionado
    // Adicione a lógica aqui para salvar as alterações, por exemplo, enviar os dados para o servidor, etc.

    // Fechar o pop-up após salvar as alterações
    const closeButton = document.querySelector(".close");
    if (closeButton) {
      closeButton.click(); // Simular o clique no botão de fechar o pop-up
    }
  }
});

// Funções auxiliares para atualizar os elementos do modal
function updateToggleButton() {
  if (isOn) {
    toggleButton.textContent = "OFF";
    toggleButton.classList.remove("off");
    toggleButton.classList.add("on");
    decreaseTemperatureButton.style.display = "flex";
    increaseTemperatureButton.style.display = "flex";
    increaseSpeedButton.style.display = "flex";
    decreaseSpeedButton.style.display = "flex";
    acStatusText.textContent = `AC Ligado`;

  } else {
    toggleButton.textContent = "ON";
    toggleButton.classList.remove("on");
    toggleButton.classList.add("off");
    decreaseTemperatureButton.style.display = "none";
    increaseTemperatureButton.style.display = "none";
    increaseSpeedButton.style.display = "none";
    decreaseSpeedButton.style.display = "none";
    acStatusText.textContent = "AC  Desligado";

  }
}


function updateTextVisibility() {
  for (const element of toggleTextElements) {
    if (isOn) {
      element.style.display = "block"; // Mostrar o texto quando o botão estiver ligado
    } else {
      element.style.display = "none"; // Ocultar o texto quando o botão estiver desligado
    }
  }
}

function updateTemperatureValue() {
  temperatureValue.textContent = temperature + "°C";
}

function updateSpeedValue() {
  speedValue.textContent = speed + " RPM";
}

// Chamando as funções de atualização dos elementos do modal
updateToggleButton();
updateTextVisibility();
updateTemperatureValue();
updateSpeedValue();
temperatureSlider.value = temperature;
speedSlider.value = speed;

decreaseTemperatureButton.addEventListener("click", () => {
  if (temperature > 15) {
    temperature--;
    temperatureSlider.value = temperature;
    hasChanges = true;
    updateTemperatureValue();
    saveChangesButton.removeAttribute("disabled");
  }
});

increaseTemperatureButton.addEventListener("click", () => {
  if (temperature < 30) {
    temperature++;
    temperatureSlider.value = temperature;
    hasChanges = true;
    updateTemperatureValue();
    saveChangesButton.removeAttribute("disabled");
  }
});

decreaseSpeedButton.addEventListener("click", () => {
  if (speed > 1) {
    speed--;
    speedSlider.value = speed;
    hasChanges = true;
    updateSpeedValue();
    saveChangesButton.removeAttribute("disabled");
  }
});

increaseSpeedButton.addEventListener("click", () => {
  if (speed < 5) {
    speed++;
    speedSlider.value = speed;
    hasChanges = true;
    updateSpeedValue();
    saveChangesButton.removeAttribute("disabled");
  }
});





// Obtendo referências para os elementos do DOM relacionados à TV
const toggleTVButton = document.getElementById("toggleTVButton");
const tvStatusText = document.getElementById("tvStatusText"); // Elemento para exibir o status da TV

// Verificar se o estado da TV está armazenado no localStorage
let isTVOn = localStorage.getItem("isTVOn") === "true";
let tvChanges = false;

// Função para atualizar o estado da TV e a interface do usuário
function updateTVStatus() {
  if (isTVOn) {
    tvStatusText.textContent = "TV Ligada";
    // Adicionar lógica visual para indicar que a TV está ligada
  } else {
    tvStatusText.textContent = "TV Desligada";
    // Adicionar lógica visual para indicar que a TV está desligada
  }
}

// Adicionando o evento de clique no botão de ligar/desligar da TV
toggleTVButton.addEventListener("click", () => {
  isTVOn = !isTVOn; // Alternar o estado da TV
  tvChanges = true; // Indicar que houve mudanças na TV
  updateTVStatus(); // Atualizar a interface do usuário com o novo estado
});

// Adicionando o evento de clique no botão "Pronto" para a TV
saveTVChangesButton.addEventListener("click", () => {
  const confirmation = confirm("Deseja salvar as alterações?");
  if (confirmation) {
    // Verificar se houve mudanças na TV
    if (tvChanges) {
      localStorage.setItem("isTVOn", isTVOn); // Armazenar o novo estado da TV no localStorage
      tvChanges = false; // Resetar a variável de mudanças
    }
  }
});

// Atualizar a interface do usuário com o estado atual da TV ao carregar a página
updateTVStatus();
