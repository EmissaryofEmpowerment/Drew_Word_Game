/*
 Copyright © 2022-226 Ryan Armstrong and Emma Burkett
 http://www.ryanarmstrongportfolio.wordpress.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, includimng without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRIGEMENT. IN NO EVENT SHALL THE
SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT, OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

In Essence, if you enjoy the game it's your own fault :)
 */
let counter = 0;
let border_color = '';
let add_lbl_2_div = "<div><label style='border: .1em solid " + border_color + ";'>";
let finish_lbl_2_div = "</label ></div > ";
let add_txt_2_div = "<div><input type='txt' value='";
let finish_txt_2_div = "</label></section>";
let guess_word = "abcdefghijklmnopqrstuvwxyz";
const set_name = new Set();

function SetBorderColor() {
    switch (counter % 5) {
        case 0:
            border_color = 'red';
            break;
        case 1:
            border_color = 'brown';
            break;
        case 2:
            border_color = 'green';
            break;
        case 3:
            border_color = 'blue';
            break;
        case 4:
            border_color = 'orange';
            break;
        default:
            border_color = '#000000';
            break;
    }
    add_lbl_2_div = "<div class='same_height'<label style='border: .1em solid " + border_color + ";'>";
    add_txt_2_div = "<section class='same_height' style='border: .1em solid " + border_color + ";' ><label>";
}

function LettersWriteWrong(user_guest) {
    var wrng_plc = 0;
    var rht_plc = 0;
    for (let i = 0; i < guess_word.length; i++) {
        if (user_guest[i] == guess_word[i]) {
            rht_plc += 1;
        }
        for (let j = 0; j < guess_word.length; j++) {
            if (user_guest[i] == guess_word[j] && i != j) {
                wrng_plc += 1;
            }
        }
    }
    SetBorderColor();
    document.getElementById("everything_else").innerHTML += add_txt_2_div + user_guest + finish_txt_2_div;
    document.getElementById("everything_else").innerHTML += add_lbl_2_div + "&emsp;&emsp;&emsp;&emsp;&emsp;" +
        wrng_plc + "&emsp;&emsp;&emsp;&emsp;&emsp;" + finish_lbl_2_div + add_lbl_2_div + "&emsp;&emsp;&emsp;&emsp;&emsp;" + rht_plc + "&emsp;&emsp;&emsp;&emsp;&emsp;" +  finish_lbl_2_div;
    
    document.getElementById("record_guess").value = '';
    if (wrng_plc == 0 && rht_plc == guess_word.length) {
        return true;
    }
}

function MakeEntry() {
    user_guest = ValidateInput(document.getElementById("record_guess").value);
    counter += 1;
    if (user_guest != ''){
        if (LettersWriteWrong(user_guest) == true) {
            alert("You Guessed the Word: '" + guess_word + "' in " + counter + " tries!");
    }
}
    document.getElementById("record_guess").value = '';
    document.getElementById("record_guess").focus();
}

function ValidateInput(userInput) {
    /*Here is where we would link it to a word list*/
    if (userInput.length < 1 || isNaN(userInput.length)) {
        alert("Sorry, no entry was recorded.");
        return '';
        
        if (guess_word.length == 26) { /*Player 1 failed to enter anything*/
            userInput = ValidateInput(prompt("PLAYER 1: \n Enter a word with no repeating letters for Player 2 to guess: "));
        }
        else {/*Player 2 failed to enter anything*/
        }
    }
    /*Check for repeats, numbers, or special characters*/
    userInput = userInput.toLowerCase();
    let invalid_input = false;
    let repeat_input = false;
    let flagged_char = '';
    set_name.clear();
    for (let i = 0; i < userInput.length; i++) {

        if (userInput[i].charCodeAt() < 96 || userInput[i].charCodeAt() > 122) { /* aka a non-letter was entered */
            invalid_input = true;
        }
        if (set_name.has(userInput[i])) {
            repeat_input = true;
            flagged_char = userInput[i];
        }
        else {
            set_name.add(userInput[i]);
        }
    }
    if (invalid_input == true) {
        alert("You entered a non-letter (spaces, numbers, and special characters are not allowed.")
        return '';
    }
    if (repeat_input == true) {
        alert("The letter " + flagged_char + " is in " + userInput + " more than once.");
        return '';
    }

    if (guess_word.length != 26) {/* This is the Entry from Player 2 */
        if (userInput.length != guess_word.length) {
            alert("Sorry, " + userInput + " is not a " + guess_word.length + " letter word.");
            return '';
        }
    }

    return userInput;
}

function Record_Answer(message) {
    userInput = ValidateInput(message);
    return userInput;
}
window.addEventListener("DOMContentLoaded", function () {
    tutorial = prompt("Welcome to the Word Game, to skip the tutorial type 'skip'");
    if (tutorial != "skip") {
        alert("This Program Was Written for the Armstrong Family in June 2022. Love, T.H.E.")
        alert("This is a 2 Player game.");
        alert("Maybe Eventually T.H.E. will connect this to a Word List. Then it Could become a 1 Player Game.")
        alert("Go Find Someone Else to Play this With.\n...Are there 2 People Ready to Play?")
        alert("Please Choose Who will Come up with a Word and who Will Guess that Word...\n ... Have Y'all Decided Which Person is Player 1 and which Person Player 2?");
    }
    guess_word = Record_Answer(prompt("PLAYER 1:\n Enter a word with no repeating letters for Player 2 to guess: "));
    document.getElementById("record_guess").focus();
    btn_elmnt = document.getElementById("btn");
    btn_elmnt.addEventListener("click", MakeEntry);
    alert("PLAYER 2:\nNow You Will Figure Out the Word That Player 1 Entered.\nType In a " + guess_word.length + "-letter Word with no Repeating Letters in the Text Box under 'Your Guess'");

});


