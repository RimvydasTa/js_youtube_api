


$(document).ready(function(){
    var key = "AIzaSyDHwWehFN66QEE8REGglR31oQEg1Q8pdCk";
    var playlistId = 'PL2fnLUTsNyq7A335zB_RpOzu7hEUcSJbB';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems'; 
    

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId
    };

    function loadVideos (){
        $.getJSON(URL, options, function(data){
            console.log(data);
           var id = data.items[0].snippet.resourceId.videoId;
         

           mainVideo(id);
           resultsLoop(data);
        });
    }

    function resultsLoop(data){

        $.each(data.items, function(i, item){
            var title = item.snippet.title;
            var description = item.snippet.description;
            var thumbnail = item.snippet.thumbnails.medium.url;
            var videoId = item.snippet.resourceId.videoId;
            
            $('main').append(`
            <article class="item" data-key="${videoId}">
                    <img src="${thumbnail}" alt="" class="thumb">
                    <div class="details">
                        <h4>${title}</h4>
                        <p>${description}</p>
                    </div>
                </article>
    
            `);
        });
      
    }

    function mainVideo(id){
        $("#video").html(
            `<iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/${id}" 
            frameborder="0" allow="autoplay; 
            encrypted-media" 
            allowfullscreen>
            </iframe>
            `
        );
       
    }
    $('main').on('click','article', function(){
        var id = $(this).attr('data-key');
        mainVideo(id);
    });
   
    loadVideos();
});