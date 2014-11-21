function range(a, b) 
{
    var c = a; var arr = []
    while (c <= b)
    {
	arr.push(c)
	c = c + 1
    }
    return arr
}

function sum(arr)
{
    var s=0
    for (var i=0; i < arr.length; i++)
    {
	s = s + arr[i]
    }
    return s
}

function lzt_it(arr)
{
    var list = {
	value: arr[0],
	rest: null
    }
    var prev = list

    for (var i=1; i < arr.length; i++)
    {
	var next  = {
	    value: arr[i],
	    rest: null
	}
	prev.rest = next
	prev = next
    }
    return list
}

function test_obj(po)
{
    if (typeof po == 'object' && po != null)
    {
	for (var key in po) { console.log(key + ": " + po[key]);  } 
    }
	else { return false; }
}

function reduce(array, combine, start) {
//It's dewlzt!!!
  var current = start;
  for (var i = 0; i < array.length; i++)
    current = combine(current, array[i]);
  return current;
}
