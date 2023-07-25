var questions = [
  {
    question: "What year was JavaScript Launched ?",
    option1: "1996",
    option2: "1995",
    option3: "1994",
    option4: "none of the above",
    correct: "option2",
  },
  {
    question: "What does HTML stands for ?",
    option1: "Hypertext Markup Language",
    option2: "Hypertext Markdown Language",
    option3: "Hyperloop Machine Language",
    option4: "Helicopters Terminals Motorboats lamborginis",
    correct: "option1",
  },
  {
    question: "Which language runs in a web browser ?",
    option1: "Java",
    option2: "C",
    option3: "Python",
    option4: "JavaScript",
    correct: "option4",
  },
  {
    question: "What does CSS stand for  ?",
    option1: "Central Style Sheets",
    option2: "Cascading Style sheets",
    option3: "Cascading Simple Sheets",
    option4: "Cars SUVs Sailboats",
    correct: "option2",
  },
];

var index = 0;
var totalQuestion = questions.length;
var rightAnswer = 0;
var wrongAnswer = 0;
var questionBox = document.getElementById("questionBox");
var optionInput = document.querySelectorAll(".options");
var backButton = document.querySelector(".backbtn");
var resultBox = document.querySelector(".container");

var session_count_data = localStorage.getItem("session_count_data") || 0;

window.onbeforeunload = function () {
  return "Are you sure you want to leave this page?";
};

// Enable window refresh after quiz completion
window.onunload = function () {
  window.onbeforeunload = null;
};

// Restoring user progress after page reload
if (localStorage.getItem("index")) {
  index = parseInt(localStorage.getItem("index"));
  rightAnswer = parseInt(localStorage.getItem("rightAnswer"));
  loadQuestion();
  if (localStorage.getItem("answerdata" + index)) {
    switch (localStorage.getItem("answerdata" + index)) {
      case "option1":
        optionInput[0].checked = true;
        break;
      case "option2":
        optionInput[1].checked = true;
        break;
      case "option3":
        optionInput[2].checked = true;
        break;
      case "option4":
        optionInput[3].checked = true;
        break;
      default:
        break;
    }
  }
}

function reset_checked_radio_newuser() {
  // Reset the user's choices for all questions
  user_choices = {};
  optionInput.forEach((input) => {
    input.checked = false;
  });
}

function loadQuestion() {
  // loadQuestion function basically used for load our question panel one by one
  if (index === 0) {
    backButton.style.display = "none";
  } else {
    backButton.style.display = "block";
  }

  localStorage.setItem("session_count_data", session_count_data);
  if (index === totalQuestion) {
    return endSubmit();
  }

  if (localStorage.getItem("session_count_data") >= maxUsers) {
    clearSessionAndLocalStorage();
    window.close();
    return endSubmit();
  }
  reset_data();
  var data = questions[index];
  questionBox.innerText = `${index + 1}) ${data.question}`;
  optionInput[0].nextElementSibling.innerText = data.option1;
  optionInput[1].nextElementSibling.innerText = data.option2;
  optionInput[2].nextElementSibling.innerText = data.option3;
  optionInput[3].nextElementSibling.innerText = data.option4;

  // Check if the user has already answered the current question and preselect the radio button accordingly
  if (localStorage.getItem("answerdata" + index)) {
    switch (localStorage.getItem("answerdata" + index)) {
      case "option1":
        optionInput[0].checked = true;
        break;
      case "option2":
        optionInput[1].checked = true;
        break;
      case "option3":
        optionInput[2].checked = true;
        break;
      case "option4":
        optionInput[3].checked = true;
        break;
      default:
        optionInput.forEach((input) => {
          input.checked =
            input.value === localStorage.getItem("answerdata" + index);
        });
        break;
    }
  }
}

function updateChoices() {
  // Function to update the user's choices based on the selected radio buttons
  var ans = obtainAnswer();
  user_choices[index] = ans;
  localStorage.setItem("answerdata" + index, ans);
}

var user_choices = {};

function submitAnswer() {
  // submitAnswer function work on one by one our question is submitted using validation
  var data = questions[index];
  var ans = obtainAnswer();
  console.log(ans, "ans");
  user_choices[index] = ans;
  localStorage.setItem("answerdata", index, ans);
  localStorage.setItem("data", user_choices[index]);
  var email = document.getElementById("email").value;
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var currentUser = users.find((user) => user.email === email);
  currentUser.user_choices = user_choices; 

  localStorage.setItem("users", JSON.stringify(users)); //
  if (ans) {
    if (ans == data.correct) {
      rightAnswer++;
      currentUser.rightAnswer = rightAnswer + 1;
      localStorage.setItem("users", JSON.stringify(users)); //
    } else {
      wrongAnswer++;
    }
    index++;
    loadQuestion();
    if (index < questions.length) {
      localStorage.setItem("index", index);
    }
    if (localStorage.getItem("answerdata" + index)) {
      switch (localStorage.getItem("answerdata" + index)) {
        case "option1":
          optionInput[0].checked = true;
          break;
        case "option2":
          optionInput[1].checked = true;
          break;
        case "option3":
          optionInput[2].checked = true;
          break;
        case "option4":
          optionInput[3].checked = true;
          break;
        default:
          break;
      }
    }
    return;
  } else {
    alert("Please Choose Any Option");
    return false;
  }
}

function obtainAnswer() {
  // obtainAnswer function get our particular option we choosen and return the value
  var answer;
  optionInput.forEach((input) => {
    if (input.checked) {
      answer = input.value;
    }
  });
  return answer;
}

function reset_data() {
  // reset_data function work on reset our pre-selected option during submit our question one by one
  optionInput.forEach((input) => {
    if (input.checked) {
      input.checked = false;
    }
  });
}

function endSubmit() {
  // endSubmit function work on show our all correct questions no.
  var email = document.getElementById("email").value;
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var currentUser = users.find((user) => user.email === email);
  if (currentUser) {
    redirectToTable();
  }
  document.getElementsByClassName("container")[0].innerHTML = `
    <div class="col" >
        <h3 class="w-100 select_data" align="center">Thank you for playing the quiz</h3>
        <h2 align="center">${rightAnswer + 1}/${totalQuestion} are correct</h2>
        <button onclick="location.reload()"" class="unique_click">Reload</button>
    </div>`;
  localStorage.removeItem("email");
  localStorage.removeItem("username");
  localStorage.removeItem("rightAnswer");
  localStorage.removeItem("index");
}

function shuffleArray(array) {
  // shuffleArray function work on randomly show our questions
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(questions);

var maxUsers = 10;

function Validate_username_and_email() {
  // Validation for username or email
  var username = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value;
  var submitbutton = document.getElementById("submitBtn_data");
  var regexPattern = /^[a-zA-Z0-9]+$/;
  var email_regex = /^[a-zA-Z0-9+!#$%^]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/;

  submitbutton.disabled = true;

  if (username && email) {
    if (!regexPattern.test(username)) {
      document.getElementById("name_error").innerHTML =
        "Please Enter Valid Username";
      submitbutton.disabled = true;
      return false;
    } else if (username.length < 8) {
      document.getElementById("name_error").innerHTML =
        "Please enter username length is more than 8 characters";
      submitbutton.disabled = true;
      return false;
    } else if (username.length >= 11) {
      document.getElementById("name_error").innerHTML =
        "Please enter username length is less than 10 characters";
      submitbutton.disabled = true;
      return false;
    } else if (!email_regex.test(email)) {
      document.getElementById("email_error").innerHTML =
        "Please Enter Valid email";
      submitbutton.disabled = true;
      return false;
    } else {
      var users = JSON.parse(localStorage.getItem("users")) || [];
      var existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        document.getElementById("email_error").innerHTML =
          "email already exists";
        submitbutton.disabled = false;
        return redirectToTable();
      } else {
        $("#userTable").hide();
        loadQuestion();
        display_show_hide();
      }

      users.push({
        username: username,
        email: email,
      });
      var numUsers = users.length;

      if (numUsers >= maxUsers) {
        localStorage.removeItem("session_count_data");
        localStorage.clear();
        alert(
          "Session has expired. Please reload the page to start a new session."
        );
        return false;
      }

      localStorage.setItem("users", JSON.stringify(users));
      // document.getElementById("showName").innerText = username;
      submitbutton.disabled = false;
      if (users.length === 10) {
        console.log(users.length, "users.length");
        localStorage.removeItem("session_count_data");
        localStorage.clear();
        window.close();
      }
      return true;
    }
  } else {
    submitbutton.disabled = true;
    return false;
  }
}

function startQuiz() {
  //quiz is started
  session_count_data++;
  // Check if the user has already completed the quiz based on their username
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var existingUser = users.find((user) => user.email === email);
  if (existingUser && existingUser.completedQuiz) {
    // If the user has already completed the quiz, show the final score
    return endSubmit();
  }

  if (Validate_username_and_email()) {
    user_choices = {};
    $(".container").show();
    var name_data = document.getElementById("name").value;
    localStorage.setItem("username", name_data);
    document.getElementById("showName").innerText = name_data;
    loadQuestion();
  }
}

function clearSessionAndLocalStorage() {
  window.close();
  localStorage.removeItem("session_count_data");
  localStorage.clear();
}

function display_show_hide() {
  // this function work on click on modal box submit button and show quiz container box
  var users = JSON.parse(localStorage.getItem("users")) || [];
  var numUsers = users.length;

  if (numUsers >= maxUsers) {
    localStorage.removeItem("session_count_data");
    localStorage.clear();
    alert(
      "Session has expired. Please reload the page to start a new session."
    );
    return;
  }

  if (document.getElementById("submitBtn_data").onclick) {
    $(".container").show();
    var name_data = document.getElementById("name").value;
    console.log(name_data, "name_data");
    document.getElementById("showName").innerText = name_data;
  } else {
    $(".container").hide();
  }
}

// This functionality work for click on back button
backButton.addEventListener("click", () => {
  updateChoices();
  index--;
  if (index >= 0) {
    var previousAnswer = user_choices[index];
    console.log(previousAnswer, "previousAnswer");
    if (previousAnswer) {
      var previousQuestion = questions[index];
      if (previousAnswer === previousQuestion.correct) {
        rightAnswer--;
      }
    }
    loadQuestion();
    if (previousAnswer) {
      optionInput.forEach((input) => {
        if (input.value === previousAnswer) {
          input.checked = true;
        }
      });
    }
  } else {
    index = 0;
  }
});

function redirectToTable() {
  $("#userTable").show();

  var users = JSON.parse(localStorage.getItem("users")) || [];
  var tableBody = document.getElementById("userTableBody");

  // Populate the table with user data
  tableBody.innerHTML = "";
  users.forEach((user) => {
    var row = document.createElement("tr");
    var usernameCell = document.createElement("td");
    var emailCell = document.createElement("td");
    var scoreCell = document.createElement("td");
    usernameCell.textContent = user.username;
    emailCell.textContent = user.email;
    scoreCell.textContent = user.rightAnswer;
    row.appendChild(usernameCell);
    row.appendChild(emailCell);
    row.appendChild(scoreCell);
    tableBody.appendChild(row);
  });
}

$(window).on("load", function () {
  // If the user count has reached the maximum, clear the session and local storage
  $("#staticBackdrop").modal("show");
  localStorage.setItem("session_count_data", session_count_data);
  if (session_count_data >= maxUsers) {
    clearSessionAndLocalStorage();
    window.close();
  }
});

loadQuestion();
