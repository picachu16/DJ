song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        leftWristy = results[0].pose.leftWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
    }
}
function modelLoaded() {
    console.log("poseNet Initalized");
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("aqua");
    stroke("blue");
    if (scoreLeftWrist > 0.2) {
        circle(leftWristx, leftWristy, 20);
        leftWristyNum = Number(leftWristy);
        remove_decimals = floor(leftWristyNum);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    if (scoreRightWrist > 0.2) {
        circle(leftWristx, leftWristy, 20);
        if (rightWristy > 0 && rightWristy <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5";
            song.rate(0.5);
        }
        if (rightWristy > 100 && rightWristy <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1";
            song.rate(1);
        }
        if (rightWristy > 200 && rightWristy <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5";
            song.rate(1.5);
        }
        if (rightWristy > 300 && rightWristy <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2";
            song.rate(2);
        }
        if (rightWristy > 400 && rightWristy <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5";
            song.rate(2.5);
        }
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}