var player

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

