//Request for list of songs from server
$.post('song_list', function(song_list) {
    var songz = song_list.split("\n")
    var out = ''
    var curr
    for (var i=0; i < songz.length; i++){
	curr = songz[i]
	out += '<option value="' + curr + '">' 
	    + curr.substring(0, curr.length-4) + '</option>'}
    $('#songs').html(out)
})

var start = 0
var stop  = 10

function slide(n) {
    $('#slider').slider({
	range: true,
	min: -5, //negatives, warm-up time
	max: n,
	values: [0, n],
	slide: function(event, ui){
	    start = ui.values[0]
	    stop = ui.values[1]
	}})}

var player

var still = true
var curr = -1
function timeCheck(){
    if (player.currentTime > stop || player.currentTime < start)
       player.currentTime = start
    if (still){
	var gnu = player.buffered.end(0)
	if (gnu==curr){
	    var max = Math.ceil(curr)
	    slide(max)
	    stop = max
	    still = false
	}
	curr = gnu
    }
}

function initialize(){
    player = $('#player')[0]
    player.controls = true
    player.addEventListener('error', function(){
	console.log(player.error)} , false)
    player.addEventListener('timeupdate', timeCheck, false)
}

function picked(){
    var song = $('#songs')[0].value
    if(song == '') return  //if no file songs, return
    if(! player){initialize()} //only run on 1st time clicked
    player.src = song
    player.play()
    
}

