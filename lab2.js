/*********************************************************
LAB 2: SORTING AND CAMPY SCI-FI

Welcome to Lab 2 =)

Be sure to read all the comments!

All of the instructions are inline with the assignment below.
Look for the word TODO in comments.  Each TODO will have a
description of what is required.

To run this file (in the terminal) use: node lab2.js

*********************************************************/
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log("assertion failure: ", failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

 persons consumed  |  rate of consumption
 ------------------|---------------------
        0          |       1/hour
        1          |       2/hour
        2          |       3/hour
        3          |       4/hour

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/

function Blob() {
  this.consumptionRate = 1; // Initialize at 1 person/hr
  this.personsConsumed = 0; // it hasn't consumed anyone yet
} // end Blob constructor

var blob = new Blob();
var time = 0;

while (blob.personsConsumed < 1000) {
  time += 1; // an hour passes
  blob.personsConsumed += blob.consumptionRate; // the blob eats more people
  blob.consumptionRate = blob.personsConsumed + 1; // the blob grows stronger
} // end while

var hoursSpentInDowington = time; // TODO: assign me the value of the
                                  // above calculation

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

function hoursToOoze(population, peoplePerHour) {
  // TODO: implement me based on the instructions above. Be sure to then assign me to the Blob's prototype.
  var hour = 0; // start time at 0
  var peopleEaten = 0; // assume the blob has not eaten anyone yet

  while (peopleEaten < population) {
    hour += 1;
    peopleEaten += peoplePerHour;
    peoplePerHour = peopleEaten + 1;
  } // end while
  return hour;
} // end hoursToOoze

Blob.prototype.hoursToOoze = hoursToOoze;

assert(blob.hoursToOoze(0, 1) === 0, "no people means no time needed.");
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  "hoursSpentInDowington should match hoursToOoze\"s result for 1000");
// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.
assert(blob.hoursToOoze(5000, 1) === 13, "The blob didn't take 13 hours to eat 5000 people.");
assert(blob.hoursToOoze(1, 1) === 1, "The blob should only take 1 hour to eat 1 person.");
assert(blob.hoursToOoze(1, 0) === 2, "The blob will eventually eat someone!");

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: "nuqneH",  // home planet is Qo"noS
  romulan: "Jolan\"tru", // home planet is Romulus
  "federation standard": "hello" // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method called sayHello.

function SentientBeing (homePlanet, language) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.homePlanet = homePlanet;
  this.language = language;
}

// sb is a SentientBeing object
function sayHello (sb) {
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating
    if (sb.language === "klingon") {
      console.log(hello[this.language]);
      return hello.klingon;
    } /* end if */ else if (sb.language === "romulan") {
      console.log(hello[this.language]);
      return hello.romulan;
    } /* end else if */ else {
      console.log(hello[this.language]);
      return hello["federation standard"];
    } // end else

    //TODO: put this on the SentientBeing prototype
  }

SentientBeing.prototype.sayHello = sayHello;

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).

// Klingons are SentientBeing's from Qo"noS that speak klingon
Klingon.prototype = new SentientBeing("Qo\"noS", "klingon");

// Romulans are SentientBeing's from Romulus that speak romulan
Romulan.prototype = new SentientBeing("Romulus", "romulan");

// Humans are SentientBeing's from Earth that speak federation standard
Human.prototype = new SentientBeing("Earth", "federation standard");

// Klingon constructor
function Klingon() {
  this.race = "Klingon";
} // end Klingon constructor

// Romulan constructor
function Romulan() {
  this.race = "Romulan";
}

// Human constructor
function Human() {
  this.race = "Human";
} // end Human constructor

// Human to Klingon
assert((new Human()).sayHello(new Klingon()) === "nuqneH",
  "the klingon should hear nuqneH");
// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

// Human to Romulan
assert((new Human()).sayHello(new Romulan()) === hello.romulan,
  "the romulan should hear Jolan\"tru");

// Klingon to Romulan
assert((new Klingon()).sayHello(new Romulan()) === hello.romulan,
  "the romulan should hear Jolan\"tru");

// Romulan to Klingon
assert((new Romulan()).sayHello(new Klingon()) === hello.klingon,
  "the klingon should hear nuqneH");

// Klingon to Human
assert((new Klingon()).sayHello(new Human()) === hello["federation standard"],
  "the human should hear hello");

// Romulan to Human
assert((new Romulan()).sayHello(new Human()) === hello["federation standard"],
  "the human should hear hello");

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one
//*********************************************************
function lastLetterSort(stringArray) {
  function byLastLetter(item1, item2) {
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // read this: http://www.w3schools.com/jsref/jsref_sort.asp
    var char1 = item1.substr(item1.length - 1);
    var char2 = item2.substr(item2.length - 1);

    if (char1 < char2) {
      return -1;
    } /* end if */ else if (char1 > char2) {
      return 1;
    } /* end else if */ else {
      return 0;
    } // end else
  } // end byLastLetter
  stringArray.sort(byLastLetter);
  return stringArray;
} // end lastLetterSort

var arrayOfStrings = [ "kitten", "cat" ];
var sorted = [ "kitten", "cat" ];
var arrayOfStrings2 = [ "emperor", "gentoo", "chinstrap" ];
var sorted2 = [ "gentoo", "chinstrap", "emperor" ];

assert(arrayCompare(lastLetterSort(arrayOfStrings), sorted) === true, "The array is not sorted");
assert(arrayCompare(lastLetterSort(arrayOfStrings2), sorted2) === true, "The array is not sorted");

function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  numberArray.forEach (function(item) {sum += item;});
  return sum;
} // end sumArray

var anArray = [ 1, 2, 3 ];
var secondArray = [];
var thirdArray = [ 4, 1 ];
var fourthArray = [ 5, 5, 5 ];

assert(sumArray(anArray) === 6, "The sum of array element values should be 6");
assert(sumArray(secondArray) === 0, "The sum of an empty array is 0");

var multiArray = [ anArray, fourthArray, thirdArray ];
var emptyArray = [ [], [] ];

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(item, item2) { // added parameter item2 for sort comparison purposes
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
    var sum1 = sumArray(item);
    var sum2 = sumArray(item2);
    return sum1 - sum2;
  });
  return arrayOfArrays;
} // end sumSort

/*
Function for comparing arrays, since array1 === array2 always returns false.
Adapted from code found here: http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript
*/
function arrayCompare (firstArray, secondArray) {
  if (firstArray.length !== secondArray.length) {
    return false;
  } // end if
  // compare each element in the arrays
  for (var index = 0; index < firstArray.length; index++) {
    if (firstArray[index] instanceof Array && secondArray[index] instanceof Array) {
      // if an array is found inside an array, recursively check them
      if (!arrayCompare(firstArray[index], secondArray[index])) {
        return false;
      } // end if
    } /* end if */ else if (firstArray[index] !== secondArray[index]) {
      return false;
    } // end else if
  } // end for
  return true; // if no differences are found, return true
} // end arrayCompare

assert(arrayCompare(sumSort(multiArray), [ [ 4, 1 ], [ 1, 2, 3 ], [ 5, 5, 5 ] ]) === true, "The arrays are not sorted");
assert(arrayCompare(sumSort(emptyArray), [ [], [] ]) === true, "The array should be the same");

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
