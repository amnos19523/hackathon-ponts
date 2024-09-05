const promptForm = document.getElementById("prompt-form");
const submitButton = document.getElementById("submit-button");
const questionButton = document.getElementById("question-button");
const messagesContainer = document.getElementById("messages-container");
const enregistre = document.getElementById("enregistre");
const dark_mode = document.getElementById("change_style");
const qcmButton = document.getElementById("qcm-button");
const nvcoursButton = document.getElementById("nv_cours");

const A_Button = document.getElementById("response-A");
const B_Button = document.getElementById("response-B");
const C_Button = document.getElementById("response-C");

const televerse = document.getElementById("televerse");
const reinitialise = document.getElementById("reinitialise");

const appendHumanMessage = (message) => {
  const humanMessageElement = document.createElement("div");
  humanMessageElement.classList.add("message", "message-human");
  humanMessageElement.innerHTML = message;
  messagesContainer.appendChild(humanMessageElement);
};

const appendAIMessage = async (messagePromise) => {
  // Add a loader to the interface
  const loaderElement = document.createElement("div");
  loaderElement.classList.add("message");
  loaderElement.innerHTML =
    "<div class='loader'><div></div><div></div><div></div>";
  messagesContainer.appendChild(loaderElement);

  // Await the answer from the server
  const messageToAppend = await messagePromise();

  // Replace the loader with the answer
  loaderElement.classList.remove("loader");
  loaderElement.innerHTML = messageToAppend;
};

const handlePrompt = async (event) => {
  event.preventDefault();
  // Parse form data in a structured object
  const data = new FormData(event.target);
  promptForm.reset();

  let url = "/prompt";
  if (questionButton.dataset.question !== undefined) {
    url = "/answer";
    data.append("question", questionButton.dataset.question);
    delete questionButton.dataset.question;
    questionButton.classList.remove("hidden");
    submitButton.innerHTML = "Message";

    document.getElementById("response-A").setAttribute("hidden", "hidden");
    document.getElementById("response-B").setAttribute("hidden", "hidden");
    document.getElementById("response-C").setAttribute("hidden", "hidden");
  }

  appendHumanMessage(data.get("prompt"));

  await appendAIMessage(async () => {
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    return result.answer;
  });
};

promptForm.addEventListener("submit", handlePrompt);

const handleQuestionClick = async (event) => {
  appendAIMessage(async () => {
    const response = await fetch("/question", {
      method: "GET",
    });
    const result = await response.json();
    const question = result.answer;

    questionButton.dataset.question = question;
    questionButton.classList.add("hidden");
    submitButton.innerHTML = "Répondre à la question";


    return question;
  });
};


const handleSaveClick = async (event) => {
  print()
};

const handleColor = async (event) => {
  if (document.getElementById('style').getAttribute('href') === "/static/style.css") {
    console.log("yeah, inspired py Philippe")
    document.getElementById('style').setAttribute('href', "/static/dark_style.css");
    document.getElementById('change_style').innerHTML = "&#x2600";
    return
  }
  if (document.getElementById('style').getAttribute('href') === "/static/dark_style.css") {
    document.getElementById('style').setAttribute('href', "/static/style.css");
    document.getElementById('change_style').innerHTML = "&#x1F319";
    return
  }
};

const handleQCM = async (event) => {
  appendAIMessage(async () => {
    const response = await fetch("/qcm", {
      method: "GET",
    });
    const result = await response.json();
    const question = result.answer;

    questionButton.dataset.question = question;
    questionButton.classList.remove("hidden");
    submitButton.innerHTML = "Répondre au QCM";

    document.getElementById("response-A").removeAttribute("hidden");
    document.getElementById("response-B").removeAttribute("hidden");
    document.getElementById("response-C").removeAttribute("hidden");
    return question;
  });
};


questionButton.addEventListener("click", handleQuestionClick);
enregistre.addEventListener("click", handleSaveClick);
dark_mode.addEventListener("click", handleColor);
qcmButton.addEventListener("click", handleQCM);

const handleA = async (event) => {
  appendAIMessage(async () => {
    const response = await fetch("/repA", {
      method: "GET",
    });
    const result = await response.json();
    const question = result.answer;

    questionButton.dataset.question = question;
    questionButton.classList.remove("hidden");
    submitButton.innerHTML = "Message";
    document.getElementById("response-A").setAttribute("hidden", "hidden");
    document.getElementById("response-B").setAttribute("hidden", "hidden");
    document.getElementById("response-C").setAttribute("hidden", "hidden");
    return question;
  });
};

const handleB = async (event) => {
  appendAIMessage(async () => {
    const response = await fetch("/repB", {
      method: "GET",
    });
    const result = await response.json();
    const question = result.answer;

    questionButton.dataset.question = question;
    questionButton.classList.remove("hidden");
    submitButton.innerHTML = "Message";
    document.getElementById("response-A").setAttribute("hidden", "hidden");
    document.getElementById("response-B").setAttribute("hidden", "hidden");
    document.getElementById("response-C").setAttribute("hidden", "hidden");
    return question;
  });
};

const handleC = async (event) => {
  appendAIMessage(async () => {
    const response = await fetch("/repC", {
      method: "GET",
    });
    const result = await response.json();
    const question = result.answer;

    questionButton.dataset.question = question;
    questionButton.classList.remove("hidden");
    submitButton.innerHTML = "Message";
    document.getElementById("response-A").setAttribute("hidden", "hidden");
    document.getElementById("response-B").setAttribute("hidden", "hidden");
    document.getElementById("response-C").setAttribute("hidden", "hidden");
    return question;
  });
};


A_Button.addEventListener("click", handleA);
B_Button.addEventListener("click", handleB);
C_Button.addEventListener("click", handleC);



const handleUpload = async (event) => {
};

televerse.addEventListener("click", handleUpload);

const handle_nv_cours = async (event) => {
  appendAIMessage(async () => {
    const response = await fetch("/cours", {
      method: "GET",
    });
    const result = await response.json();
    const cours = result.answer;

    questionButton.dataset.cours = cours;
    questionButton.classList.add("hidden");


    return cours;
  });
};

nvcoursButton.addEventListener("click", handle_nv_cours);

const handleReinitialise = async (event) => {
  const response = await fetch("/reini", {
    method: "GET",
  });
  console.log(response)
};


reinitialise.addEventListener("click", handleReinitialise);

