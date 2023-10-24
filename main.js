video = "";
objects = [];
function preload() {
video = createVideo('video.mp4');
video.hide()
}
function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
}
function draw() {
    image(video, 0,0,480,380);
    if ( status != "") {
        objectDetector.detect(video, gotresults);
        for ( i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Objects are being detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected:" + objects.length;
        fill("#FF000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + "%", objects[i].y + 15, objects[i].x + 15);
        noFill();
        stroke("#FF000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       
            
        }
    }

}

function gotresults(error, results) {
    if (error) {
        console.error("erorr")
    }
    console.log("results");
    objects = results;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function modelLoaded(params) {
console.log("Model Loaded");
status = true;
video.loop();
video.speed(1);
video.volume(0);
}


