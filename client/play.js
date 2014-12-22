var player

//Get a drop down menu (a select) in a form and do a ls
//or some other method of getting all the song name to populate
//that select. Then, of course play whatever was chosen

function initialize(){
    player = $('#player')[0]
    player.controls = true
    player.addEventListener('error', function(){
	console.log(player.error)} , false)
}

function picked(){
    console.log('hey')
    console.log($('#selected'))
    console.log($('#selected')[0].value)
    var path = $('#selected')[0].value
    if(path == '') return  //if no file selected, return
    if(! player){initialize()} //only run on 1st time clicked
    player.src = path
    player.play()
}

