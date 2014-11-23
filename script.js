function geT(id) { return document.getElementById(id) }

function print(thing) {
    geT("demo").innerHTML = thing
}

function solve(n)
{
    console.log(n)
    while ( n > 1 ) {
    if ((n % 3) != 0)
	{ 
	    n = n - 5 
    } else {
	    return solve (n / 3) || solve (n - 5)
	}
    }
    return (n == 1)
}

function solver() {
    print(solve(geT("iVal").value))
}

function findSolution(target) {
  function find(start, history) {
    if (start == target)
      return history;
    else if (start > target)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}

// → (((1 * 3) + 5) * 3)
