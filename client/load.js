function download()
{
    $.post('ytdl', $('#iVal')[0].value,  function(ret_val){
	alert("Song was added to the server "+ret_val)
    })
}
