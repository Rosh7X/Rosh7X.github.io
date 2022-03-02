(function(window, document, undefined){

    var gameOver = false;

    var currentColumn = 0;
    var currentRow = 0;
    var maxColumns = 5
    var maxRows = 5;

    var currentGuess = "";

    var randomStartingLetter = Math.round(Math.random() * 26);

    var randomWordIndex = Math.round(Math.random() * allGuessableWords[randomStartingLetter].length);
    var randomWord = allGuessableWords[randomStartingLetter][randomWordIndex];

    if (randomWord === "undefined")
    {
        alert("reloading page");
        location.reload();
    }
        
    //alert(randomWord);

    window.onload = init;

    function init(){

    var alertBox = document.getElementById("alertDiv");
    alertBox.style.opacity = "0"; 

    function enterLetter(letter)
    {
        if (currentColumn < maxColumns)
        {
            //enter a letter I guess
            currentGuess = currentGuess + letter;
            guessLocation = currentColumn.toString() + currentRow.toString();
            document.getElementById(guessLocation).innerHTML = letter.toUpperCase();
            currentColumn++;
        }
    }

    function backSpace ()
    {
        if (currentColumn > 0)
        {
            currentColumn--;
            guessLocation = currentColumn.toString() + currentRow.toString();
            document.getElementById(guessLocation).innerHTML = "";
            currentGuess = currentGuess.substring(0, currentColumn);
        }
    }

    function tryWord ()
    {
        if (currentColumn == maxColumns)
        {
            //Make the guess

            var wordIndex = currentGuess.charCodeAt(0) - 97;
            var length = allGuessableWords[wordIndex].length;   //Changed for guessing
            var validWood = false;
            for (var x = 0; x < length; x++)
            {
                if (currentGuess === allGuessableWords[wordIndex][x])   //Changed for guessing
                {
                    validWood = true;
                }
            }

            if (!validWood)
            {
                //alert("Not a valid word");
                FadeAlert("Not A Word");
                return;
            }

            var allCorrect = [false, false, false, false, false];

            //alert("running");
            for (var z = 0; z < 5; z++)
            {
                var usedLetter = false;
                var letter = currentGuess.charAt(z);
                for (var y = 0; y < 5; y++)
                {
                    //alert("running");
                    if (letter === randomWord.charAt(y))
                    {
                        usedLetter = true;
                        if (z == y)
                        {
                            //Make Green
                            var guessLocation = z.toString() + currentRow.toString();
                            document.getElementById(guessLocation).style.backgroundColor = "#657153";
                            allCorrect[z] = true;
                        }
                        else
                        {
                            //Make Pink
                            var guessLocation = z.toString() + currentRow.toString();
                            document.getElementById(guessLocation).style.backgroundColor = "#f25f5c";
                        }
                        break;
                    }
                }
                if (!usedLetter)
                {
                    //Make Grey
                    var guessLocation = z.toString() + currentRow.toString();
                    document.getElementById(guessLocation).style.backgroundColor = "#4b4f4e";
                }
            }

            var winGame = true;

            for (let x = 0; x < 5; x++)
            {
                if (allCorrect[x] == false)
                {
                    winGame = false;
                    break;
                }
            }

            if (winGame == true)
            {
                gameOver = true;
                alertBox.innerHTML = "You Win in " + (currentRow + 1) + "!";
                alertBox.style.opacity = "0.75";
                return;
            }

            currentRow++;
            currentColumn = 0;
            currentGuess = "";
            if (currentRow > maxRows)
            {
                //End the game.....
                gameOver = true;
                alertBox.innerHTML = "Word was: " + randomWord.toUpperCase();
                alertBox.style.opacity = "0.75";
            }
            //alert(currentRow);
        }
        else
        {
            FadeAlert("Not Long Enough");
        }
    }

    // Add event listener on keydown
    document.addEventListener('keydown', (event) => {

        if (gameOver == true)
        {
            return;
        }

        var name = event.key;
        var code = event.code;
        //alert(name);
        //alert(isLetter(name));
        if (isLetter(name))
        {
            enterLetter(name);
        }
        else if (isBackspace(name))
        {
            backSpace();
        }
        else if (isEnter(name))
        {
            tryWord();
        }
    }, false);

    function isLetter(str) 
    {     
        if (str.length === 1 && str.match(/[a-z]/i)) 
        {       
            return true;     
        }     
        return false;   
    }

    function isBackspace(str)
    {
        if (str == "Backspace")
        {
            return true;
        }
        return false;
    }

    function isEnter(str)
    {
        if (str == "Enter")
        {
            return true;
        }
        return false;
    }

    function FadeAlert(message) {
        alertBox.innerHTML = message;
        let id = null;
        let opacity = 1;
        let step = 0;
        clearInterval(id);
        id = setInterval(frame, 10);
        function frame() {
            if (step >= 150) 
            {
                clearInterval(id);
            }
            else if (step > 50)
            {
                opacity -= 0.01;
            }
            alertBox.style.opacity = opacity;
            step++;
        }
    }

}
})(window, document, undefined);
