/* Trivia App: sitio web que genere trivias API: 
--> https://opentdb.com/api_config.php
    https://opentdb.com/api.php?amount=10
    https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple
OK --> 10 preguntas, modificar la dificultad, eleccionar el tipo de respuesta, escoger la categoría.
Una vez seleccionado las parámetros se crea la trivia
--> mostrar: las preguntas y las posibles respuestas
--> Se deben de contestar
--> Cada pregunta correcta vale 100 puntos (Mostrar puntaje final)
--> Botón de crear nueva trivia
Cosas a tener en cuenta:Github pages 
Extras: SCSS, BEM, Webpack */

const triviaSection = document.querySelector(".trivia__creation");

const triviaAPI = fetch(
  "https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple"
);

triviaAPI
  .then((response) => response.json())
  .then((data) => {
    let resultados = data.results;
    showData(resultados);
  })
  .catch((error) => console.log(error, error.message));

const showData = (resultados) => {
  console.log(resultados);
  let body = "";
  resultados.forEach((element, index) => {
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
                } " class="trivia__answer" id="d">${
      element.correct_answer
    }</input>
              </li>
          </ul>
          </div>
        </div>
    `;
  });
  triviaSection.innerHTML = body;
  triviaSection.insertAdjacentHTML(
    "beforeend",
    `<button id="submit">submit</button>`
  );
};
