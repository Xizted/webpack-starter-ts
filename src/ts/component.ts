import "../css/components.css";

const createHTML = (): void => {
  const body: HTMLElement = document.body;

  const div: HTMLDivElement = document.createElement("div");

  div.innerHTML = `<img src="./assets/logo.png"/>
                   <img src="./assets/plus.png"/>
                   <img src="./assets/typescript-1174965.webp"/>
                   <h1>Happy Coding!!!</h1>  `;

  body.append(div);
};

export { createHTML };
