//defines questions array
var questionsArray = [
    {
        "questions": "Commonly used data types that do not include:_____________",
        "A" : "1. Strings",
        "B" : "2. Booleans",
        "C" : "3. Alerts",
        "D" : "4. Numbers",
        "correct" : "3. Alerts"
    },
    {
        "questions": "The condition in an if / else statement is enclosed with __________",
        "A" : "1. Quotes",
        "B" : "2. Curly brackets",
        "C" : "3. Paranthesis",
        "D" : "4. Square brackets",
        "correct" : "3. Paranthesis"
    },
    {
        "questions": "Arrays in Javascript can be used to store _____________",
        "A" : "1. Numbers and Strings",
        "B" : "2. Other arrays",
        "C" : "3. Booleans",
        "D" : "4. All of the above",
        "correct" : "4. All of the above"
    },
    {
        "questions": "String values must be enclosed within _____ when being assigned to variable",
        "A" : "1. Commas",
        "B" : "2. Curly brackets",
        "C" : "3. Quotes",
        "D" : "4. Parenthesis",
        "correct" : "3. Quotes"
    },
    {
        "questions": "A useful tool used during development & debugging for printing content to the debugger is",
        "A" : "1. Javascript",
        "B" : "2. Terminal/bash",
        "C" : "3. For loops",
        "D" : "4. Console.log",
        "correct" : "4. Console.log"
    }
    ]
//Elements
var body = document.body;
var headerEl = document.getElementById("header");
var mainEl = document.getElementById("main")
var startquizEl = document.getElementById("start-quiz");
var questformEl = document.getElementById("quest-form");
var questionsEl = document.getElementById("questions");
var AgroupEl = document.getElementById("A");
var BgroupEl = document.getElementById("B");
var CgroupEl = document.getElementById("C");
var DgroupEl = document.getElementById("D");
var questionEl = document.getElementById("question");
var subFormEl = document.getElementById("submitform");
var resultEl = document.getElementById("result");
var inputEl = document.getElementById("initial");
var verifyEl =  document.getElementById("verify");
var viewscoreEl = document.getElementById("viewscore");
var loadHighscoresEl = document.createElement("div");
var gobackButtonEl = document.createElement("button");
var clearButtonEl = document.createElement("button");
var clearButtonEl;
var olistItemEl;
var correctAns="";
var cnt = 0;
var myVar="";
var scores = [];
var Highscore = 0;
var d = 75;

//timer function
var myTimer = function() 
  { 
    d=d-1;
    document.getElementById("timer").innerHTML = d;  
    if (d<0 || d===0)
    {
        clearInterval(myVar);
    } 
};

//Start quiz button 
var startQuiz = function(event)
{
    document.getElementById("timer").innerHTML = 75;
    myVar = setInterval(myTimer, 1000);
    mainEl.parentNode.removeChild(mainEl);
    loadQuestions();     
    body.appendChild(questionsEl); 
    body.appendChild(resultEl);  
};

//questions from array 
var loadQuestions = function()
{
    questionEl.textContent = questionsArray[cnt].questions;
    AgroupEl.textContent = questionsArray[cnt].A;
    BgroupEl.textContent = questionsArray[cnt].B;
    CgroupEl.textContent = questionsArray[cnt].C;
    DgroupEl.textContent = questionsArray[cnt].D;
    correctAns = questionsArray[cnt].correct;  
};

//Correct or Wrong
var buttonclick = function(event)
{   
    var Seletedans = document.getElementById(this.id).innerText; 
    if((cnt < questionsArray.length && d>0) ||(cnt < questionsArray.length && d===0))
    {
        if (Seletedans === correctAns)
        {
            verifyEl.innerText = "Correct!" ;
        }
        else
        {   d=d-10;
            verifyEl.innerText = "Wrong!";            
        }  
    
        cnt = cnt+1; 
        if ((cnt === questionsArray.length && d>0) || (d<0) || (cnt === questionsArray.length && d===0))
        {
            showResult();       
        }
        else
        {
        loadQuestions();  
        } 
    }  
    else if((cnt < questionsArray.length && d<0))
    {
        showResult();
    } 
    else if(cnt === questionsArray.length-1 && d<0)
    {
        showResult();
    }    
};

//show results
var showResult = function()
{
    clearInterval(myVar);
    
    if (d<0)
    { 
    document.getElementById("timer").innerHTML = 0;
    Highscore = 0;    
    }
    else{
    document.getElementById("timer").innerHTML = d;
    Highscore = d;
    }
    localStorage.setItem("hScore",Highscore);
    questionsEl.parentNode.removeChild(questionsEl);
    body.appendChild(subFormEl);
    body.appendChild(resultEl);
    document.getElementById("fscore").textContent = Highscore;
};

//remove results 
var inputText = function(event){
    verifyEl.innerText = "";
    if(document.body.contains(resultEl))
    {
        resultEl.parentNode.removeChild(resultEl); 
    }  
};

//load scores 
var loadScores = function(){
    var getScores = localStorage.getItem("scores");
    
    if (getScores!== null)
    {
        getScores = JSON.parse(getScores);
        for(var i=0;i<getScores.length;i++)
        {
            scores[i]=getScores[i];
        }
    }

};

//submit form  
var submitForm = function(event)
{
    event.preventDefault();
    loadScores();
    var nameInitial = inputEl.value;
    var scoreFinal = Highscore;
    var storeLocal = nameInitial+" - "+scoreFinal;
    scores.push(storeLocal);
    localStorage.setItem("scores",JSON.stringify(scores));
    if(document.body.contains(subFormEl))
    {
    
    subFormEl.parentNode.removeChild(subFormEl);
    }
    if(document.body.contains(headerEl))
    {
    document.getElementById("timer").innerHTML = 0;
    headerEl.parentNode.removeChild(headerEl);
    }
    if(document.body.contains(resultEl))
    {
        verifyEl.innerText = "";
        resultEl.parentNode.removeChild(resultEl);
    }
    cnt = 0;
    clearInterval(myVar);
    myVar="";
    Highscore = 0;
    d=75;
    loadHighscores(true);
};

//view high scores
var loadHighscores = function(flag)
{       
   var getScores = localStorage.getItem("scores");
   if (flag===true)
   {  
    loadHighscoresEl.className = "load-scores";

    loadHighscoresEl.innerHTML = "<h1 class='high'>High scores</h1>";

    olistItemEl = document.createElement("ol");
    olistItemEl.setAttribute("id","ollist");
    loadHighscoresEl.appendChild(olistItemEl);
    
    //create a li element and show scores from local storage
    if (getScores!== null)
    {
        
        getScores = JSON.parse(getScores);
        for(var i=0;i<getScores.length;i++)
        {
            var listItemEl = document.createElement("li");
            listItemEl.className = "list-item";
            listItemEl.id = "listitems";
            listItemEl.innerText = getScores[i];
            olistItemEl.appendChild(listItemEl);
        }
    }
            // create Go Back button
        gobackButtonEl.textContent = "Go Back";
        gobackButtonEl.className = "btn hscores-gobtn";       
        
            //create clear high scores button
        clearButtonEl.textContent = "Clear high scores";
        clearButtonEl.className = "btn hscores-clbtn";

        if(getScores===null)
        {
            clearButtonEl.disabled=true;
        }
        else
        {
            clearButtonEl.disabled=false;
        }
                
        loadHighscoresEl.appendChild(gobackButtonEl);
        loadHighscoresEl.appendChild(clearButtonEl);
        body.appendChild(loadHighscoresEl);
}
else if((getScores === null) && flag === false)
    {
        while(olistItemEl.hasChildNodes())
        {
            olistItemEl.removeChild(olistItemEl.firstChild);
        }
    }
 
};
//On click of View High score link
var viewhscores = function(event)
{   
    if(document.body.contains(questionsEl))
    {
        correctAns="";
        cnt = 0;
        clearInterval(myVar);
        myVar="";
        Highscore = 0;
        d=75;
        document.getElementById("timer").innerHTML = 0;
        questionsEl.parentNode.removeChild(questionsEl);
    }
    else if(document.body.contains(subFormEl))
    {
        correctAns="";
        cnt = 0;
        clearInterval(myVar);
        myVar="";
        Highscore = 0;
        d=75;
        document.getElementById("timer").innerHTML = 0;
        subFormEl.parentNode.removeChild(subFormEl);
    }
    else if(document.body.contains(mainEl))
    {
        mainEl.parentNode.removeChild(mainEl);
    }
    if(document.body.contains(resultEl))
    {
        verifyEl.innerText = "";
        resultEl.parentNode.removeChild(resultEl);
    }
    headerEl.parentNode.removeChild(headerEl); 
    loadHighscores(true);    
};

//go back button cliked
var goback = function(event){
    body.removeChild(loadHighscoresEl);
    body.appendChild(headerEl);
    body.appendChild(mainEl);
};




//clear high scores button clicked
var clearHighsores = function(event){

    localStorage.clear();
    scores.splice(0,scores.length);
    alert("cleared high scores");
    clearButtonEl.disabled=true;
    loadHighscores(false);
};

//event handlers
questionsEl.parentNode.removeChild(questionsEl);
resultEl.parentNode.removeChild(resultEl);
subFormEl.parentNode.removeChild(subFormEl);
startquizEl.addEventListener("click",startQuiz);
AgroupEl.addEventListener("click",buttonclick);
BgroupEl.addEventListener("click",buttonclick);
CgroupEl.addEventListener("click",buttonclick);
DgroupEl.addEventListener("click",buttonclick);
subFormEl.addEventListener("keyup",inputText);
subFormEl.addEventListener("submit",submitForm);
viewscoreEl.addEventListener("click",viewhscores);
gobackButtonEl.addEventListener("click",goback);
clearButtonEl.addEventListener("click",clearHighsores);