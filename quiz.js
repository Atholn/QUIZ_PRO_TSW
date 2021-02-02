var sum = 0;

function quizStart() {
  var quizData, xmlDoc;
  quizData = [{number: 0}];
  var qNum = 0;
  loadXMLDoc("XMLtransform.xsl", function(xslhttp) {
  loadXMLDoc("test.xml", function(xmlhttp) {
      xmlDoc = transformXMLDoc(xmlhttp.responseXML, xslhttp.responseXML);
      displayQuiz(quizData, xmlDoc);  //xmlhttp.responseXML
      taskSelection(quizData, xmlDoc);  //xmlhttp.responseXML
    });
  });
}


function displayQuiz(quizData, xmlDoc) {
	var x, i, l, list;
	l = quizData[0].number;
	list = '<ul class="quiz">';
	x = xmlDoc.getElementsByTagName('zadanie');
	if (l < 0) {
		l = 0;
  } 

  if (l== x.length) list= '<center> Brawo zdobyłeś:' + sum + ' punktów! spróbuj jeszcze raz!</center>';
  
  else {
  list +='<li> <b>'+(l+1)+'/'+x.length +'</b> <br> ' +
  x[l].getElementsByTagName('pytanie')[0].childNodes[0].nodeValue +'</li><br>';
  list += '';

  odpowiedzi = x[l].getElementsByTagName('odpowiedzi')[0].getElementsByTagName('odpowiedz');
    for (i = 0; i < odpowiedzi.length; i++) {
      list += `
        <input type="radio" id="odp${i}" name="odp" value="${odpowiedzi[i].childNodes[0].nodeValue}"
        <p> ${odpowiedzi[i].childNodes[0].nodeValue} </p>
      `;
    }


}
	
list += '</ul>'; 
document.getElementsByClassName('quiz')[0].innerHTML = list; 
}

function checkAnswer(x, l) {
  var a, o, i, j, temp, ans;
  temp = "";
  ans = false;
  
    a = x[l].getElementsByTagName("prawidlowaOdpowiedz")[0].childNodes[0].nodeValue;
    o = document.getElementsByName('odp');
    for (i = 0; i < o.length; i++) {
      if(o[i].checked) {
        if(a == (i+1)) {
          ans = true;
          sum++;
        }
      }
    }
  return ans;
}

function taskSelection(quizData, xmlDoc) {
  var x, l, controls, ans;
  l = quizData[0].number;
  x = xmlDoc.getElementsByTagName("zadanie");
  controls = '';
  if((l > 0) && (l < x.length)) {
    controls += '<button type="button" class="btn" id="btn1">Poprzednie</button>';
  }
  if(l < (x.length-1)) {
    controls += '<button type="button" class="btn" id="btn2">Następne</button>';
  }
  if(l == (x.length -1)) {
    controls += '<button type="button" class="btn" id="btn3">Zakoncz QUIZ</button>';
  }
  if(l == (x.length )) {
    
    controls += '<button type="button" class="btn" id="btn4">Rozpocznij od nowa+' +sum+' </button>';
  }
  document.getElementsByClassName("buttons")[0].innerHTML = controls;
  
  if((l > 0) && (l < x.length)) {
    document.getElementById("btn1").addEventListener("click", function() {
      ans = checkAnswer(x, l);
      quizData.push([{task: (l+1)}, {answer: ans}]);
      if(l > 0) {
        quizData[0].number = l-1;
      }
      
      displayQuiz(quizData, xmlDoc);
      taskSelection(quizData, xmlDoc);
    });
  }

  if(l < (x.length-1)) {
    document.getElementById("btn2").addEventListener("click", function() {
      ans = checkAnswer(x, l);
      quizData.push([{task: (l+1)}, {answer: ans}]);
      if(l < (x.length-1)) {
        quizData[0].number = l+1;
      }
      
      displayQuiz(quizData, xmlDoc);
      taskSelection(quizData, xmlDoc);
    });
  }

  if(l == (x.length-1)){
    document.getElementById("btn3").addEventListener("click", function(){
      ans = checkAnswer(x, l);
      quizData.push([{task: (l+1)}, {answer: ans}]);
      if(l == (x.length-1)) {
        quizData[0].number = l+1;
      }
     
      taskSelection(quizData, xmlDoc);    
      displayQuiz(quizData, xmlDoc);    
    });
  }

  if(l == (x.length)) {
    
    document.getElementById("btn4").addEventListener("click", function(){
      
      quizStart();
      
  });}
}

function transformXMLDoc(xml, xsl) {
  var xsltProcessor, parser, resultDocument;
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
    else {
      alert(err);
    }
  }
  
  return resultDocument;
}

function loadXMLDoc(fileName, callback) {
  var xhttp;
  //For IE
  if(window.ActiveXObject) {
    try {
      xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e1) {
      try {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch (e2) {}
    }
  }
  //For Chrome, Firefox, Opera, etc.
  else {
    xhttp = new XMLHttpRequest();
  }
  
  if(!xhttp) {
    window.alert("Brak wsparcia AJAX!");
    return false;
  }
  
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      callback(this);
    }
    else {
      console.log("Nie można było wczytać pliku: " + fileName);
    }
  };
  
  xhttp.open("GET", fileName , true);
  try {
    xhttp.responseType = "msxml-document";
  }
  catch(err) {}  //For IE11
  xhttp.send();
}

