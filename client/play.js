//Request for list of songs from server
$.post('song_list', function(song_list) {
    var songz = song_list.split("\n")
    var out = ''
    for (var i=0; i < songz.length; i++){
	ith = songz[i]
	if (ith){
	out += '<option value="' + ith + '">' 
	    + ith.substring(0, ith.length-4) + '</option>'}}
    $('#songs').html(out)
})

var player
var pause = 0

function picked(){
    var song = $('#songs')[0].value
    if(song == '') return  //if no file songs, return
    if(! player){initialize()} //only run on 1st time clicked
    player.src = song
    loading = true
    player.play()
 }

function initialize(){
    player = $('#player')[0]
    player.controls = true
    player.addEventListener('error', function(){
	console.log(player.error)} , false)
    player.addEventListener('timeupdate', timeCheck, false)
}

var curr = -1
function timeCheck(){
    if (loading){ //for initializing slider range & textbox values 
	var gnu = player.buffered.end(0)
	if (gnu==curr){
	    max = Math.ceil(curr)
	    slide(max)
	    fresh([0, max])
	    loading = false
	}
	curr = gnu
    } else { //for looping the song
	if (player.currentTime > stop || player.currentTime < start)
	    restart()
    }
}

function restart()
{
    player.pause()
    setTimeout(function(){player.currentTime = start; player.play()}, pause)
}

function trim(x){
    if (x < 0) return 0
    if (x > max) return max
    return x
}

function order(a, b){
    return (a>b) ? [b, a] : [a,b]
}

function fresh(vals){
    $('#slider').slider('values', vals)
    start = $('#starT')[0].value = vals[0]
    stop = $('#sTop')[0].value = vals[1]
}

function slide(n) {
    $('#slider').slider({
	range: true,
	min: 0,
	max: n,
	values: [0, n],
	slide: function(event, ui){
	    fresh(ui.values)
	}})}

function reloop(){
    fresh(order(trim($('#starT')[0].value), trim($('#sTop')[0].value)))
    pause = 1000 * $('#halT')[0].value
    restart()
}


