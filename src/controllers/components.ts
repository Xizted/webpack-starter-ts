import { getJoke } from "./providers/chuck-norris";

let button: HTMLButtonElement;

const createHTML = (): void => {
  const body: HTMLElement = document.body;
  const div: HTMLDivElement = document.createElement("div");
  div.innerHTML = `<img src="./assets/logo.png"/>
                 <img src="./assets/plus.png"/>
                 <img src="./assets/typescript-1174965.webp"/>
                 <h1> Happy Coding!!!!</h1>`;

  button = document.createElement("button");
  button.innerText = "Click Me!";

  div.append(button);
  body.append(div);
  console.log(`End Controller`);
};

const events = (): void => {
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    button.disabled = true;

    const joke = await getJoke();
    alert(joke.value);
    button.disabled = false;
  });
};

const renderHTML = (): void => {
  createHTML();
  events();
};

export { renderHTML };
