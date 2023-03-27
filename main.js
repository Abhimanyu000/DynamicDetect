video="";
status="";
objects=[];
percent="";

function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(500, 400);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 500, 400);

    if(status!=""){
        object_detected.detect(video, gotResults);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Object detected";
            document.getElementById("number").innerHTML=objects.length+" objects detected";

            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    object_detected=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Object Detection Begun";
}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0.6);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;

    }
}