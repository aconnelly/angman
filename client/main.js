angular.module('angman', [])


.controller('mainController', ['$scope', function($scope){

  //scope.alphabet
  //scope.targetWord
  //lettersGuessedSoFar
  //currentGuess
  //scope.lives
  //
  //
  //alphabet box
  //   ngclass
  //     .guessed 
  //     .correctGuess
  //  
  //input
  //  guess word option(ng-if?)
  //  model = scope.currentGuess
  //  fn checkGuess(scope.currentGuess)
  //  
  //targetWord
  //   ng repeat 
  //     div border bottom
  //     ng show letter
  //     
  // checkGuess
  //   toUppercase
  //   add to lettersGuessedSoFar
  //   check if correct
  //     subtract from lives if wrong
  //
  //  
  //  




  var lettersGuessed = {};

  $scope.lives = 6;

  $scope.targetWord;
  $scope.alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  $scope.errorMessage;

  var checkValidGuess = function(){
    //scope.guess exists
    //  guess is one character
    //  guess has not been guessed yet
    //  guess is in the alphabet
    var errMsg = "";
    var guess = angular.uppercase($scope.guess);
    if(!guess){
      errMsg = "Enter a letter to guess";
    } else if(guess.length !== 1){
      errMsg = "One letter at a time, chump";
    } else if (!/^[A-Z]+$/.test(guess)){
      errMsg = "Please guess a valid character";
    } else if (checkIfGuessed(guess)){
      errMsg = "You already guessed that letter!";
    } else {
      return true;
    
    }

    $scope.errorMessage = errMsg;
    return false;
    
  }

  var letterInTargetWord = function(letter){
    return $scope.targetWord.indexOf(letter) > -1;
  }

  var loseALife = function(){
    $scope.lives--;
    if (!$scope.lives){
      console.log("YOURE STUPID")
      endGame(false);
    }
  }
  
  $scope.getLives = function(numberOfLives) {
    return new Array(numberOfLives);   
  }


  $scope.checkIfGuessed = function(letter){
    return lettersGuessed[letter];
  }

  $scope.checkIfCorrectGuess = function(letter){
    return $scope.checkIfGuessed(letter) && letterInTargetWord(letter);
  }


  $scope.submitGuess = function(){
    if (checkValidGuess()){
        var guess = angular.uppercase($scope.guess)
        $scope.guess="";
        lettersGuessed[guess] = guess;
        if (!letterInTargetWord(guess)){
          loseALife();
        }
    }
  }

  $scope.endGame = function(userWin){
    if(userWin){
      alert('gtfo nerd')
      console.log('you still shouldnt be proud')
    } else {
      alert("you're so STUPID");
      console.log('what a surprise, stupid')
    }
  }

  $scope.setWord = function(){
    $scope.targetWord = 'mousecap';
    $scope.targetWord = angular.uppercase($scope.targetWord);
    $scope.word = ($scope.targetWord).split('');
    console.log($scope.word);
  }

}])