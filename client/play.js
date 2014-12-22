var player

//Get a drop down menu (a select) in a form and do a ls
//or some other method of getting all the song name to populate
//that select. Then, of course play whatever was chosen

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

function initialize(){
    player = $('#player')[0]
    player.controls = true
    player.addEventListener('error', function(){
	console.log(player.error)} , false)
}

function picked(){
    var song = $('#songs')[0].value
    if(song == '') return  //if no file songs, return
    if(! player){initialize()} //only run on 1st time clicked
    player.src = song
    player.play()
}

