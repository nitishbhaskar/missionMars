var missionMars = angular.module("MissionMars",[]);

missionMars.service("missionService",function(){
  this.romanNumbers = {'I':{value : 1, name :"one", roman:"I"},
  'V' : {value : 5, name :"two", roman:"V"},
  'X' : {value : 10, name :"three", roman:"X"},
  'L' : {value : 50, name :"four" , roman:"L"},
  'C' : {value : 100, name :"five", roman:"C" },
  'D' : {value : 500, name : "six", roman:"D"},
  'M' : {value : 1000, name : "seven", roman:"M"}
  };

var romanRegex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
var self = this;
  this.checkForValue = function(){
    var inputText = this.input;
    var words = inputText.split(" ");
    var extractedRoman ="";
    _.each(words, function(oneWord){
      extractedRoman+=self.getRomanEquivalent(oneWord);
    });
    this.roman = extractedRoman;
    var i=this.roman.length - 1;
    console.log(extractedRoman);
    if(romanRegex.test(this.roman) && this.roman.length > 0){
      var k = this.romanNumbers[this.roman[i]].value;
      for(i; i>0; i--){
        if(this.romanNumbers[this.roman[i]].value>this.romanNumbers[this.roman[i-1]].value)
          k= k-this.romanNumbers[this.roman[i-1]].value;
          else if(this.romanNumbers[this.roman[i]].value==this.romanNumbers[this.roman[i-1]].value
            || this.romanNumbers[this.roman[i]].value < this.romanNumbers[this.roman[i-1]].value)
            k=k+this.romanNumbers[this.roman[i-1]].value;
      }
      var value = k;
      if(value){
        this.arabic = value;
      }
      else{
        this.arabic = "Invalid roman numeral";
      }
    }
    else{
      this.arabic = "Invalid roman numeral";
    }
  };

  this.getRomanEquivalent = function(word){
    var number = _.where(this.romanNumbers,{name:word})
    if(number.length > 0){
      return number[0].roman;
    }
    else{
      return number;
    }
  };

});

missionMars.controller("mainMission",['$scope', '$rootScope','missionService',
function($scope, $rootScope, missionService){
  $scope.Main = missionService;
}]);
