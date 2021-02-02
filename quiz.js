var sum , qNum, xmlDoc, questions;

function quizStart() {
  sum = 0;
  qNum = 0;

  loadXMLDoc("XMLtransform.xsl", function(xslhttp) {
  loadXMLDoc("test.xml", function(xmlhttp) {
      xmlDoc = transformXMLDoc(xmlhttp.responseXML, xslhttp.responseXML);
      questions = xmlDoc.getElementsByTagName('question');
      displayQuiz(); 
    });
  });
}


function displayQuiz() {
  var  actualQuest, quiz, buttons;
  actualQuest = qNum;


	quiz = '<ul class="quiz">';
  if (actualQuest == questions.length) quiz = '<center> Brawo zdobyłeś: ' + sum + '/' + questions.length+ ' punktów! spróbuj jeszcze raz!</center>';
  else {
      quiz +='<li> <b>'+(actualQuest+1)+'/'+questions.length +'</b> <br> ' +
      questions[actualQuest].getElementsByTagName('ask')[0].childNodes[0].nodeValue +'</li><br>';
    
      answers = questions[actualQuest].getElementsByTagName('answers')[0].getElementsByTagName('answer');
  
      for (var i = 0; i < answers.length; i++) 
      quiz += `<input type="radio" id="odp${i}" name="odp" value="${answers[i].childNodes[0].nodeValue}" <p> ${answers[i].childNodes[0].nodeValue} </p>`;
    }
  quiz += '</ul>'; 


  if(actualQuest < (questions.length-1)) 
    buttons = '<button type="button" class="btn" id="b1">Następne</button>';
  else if(actualQuest == (questions.length -1)) 
    buttons = '<button type="button" class="btn" id="b1">Zakoncz QUIZ</button>';
  else if(actualQuest == (questions.length )) 
    buttons = '<button type="button" class="btn" id="b3">Rozpocznij od nowa</button>';


  document.getElementsByClassName('quiz')[0].innerHTML = quiz; 
  document.getElementsByClassName("button")[0].innerHTML = buttons;

  if(actualQuest <= (questions.length-1)) {
    document.getElementById("b1").addEventListener("click", function() {
      ifCorrectAnswer( actualQuest);   
      qNum = actualQuest+1;
      displayQuiz();
    });
  } else if(actualQuest == (questions.length)) {  
    document.getElementById("b3").addEventListener("click", function(){
    quizStart();
  });}
}


function ifCorrectAnswer( actualQuest) {
  var correctAnswer, answer;

  correctAnswer = questions[actualQuest].getElementsByTagName("correctAnswer")[0].childNodes[0].nodeValue;
  answer = document.getElementsByName('odp');

    for (var i = 0; i < answer.length; i++) 
      if(answer[i].checked) 
        if(correctAnswer == (i+1)) 
          sum++;
}


function transformXMLDoc(xml, xsl) {
  var xsltProcessor, resultDocument;
  try {
 if(document.implementation && document.implementation.createDocument) {
      xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl);
      resultDocument = xsltProcessor.transformToDocument(xml, document);
    }
  }
  catch (err) {
    if(typeof(err) == "object") {
      if(err.message) {
        alert(err.message);
      }
    }
    else  alert(err);
  }
  return resultDocument;
}

function loadXMLDoc(fileName, callback) {
  var xhttp;
  xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      callback(this);
    }
    else {
      console.log("Nie można było wczytać pliku: " + fileName);
    }
  };
  
  xhttp.open("GET", fileName , true);

  xhttp.send();
}

