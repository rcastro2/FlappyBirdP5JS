var images={},audios={}
var image_sources = {
        "bird":"bird.png",
        "day":"day.png",
        "night":"night.png",
        "ring":"ring2.png",
        "pipeTop":"pipe_top.png",
        "pipeBot":"pipe_bot.png",
        "bar":"bar.png",
        "endTitle":"flappybird_end.png",
        "startTitle":"logo.png"
    };
var audio_sources = {
        "hit":"sfx_hit.ogg",
        "point":"sfx_point.ogg",
        "wing":"sfx_wing.ogg",
        "gameOver":"hitObstacle_sound.ogg"
    };

function preload(){
    for(var key in image_sources){
        images[key] = loadImage("images/" + image_sources[key]);
    }
    for(var key in audio_sources){
        audios[key] = loadSound("audios/" + audio_sources[key]);
    }
}