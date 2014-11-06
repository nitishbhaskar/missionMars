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

	this.Metals = [{units : '',totalCredits:'',value:'',name:'iron'},
	{units : '',totalCredits:'',value:'', name:'silver'},
	{units : '',totalCredits:'',value:'', name:'gold'}];

	var self = this;

	this.AssignValuesForMetals = function(){
		_.each(this.Metals,function(metal){
			if(metal.units && metal.totalCredits){
				var UnitsInRoman = self.GetTheRomanEquivalent(metal.units);
				var Units =self.GetHinduArabicNumber(UnitsInRoman);
				metal.value = metal.totalCredits / Units;
			}
		});
/*
		if(this.Metals.Iron.units && this.Metals.Iron.totalCredits){
			var UnitsOfIronInRoman = self.GetTheRomanEquivalent(this.Metals.Iron.units);
			var UnitsIron =self.GetHinduArabicNumber(UnitsOfIronInRoman);
			this.Metals.Iron.value = this.Metals.Iron.totalCredits / UnitsIron;
		}
    if(this.Metals.Silver.units && this.Metals.Silver.totalCredits){
      var UnitsOfSilverInRoman = self.GetTheRomanEquivalent(this.Metals.Silver.units);
      var UnitsSilver =self.GetHinduArabicNumber(UnitsOfSilverInRoman);
      this.Metals.Silver.value = this.Metals.Silver.totalCredits / UnitsSilver;
    }
    if(this.Metals.Gold.units && this.Metals.Gold.totalCredits){
      var UnitsOfGoldInRoman = self.GetTheRomanEquivalent(this.Metals.Gold.units);
      var UnitsGold =self.GetHinduArabicNumber(UnitsOfGoldInRoman);
      this.Metals.Gold.value = this.Metals.Gold.totalCredits / UnitsGold;
    }*/
	};

  this.CalculateTotalCredits = function(){
    self.AssignValuesForMetals();
    var inputText = this.input;
    var romanEquivalent = self.GetTheRomanEquivalent(inputText);
    var arabicNumber = self.GetHinduArabicNumber(romanEquivalent);
    var words = inputText.split(" ");
    var metal = words[words.length -1];
    var metalObject = _.where(this.Metals, {name:metal});
    if(metalObject){
      this.arabic = arabicNumber * metalObject[0].value;
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
