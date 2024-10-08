//consoleText(['1.Welcome! Lost, are we?', '2.Welcome! Lost, are we?'], 'text',  ['green','tomato', 'deepskyblue','goldenrod','chocolate','whitesmoke']);
// Function to load text from the file and call consoleText
function loadMessages() {
    fetch('talk.txt')  
        .then(response => response.text())
        .then(data => {
            // Process the file content
            const lines = data.split('\n').filter(line => line.trim() !== '');
            // Define colors if needed
            const colors = ['green','tomato', 'deepskyblue','goldenrod','chocolate','whitesmoke'];
            // Call consoleText with the loaded messages
            consoleText(lines, 'text', colors);
        })
        .catch(error => console.error('Error fetching the file:', error));
}

// Call the function when the document is loaded
document.addEventListener('DOMContentLoaded', loadMessages);

 function consoleText(words, id, colors) {
     const fontSize = "20px"
	 const fontFamily = "Courier New"
	 if (colors === undefined) colors = ['#fff'];
     var visible = true;
     var con = document.getElementById('console');
	 con.style.fontSize = fontSize;
     var letterCount = 1;
     var x = 1;
     var waiting = false;
     var target = document.getElementById(id)
     target.setAttribute('style', 'color:' + colors[0])
	 target.style.fontSize = fontSize;
	 target.style.fontFamily = fontFamily
     window.setInterval(function() {

         if (letterCount === 0 && waiting === false) {
             waiting = true;
             target.innerHTML = words[0].substring(0, letterCount)
             window.setTimeout(function() {
                 var usedColor = colors.shift();
                 colors.push(usedColor);
                 var usedWord = words.shift();
                 words.push(usedWord);
                 x = 1;
                 target.setAttribute('style', 'color:' + colors[0])
				 target.style.fontSize = fontSize;
				 target.style.fontFamily = fontFamily
                 letterCount += x;
                 waiting = false;
             }, 1000)
         } else if (letterCount === words[0].length + 1 && waiting === false) {
             waiting = true;
             window.setTimeout(function() {
                 x = -1;
                 letterCount += x;
                 waiting = false;
             }, 2000)
         } else if (waiting === false) {
             target.innerHTML = words[0].substring(0, letterCount)
             letterCount += x;
         }
     }, 30)
     window.setInterval(function() {
         if (visible === true) {
             con.className = 'console-underscore hidden'
             visible = false;

         } else {
             con.className = 'console-underscore'

             visible = true;
         }
     }, 0)
 }
