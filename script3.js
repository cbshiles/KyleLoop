 var person = {
	firstName: "Penelope",
	lastName: "Barrymore",
	fullName: function () {
	console.log(this.firstName + " " + this.lastName);
	console.log(person.firstName + " " + person.lastName);
	}
	}

function makePerson(fName, lName)
{
    return {
	firstName: fName,
	lastName: lName,
	fullName: function () {
	    	console.log(this.lastName + ", " + this.firstName);
	}
    }
}

function someFunction() { ; }
