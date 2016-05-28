var recognizer = new window.webkitSpeechRecognition();
var speechSynthesis = window.speechSynthesis;


function handleOnResult(result, cb) {
  if (!result || !result.results) {
    return;
  }

  var recognition = result.results[result.resultIndex];

  cb({
    text: recognition[0].transcript,
    confidence: recognition[0].confidence,
    final: recognition.isFinal
  });
}

Object.assign(recognizer, {
  continuous: false,
  lang: 'es-AR',
  interimResults: false,
  onend: function(){
    console.log('onend', arguments);
  },
  onerror: function(){
    console.log('onerror', arguments);
  },
  onresult: result => handleOnResult(result, function(result){
    console.log('onresult', result.text);
    say(result.text);
    if (result.final) { }
  }),
  onstart: function(){
    console.log('onstart', arguments);
  }
});



function start() {
  recognizer.start();
}

function stop() {
  recognizer.stop();
}

function abort() {
  recognizer.abort();
}

function say(what) {
  var msg = new SpeechSynthesisUtterance();
  var lang = 'es-AR';
  var voice = speechSynthesis.getVoices().filter(voice => voice.lang.indexOf('es') >= 0)[1];

  msg.text=what;
  msg.voice=voice;
  msg.lang=lang;

  speechSynthesis.speak(msg);
}
