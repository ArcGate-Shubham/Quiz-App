var questions = [{
    'question': 'What year was JavaScript Launched ?',
    'option1': '1996',
    'option2': '1995',
    'option3': '1994',
    'option4': 'none of the above',
    'correct': 'option2'
},
{
    'question': 'What does HTML stands for ?',
    'option1': 'Hypertext Markup Language',
    'option2': 'Hypertext Markdown Language',
    'option3': 'Hyperloop Machine Language',
    'option4': 'Helicopters Terminals Motorboats lamborginis',
    'correct': 'option1'
},
{
    'question': 'Which language runs in a web browser ?',
    'option1': 'Java',
    'option2': 'C',
    'option3': 'Python',
    'option4': 'JavaScript',
    'correct': 'option4'
},
{
    'question': 'What does CSS stand for  ?',
    'option1': 'Central Style Sheets',
    'option2': 'Cascading Style sheets',
    'option3': 'Cascading Simple Sheets',
    'option4': 'Cars SUVs Sailboats',
    'correct': 'option2'
},
]

var index = 0;
var totalQuestion = questions.length
var rightAnswer = 0;
var wrongAnswer = 0;
var questionBox = document.getElementById('questionBox')
var optionInput = document.querySelectorAll('.options')


function loadQuestion() {
    // loadQuestion function basically used for load our question panel one by one
    if (index === totalQuestion) {
        return endSubmit()
    }
    reset_data()
    var data = questions[index]
    questionBox.innerText = `${index + 1}) ${data.question}`
    optionInput[0].nextElementSibling.innerText = data.option1;
    optionInput[1].nextElementSibling.innerText = data.option2;
    optionInput[2].nextElementSibling.innerText = data.option3;
    optionInput[3].nextElementSibling.innerText = data.option4;
}

function submitAnswer() {
    // submitAnswer function work on one by one our question is submitted using validation
    var data = questions[index];
    var ans = obtainAnswer()
    if (ans) {
        if (ans == data.correct) {
            rightAnswer++
        } else {
            wrongAnswer++
        }
        index++;
        loadQuestion();
        return;
    }
    else {
        alert("Please Choose Any Option")
        return false;
    }
}

function obtainAnswer() {
    // obtainAnswer function get our particular option we choosen and return the value
    var answer;
    optionInput.forEach(
        (input) => {
            if (input.checked) {
                answer = input.value;
            }
        }
    )
    return answer;
}

function reset_data() {
    // reset_data function work on reset our pre-selected option during submit our question one by one
    optionInput.forEach(
        (input) => {
            input.checked = false;
        }
    )
}

function endSubmit() {
    // endSubmit function work on show our all correct questions no. 
    document.getElementsByClassName('container')[0].innerHTML = `
    <div class="col" >
        <h3 class="w-100" align="center" style="margin-top:150px;">Thank you for playing the quiz</h3>
        <h2 align="center">${rightAnswer}/${totalQuestion} are correct</h2>
        <button onclick="location.reload()"" style="height:50px; width: 30%; background-color: rgb(131, 111, 67); margin-left:200px; margin-top:30px; font-size:25px; color:white;">Reload</button>
    </div>`
}

function shuffleArray(array) {
    // shuffleArray function work on randomly show our questions
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function Validate_username_and_email() {
    var username = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value;
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('email', email);
    var regexPattern = /^[a-zA-Z0-9]+$/;
    var email_regex = /^[a-zA-Z0-9+!#$%^]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/
    if (username && email) {
        if (!regexPattern.test(username)) {
            document.getElementById('name_error').innerHTML = 'Please Enter Valid Username'
            return false;
        }
        else if (username.length < 8) {
            document.getElementById('name_error').innerHTML = 'Please enter username length is more than 8 character'
            return false;
        }
        else if (username.length >= 10) {
            document.getElementById('name_error').innerHTML = 'Please enter username length is less than 10 character'
            return false;
        }
        else if (!email_regex.test(email)) {
            document.getElementById('email_error').innerHTML = 'Please Enter Valid email'
            alert('Please enter valid email')
            return false;
        }
        else {
            var name_data = sessionStorage.getItem('username');
            document.getElementById('showName').innerText = name_data;
            return true;
        }
    }
    else {
        document.getElementById('name_email_error').innerHTML = "Please Enter Username and Email"
        return false
    }
}

shuffleArray(questions);

loadQuestion();
