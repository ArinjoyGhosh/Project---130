lx = 0;
ly = 0;
rx = 0;
ry = 0;
sRight = 0;
statusSong1 = "true";
statusSong2 = "true";
scoreLeft = 0; //sl = 0 : Code removed

function setup() {
    canvas = createCanvas(300, 300);
    canvas.position(425, 210);

    video = createCapture(VIDEO);
    video.position(canvas.x, canvas.y);


    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    srk = loadSound('Darr Kiran.mp3');
    bshah = loadSound('shehar ki ladki.mp3');
}

function modelLoaded() {
    console.log('Model Loaded!');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log('Got Results');
        console.log(results);

        lx = results[0].pose.leftWrist.x;
        ly = results[0].pose.leftWrist.y;
        rx = results[0].pose.rightWrist.x;
        ry = results[0].pose.rightWrist.y;

        scoreLeft = results[0].pose.keypoints[9].score;
        scoreRight = results[0].pose.keypoints[10].score;
        draw();
    }
}

function draw() {
    
    if (scoreLeft > 0.07) {  // No longer '0.000002'. Changed to '0.2'
        console.error('scoreLeft entered');
        if(statusSong2 == 'true') {
        fill("#EE1C03");
        circle(lx, ly, 50);
        srk.play();
        bshah.stop();
        document.getElementById('h2').innerHTML = 'Jaadu Teri Nazar';
        statusSong1 = 'true';
        statusSong2 = 'false';
    }
}
    else if (scoreRight > 0.000995) {
        console.error('scoreRight entered');
        if(statusSong1 == 'true') {
        fill("#EE1C03");
        circle(rx, ry, 50);
        bshah.play();
        srk.stop();
        document.getElementById('h2').innerHTML = 'Sheher Ki Ladki';
        statusSong2 = 'true';
        statusSong1 = 'false';
    }
}
}
