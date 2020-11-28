let input;
let vid;
let play = false;  
let markers = [];
let nmarkers = 1;
let currentMarker = 0;

function setup() {
    createCanvas(500,500);
    // input = createFileInput(loadVideo);
    vid = createVideo('video.mp4')
    vid.hide();
    vid.play();
    noLoop()
    graphButton = createButton('Show graph')
    digitiseButton = createButton('Digitise')
    markerButton = createButton('Add new marker')

    // Start with one marker
    temp = new Marker(nmarkers);
    markers.push(temp);
}

function draw() {

    // Start digitising
    digitiseButton.mousePressed(_ => {loop(); vid.stop()})

    let x = mouseX;
    let y = height - mouseY;
    image(vid,0,0,width,height);
    noFill();
    stroke(255,0,0);
    ellipse(mouseX,mouseY,10,10);
    // console.log(x,y);

    // Add to arrays
    if (play) {
        markers[currentMarker].add(x,y);
    }

    // Set play = false if video ends
    vid.onended(_ => play = false);

    // Show graph
    graphButton.mousePressed(showGraph);

    // Add another marker
    markerButton.mousePressed(addMarker);

}

function keyPressed() {
    // Play/pause video
    if (keyCode == 32 & !play) {
        vid.play();
        play = true;
    } else if (keyCode == 32 & play) {
        vid.pause()
        play = false;  
    }
    // Half playback rate
    if (keyCode == 83) {
        vid.speed(0.5)
    }
}

function showGraph() {
    background(255);
    noLoop();
    for (let i = 0; i < px.length; i++) {
        let x = px[i];
        let y = height - py[i];
        ellipse(x,y,5,5)
    }
    vid.stop()

    digitiseButton.mousePressed(_ => loop())
}

function addMarker() {
    nmarkers++;
    temp = new Marker(nmarkers)
    markers.push(temp);
    currentMarker = nmarkers - 1;
}

// function loadVideo() {
//     // console.log(input)
//     vid = createVideo(input);
//     // vid.hide();
//     // vid.play();
//     vid.play()
// }

class Marker {    
    constructor(num) {
        this.num = num;
        this.X = [];
        this.Y = [];
    
    }

    // Adds an x,y point to X,Y arrays
    add(x,y) {
    this.X.push(x);
    this.Y.push(y);
    }


}