
(function(window){
    var speakWord = "Hello";
helloSpeakWord={};

helloSpeakWord.speak = function (name) {
  console.log(speakWord + " " + name);
}

window.helloSpeakWord=helloSpeakWord;

})(window);