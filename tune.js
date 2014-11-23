function loadSong (path, beg, end)
{
    var song = document.getElementById("yaa")
    console.log ("beg: " + beg + "\n end: " + end)
    song.src = path + "#t=" + beg + "," + end
    song.autoplay = true
    song.loop = true
    song.controls = true
    song.play()
    song.addEventListener('error', reset, false)

    function reset()
    {
	console.log("yeee")
//	song.currentTime = beg
//	song.play
    }
}

function implemented ()
{
    console.log(typeof song.loop == 'boolean')
}
