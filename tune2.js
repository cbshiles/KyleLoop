function geT(id) { return document.getElementById(id) }

function picked(){
    var selc = geT("selected")
    selc.style.display="none" //Hide element
    switch_song(selc.value)   //Use selected file
}

function switch_song(fName)
{
//    var song = geT("current_song")
 var song = new Audio()
    song.addEventListener('error', reset, false)
//    song = new Audio()
    console.log(fName)
    song.src = fName
//    song.autoplay = song.loop = song.controls = true
    song.autoplay = true
    song.loop = true
    //song.controls = true
    song.play()


    function reset()
    {
	console.log(song.error)
//	song.currentTime = beg
//	song.play
    }
}


//function verify(fname)
//Verifies that a file name indicates

//    song.addEventListener('error', nutin, false)
