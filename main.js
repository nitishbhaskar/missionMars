var missionMars = angular.module("MissionMars", []);

missionMars.service("missionService", function () {
	var romanRegex = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
	this.romanNumbers = {
		'I':{value : 1, name :"one", roman:"I"},
		'V' : {value : 5, name :"five", roman:"V"},
		'X' : {value : 10, name :"ten", roman:"X"},
		'L' : {value : 50, name :"fifty" , roman:"L"},
		'C' : {value : 100, name :"hundred", roman:"C" },
		'D' : {value : 500, name : "fivehundred", roman:"D"},
		'M' : {value : 1000, name : "thousand", roman:"M"}
	};

	this.Metals = {
		'Iron':{units : '',totalIronCredits:'',value:''},
		'Silver':{units : '',totalIronCredits:'',value:''},
		'Gold':{units : '',totalIronCredits:'',value:''}
	};
	var self = this;

	this.AssignValuesForMetals = function(){
		if(this.Metals.Iron.units && this.Metals.Iron.totalIronCredits){
			var UnitsOfIronInRoman = self.GetTheRomanEquivalent(this.Metals.Iron.units);
			var UnitsIron =self.GetHinduArabicNumber(UnitsOfIronInRoman);
			this.Metals.Iron.value = this.Metals.Iron.totalIronCredits / UnitsIron;
		}
    if(this.Metals.Silver.units && this.Metals.Silver.totalSilverCredits){
      var UnitsOfSilverInRoman = self.GetTheRomanEquivalent(this.Metals.Silver.units);
      var UnitsSilver =self.GetHinduArabicNumber(UnitsOfSilverInRoman);
      this.Metals.Silver.value = this.Metals.Iron.totalSilverCredits / UnitsSilver;
    }
    if(this.Metals.Gold.units && this.Metals.Iron.totalGoldCredits){
      var UnitsOfGoldInRoman = self.GetTheRomanEquivalent(this.Metals.Gold.units);
      var UnitsGold =self.GetHinduArabicNumber(UnitsOfGoldInRoman);
      this.Metals.Gold.value = this.Metals.Gold.totalIronCredits / UnitsGold;
    }
	};

  this.CalculateTotalCredits = function(){
    self.AssignValuesForMetals();
    var inputText = this.input;
    var romanEquivalent = self.GetTheRomanEquivalent(inputText);
    var arabicNumber = self.GetHinduArabicNumber(romanEquivalent);
    var words = inputText.split(" ");
    var metal = words[words.length -1];
    var metalObject = this.Metals[metal];
    if(metalObject){
      this.arabic = arabicNumber * metalObject.value;
    }

  };

	this.GetTheRomanEquivalent = function(codeWord){
		var inputText = codeWord;
		var words = inputText.split(" ");
		var extractedRoman ="";
		_.each(words, function(oneWord){
			extractedRoman+=self.getRomanEquivalent(oneWord);
		});
		return extractedRoman;
	};

	this.GetHinduArabicNumber = function(input){
		this.roman = input;
		var i=this.roman.length - 1;
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
				return value;
			}
			else{
				return "Invalid roman numeral";
			}
		}
		else{
			return "Invalid roman numeral";
		}
	};

	this.checkForValue = function(){
		var inputText = this.input;
		var words = inputText.split(" ");
		var extractedRoman ="";
		_.each(words, function(oneWord){
			extractedRoman+=self.getRomanEquivalent(oneWord);
		});
		this.roman = extractedRoman;
		var i=this.roman.length - 1;
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
