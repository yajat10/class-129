rightWristx=0;
rightWristy=0;
leftWristx=0;
leftWristy=0;

song=""
function setup(){
    canvas=createCanvas(600,500)
    canvas.center()

    video=createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotposes)
}
function modelLoaded(){
    console.log("model is loaded!");
}
function draw(){
    image(video,0,0,600,500)
    fill("red");
    stroke("red");
    circle(leftWristx,leftWristy,21)
    leftWrist_Number=Number(leftWristy);
    volume=floor(leftWristy);
    exactVolume=volume/500;
    document.getElementById("volume_id").innerHTML="Volume:- "+exactVolume;
    song.setVolume(exactVolume)

}
function preload(){
    song=loadSound("music.mp3")
}
function start_song(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}
function gotposes(result){
    if(result.lenght>0){
        console.log(result);
        rightWristx=result[0].pose.rightWrist.x;
        leftWristx=result[0].pose.leftWrist.x;
        leftWristy=result[0].pose.leftWrist.y;
        rightWristy=result[0].pose.rightWrist.y;
    }
}