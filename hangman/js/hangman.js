var hangman = angular.module('hangman', []).controller('StartHangman', StartHangman);
  function StartHangman($scope, $document)
  {
    $scope.stage = "initial";
    $scope.secretWords = "";
    $scope.answer = "";
    $scope.failedGuess = [];
    var hasWon = function()
    {
      var foundDash = $scope.answer.search(/-/);
      return (foundDash == -1);
    }
    var hasLost = function()
    {
      return ($scope.failedGuess.length >= 8);
    }
    $scope.startGame = function()
    {
      $scope.secretWords = $scope.secretWords.toLowerCase();
      if ($scope.secretWords == "1")
      {
        var words = localStorage.getItem("words");
        words = words.split(' ')
        function getRandomInt(min, max)
        {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min;
        }
        a = getRandomInt(0,2243);
        $scope.secretWords = words[a];
      }

      for(i in $scope.secretWords)
      {
        $scope.answer += $scope.secretWords[i] == ' ' ? ' ' : '-';
      }
      $scope.stage = "play"
    }
    $scope.guess = function(ch)
    {
      ch = ch.toLowerCase();
      $scope.charGuess = "";
      if(ch.length != 1)
      {
        if(ch.length > 1)
        {
          alert("Please only enter one character at a time");
        }
      return ;
    }
    /* If ch is already in the failed guess list */
    for(i in $scope.failedGuess)
    {
      if(ch == $scope.failedGuess[i]) return ;
    }
    /* Check if it's part of the answer */
    var found = false;
    $scope.answer = $scope.answer.split(""); /* convert to array of char */
    for(i in $scope.secretWords)
    {
      if($scope.secretWords[i] === ch)
      {
        found = true;
        $scope.answer[i] = ch;
      }
    }
    $scope.answer = $scope.answer.join(""); /* convert back to string */
    if(!found)
    {
      $scope.failedGuess.push(ch);
    }
    if(hasWon())
    {
      $scope.stage = "won";
    }
    if(hasLost())
    {
      $scope.stage = "lost";
    }
  }
}
