angular.module('angman', [])


.controller('mainController', ['$scope', '$timeout', function($scope, $timeout){

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
  $scope.alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  $scope.targetWord;
  $scope.errorMessage;
  var wordsUsed = {};
  $scope.resetTrue=false;

  var setWord = function(){
    $scope.targetWord = getWord();
    console.log($scope.targetWord);
    $scope.targetWord = angular.uppercase($scope.targetWord);
    $scope.targetWord = ($scope.targetWord).split('');
  }

  var getWord = function(){
    var wordList = ['balls', 'mousecop', 'shegma', 'twat', 'nword'];
    var randIndex = Math.floor(Math.random() * wordList.length);
    console.log(randIndex, wordList)
    if(wordsUsed[wordList[randIndex]]){ 
      return getWord();
    } else {
      wordsUsed[wordList[randIndex]] = true;
      return wordList[randIndex];
    }
  }

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
    } else if ($scope.checkIfGuessed(guess)){
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

  checkUserWin = function(){
    console.log('ngasfas')
    for (var i = 0, l = $scope.targetWord.length; i < l; i++){
      if (!$scope.checkIfGuessed($scope.targetWord[i])) return;
    }
    endGame(true);
  }

  var endGame = function(userWin){
    if(userWin){
      alert('gtfo nerd')
      console.log('you still shouldnt be proud')
    } else {
      alert("you're so STUPID");
      console.log('what a surprise, stupid')
    }
    $scope.resetTrue = true;
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
        } else {
          $timeout(checkUserWin, 100);
        }
    }
  }

  $scope.newGame = function(){
    $scope.gameActive = true;
    $scope.resetTrue = false;
    $scope.lives = 6;
    lettersGuessed = {};
    setWord();
  }

}])