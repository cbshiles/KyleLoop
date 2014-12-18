var init = true
var player

function initialize(){
    player = $('#player')[0]
    player.controls = true
    player.addEventListener('error', function(){
	console.log(player.error)} , false)
    init = false
}

function picked(){
    var path = $('#selected')[0].value
    if(path == '') return  //if no file selected, return
    if(init){initialize()} //only run on 1st time clicked
    player.src = path
    player.play()
}

