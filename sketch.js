let mobilenet;
let classifier;
let video;
let label = 'loading model';
let loss;

function modelReady() {
  select('#status').html('MobileNet Loaded!');
}

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.parent('video-container');
  video.size(650, 325);
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, { numLabels: 10 });
  setupButtons();
}

function setupButtons() {
  happy = select('#happy');
  happy.mousePressed(function() {
    classifier.addImage('Happy');
  });
    
  humor = select('#humor');
  humor.mousePressed(function() {
    classifier.addImage('humor');
  });
  
  inquisitive = select('#inquisitive');
  inquisitive.mousePressed(function() {
    classifier.addImage('Inquisitive');
  });
  
  flirty = select('#flirty');
  flirty.mousePressed(function() {
    classifier.addImage('Flirty');
  });
  
  crazy = select('#crazy');
  crazy.mousePressed(function() {
    classifier.addImage('Crazy');
  });
  
  secretive = select('#secretive');
  secretive.mousePressed(function() {
    classifier.addImage('Secretive');
  });
  
  annoyed = select('#annoyed');
  annoyed.mousePressed(function() {
    classifier.addImage('Annoyed');
  });
  
  sad = select('#sad');
  sad.mousePressed(function() {
    classifier.addImage('Sad');
  });
  
  scared = select('#scared');
  scared.mousePressed(function() {
    classifier.addImage('Scared');
  });
  
  angry = select('#angry');
  angry.mousePressed(function() {
    classifier.addImage('Angry');
  });
  
  train = select('#train');
  train.mousePressed(function () {
    classifier.train(whileTraining);
  });
  
  predict = select('#predict');
  predict.mousePressed(function () {
    classifier.classify(gotResults);
  });

}

function whileTraining(loss) {
  if (loss == null) {
    select('#loss').html('');
    select('#status').html('Finished Training');
  } else {
    select('#loss').html(' Loss: ' + loss);
    select('#status').html('Training...');
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
      label = results[0].label;
      select('#label').html(label);
      select('#confidence').html(results[0].confidence.toFixed(2) * 100 + '%');
      classifier.classify();
    }
}