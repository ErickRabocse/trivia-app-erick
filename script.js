/* Trivia App: sitio web que genere trivias API: https://opentdb.com/api_config.php
    https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple
--> Cada pregunta correcta vale 100 puntos (Mostrar puntaje final)
Cosas a tener en cuenta:Github pages 
Extras: Webpack */

const api =
  "https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple";

const triviaSection = document.querySelector(".trivia__creation");
//MODIFYING API ACCORDING TO TRIVIA CREATION SETTINGS
const category = document.querySelector(".category__options");
const difficulty = document.querySelector(".category__difficulty");
const type = document.querySelector(".category__type");
const createBtn = document.querySelector(".create");

const values = () => {
  const cat = {
    books: 10,
    films: 11,
    music: 12,
    mythology: 20,
    sports: 21,
    geography: 22,
  };
  const dif = {
    easy: "easy",
    medium: "medium",
    hard: "hard",
  };
  const typ = {
    multiple: "multiple",
    boolean: "boolean",
  };
  const cat_val = cat[category.value];
  const dif_val = dif[difficulty.value];
  const type_val = typ[type.value];
  //CREATION OF COSTUM API
  setArray = [cat_val, dif_val, type_val];
  costumApi = `https://opentdb.com/api.php?amount=10&category=${setArray[0]}&difficulty=${setArray[1]}&type=${setArray[2]}`;
  //FETCHING THE COSTUME API
  let triviaAPI = fetch(costumApi);
  triviaAPI
    .then((response) => response.json())
    .then((data) => {
      let resultados = data.results;
      /* DISPPLAYING RESULTS ON SCREEN */
      showData(resultados);
      //REGISTER POINTS EARNED
      const resultsBtn = document.querySelector("#submit");
      resultsBtn.addEventListener("click", gradeResults);
    })
    .catch((error) => console.log(error, error.message));
};

createBtn.addEventListener("click", values);

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
                } " class="trivia__answer" id="a" >${
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
              <li class="trivia__list--el">
                <input type="radio" name="${
                  index + 1
                } " class="trivia__answer" id="c">${
      element.incorrect_answers[2]
    }</input>
              </li>
              <li class="trivia__list--el correctOne">
                <input type="radio" name="${
                  index + 1
                } " class="correctOne trivia__answer" id="d">${
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
  let ancestor = document.querySelector(".trivia__creation");
  let descendents = ancestor.getElementsByTagName("ul");
  let arrayOfLists = Array.from(descendents);
  arrayOfLists.forEach((el) => {
    for (let i = el.children.length; i >= 0; i--) {
      el.appendChild(el.children[(Math.random() * i) | 0]);
    }
    // console.log(el);
  });
};

const gradeResults = () => {
  //Selecting all the lists of possible answers
  let ancestor = document.querySelector(".trivia__creation");
  let descendents = ancestor.getElementsByTagName("input");
  let arrayOfAnswers = Array.from(descendents); //stores all answers!
  //Initializing counter of points to be scored
  let results = 0;
  //Looping through an array that contains the lists of all answers
  arrayOfAnswers.forEach((el) => {
    let findSelected = () => {
      if (el.checked && el.classList[0] === "correctOne") {
        results += 10;
      }
    };
    el.addEventListener("change", findSelected);
    findSelected();
  });
  console.log(results);
};

// const gradeResults = () => {
//   //GET RESULTS
//   //Selecting all the lists of possible answers
//   let ancestor = document.querySelector(".trivia__creation");
//   let descendents = ancestor.getElementsByTagName("ul");
//   let arrayOfLists = Array.from(descendents);
//   //Initializing counter of points to be scored
//   let results = 0;
//   //Looping through an array that contains the lists of all answers
//   arrayOfLists.forEach((el) => {
//     console.log("lists of answers: ", el);
//     //Looping through every single answer
//     let newArrOfLists = Array.from(el.children);
//     newArrOfLists.forEach((el) => {
//       const answer = el.children;
//       console.log("answer 0 index: ", answer[0]); //gets id --> answer[0].id
//       //CHECKING IF THE OPTION WAS SELECTED
//       let findSelected = () => {
//         answer[0].setAttribute("checked", "checked");
//         console.log("RESULT???", answer[0].checked);
//       };
//       el.addEventListener("change", findSelected);
//       findSelected();
//       if (answer[0].classList[0] === "correctOne") {
//         results += 10;
//       }
//     });
//   });
//   console.log(results);
// };
