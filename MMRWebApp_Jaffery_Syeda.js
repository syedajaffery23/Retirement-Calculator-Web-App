/**
 * Make Me Rich Web App
 */
 
"use strict";

// declare and initialize variables
var startingAge 	= 0;
var startingSalary	= 0;
var annualRaise 	= 0;
var retirementAge	= 0;
var annualSavings	= 0;
var intRate         = 0;

var totalYearsToInvest 	= 0;
var retirementFund 		= 0;
var lifetimeSalary 	    = 0;
var totalSaved  		= 0;
var earnedInterest		= 0;

var currentSavings      = 0;
var interest            = 0;
var rFund               = 0;

var rowNum              = 1;

var detailTable;
var summaryTable;  
var inputTable;

// initializes the table variables by using table ids
function initialize() {
	detailTable     = document.getElementById('detail');
	summaryTable    = document.getElementById('summary');
	inputTable      = document.getElementById('input');
}

// uses a loop to clear all form inputs
function clearInput(form){
    var formElements = form.elements;
	for (var i=0; i< formElements.length; i++)
        formElements[i].value="";
    
}

// resets the input values to the default values
function loadDefault(form){
    form.reset();
}

// converts the value of the given id in a numerical form
function getNumber(id){
    return Number(document.getElementById(id).value);
}

// calculates the values and generates the html form 
function calculate(form){

    // check if inputs are valids, displays an error alert otherwise
    if(!form.checkValidity()){
        alert("errors in input, please enter valid values");
    } else {

        // get the numerical values for all inputs
        // also divide by 100 to get percent values
        startingAge     = getNumber('startAge');
        startingSalary  = getNumber('startSal');
        retirementAge   = getNumber('retireAge');
        annualRaise     = getNumber('annualRaise')/100;
        annualSavings   = getNumber('annualSav')/100;
        intRate         = getNumber('intRate')/100;

        // substract current age from retirement age to get years to invest
        totalYearsToInvest = retirementAge - startingAge;
        
        // display the value for years to invest by replacing the inner HTML
        document.getElementById("yrsInv").innerHTML = totalYearsToInvest;

        // clear the table before starting new calculations
        //clearTable(detailTable);

        // claculate and display each value until reaching the retirement age
        for (let age = startingAge; age <= retirementAge; age++) {
            
            // Math calculations to derive values for savings, interest and retirement 
            currentSavings = startingSalary * annualSavings;
            interest = intRate * (currentSavings+rFund);
            rFund += (currentSavings + interest);   
    
            // Modify the Dom to add rows to details table
            var row = detailTable.insertRow(rowNum);
			var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);

            //add rows to the Details table
            // use formatNumberWithCommas function to round numbers and add commas
			cell0.innerHTML = age;
			cell1.innerHTML = formatNumberWithCommas(startingSalary);
            cell2.innerHTML = formatNumberWithCommas(currentSavings);
            cell3.innerHTML = formatNumberWithCommas(interest);
            cell4.innerHTML = formatNumberWithCommas(rFund);

			rowNum++;

            /*
            console.log(age, Math.round(startingSalary), Math.round(currentSavings), 
            Math.round(interest), Math.round(rFund));
            */
           //increment all values to use in summary table after for-loop ends
            lifetimeSalary += startingSalary;
            totalSaved += currentSavings;
            earnedInterest += interest;
            startingSalary += (startingSalary*annualRaise);
        } //end for loop

        // display values in the summary table by relacing the inner HTML
        // use formatNumberWithCommas function to round numbers and add commas
        document.getElementById("rfund").innerHTML      = formatNumberWithCommas(rFund);
        document.getElementById("lSalary").innerHTML    = formatNumberWithCommas(lifetimeSalary);
        document.getElementById("tSaved").innerHTML     = formatNumberWithCommas(totalSaved);
        document.getElementById("earnInt").innerHTML    = formatNumberWithCommas(earnedInterest);
    } // end else
} // end calculate function

//function to clear all table values
function clearTable(table){
    for (var i = table.rows.length; i > 1; i--) {
		table.deleteRow(i-1);
    }
}