/* Trivia App: sitio web que genere trivias API: https://opentdb.com/api_config.php
    https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple
--> Cada pregunta correcta vale 100 puntos (Mostrar puntaje final)
Cosas a tener en cuenta:Github pages 
Extras: SCSS, BEM, Webpack */

const api =
  "https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple";
const triviaSection = document.querySelector(".trivia__creation");

const triviaAPI = fetch(api);

triviaAPI
  .then((response) => response.json())
  .then((data) => {
    let resultados = data.results;
    /* DISPPLAYING RESULTS ON SCREEN */
    showData(resultados);
  })
  .catch((error) => console.log(error, error.message));

//Function that shows data on the site
const showData = (resultados) => {
  let body = "";
  resultados.forEach((element, index) => {
    //SHOWING RESULTS ON SCREEN
    body += `
        <div class="trivia">
          <div class="trivia__question">
            <h4 class="trivia__question--description">${index + 1} ${
      element.question
    }</h4>
            <ul class="trivia__list">
              <li class="trivia__list--el">
                <input type="radio" name="${
                  index + 1
                } " class="trivia__answer" id="a">${
      element.incorrect_answers[0]
    }</input>
              </li>
              <li class="trivia__list--el">
                <input type="radio" name="${
                  index + 1
                } " class="trivia__answer" id="b">${
      element.incorrect_answers[1]
    }</input>
              </li>
              <li>
                <input type="radio" name="${
                  index + 1
                } " class="trivia__answer" id="c">${
      element.incorrect_answers[2]
    }</input>
              </li>
              <li class="trivia__list--el">
                <input type="radio" name="${
                  index + 1
                } " class="trivia__answer" id="d" class="correctOne">${
      element.correct_answer
    }</input>
              </li>
          </ul>
          </div>
        </div>
    `;
  });
  triviaSection.innerHTML = body;

  //BUTTON
  triviaSection.insertAdjacentHTML(
    "beforeend",
    `<button id="submit">submit</button>`
  );
  //SHUFFLE ANSWERS
  let myList = document.querySelector(".trivia__list");
  for (let i = myList.children.length; i >= 0; i--) {
    myList.appendChild(myList.children[(Math.random() * i) | 0]);
  }
};
