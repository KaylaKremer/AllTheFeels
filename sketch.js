let mobilenet;
let classifier;
let video;
let label = 'loading model';
let loss;

function modelReady() {
  select('#status').html('MobileNet Loaded!');
}

function videoReady() {
  console.log('Video is ready!!!');
  return { numLabels: 10 };
}

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.parent('video-container');
  video.size(640, 540);
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  classifier = mobilenet.classification(video, videoReady);
  setupButtons();
}

function setupButtons() {
  smile = select('#smile');
  smile.mousePressed(function() {
    classifier.addImage('Smile');
  });
    
  tearsOfJoy = select('#tears-of-joy');
  tearsOfJoy.mousePressed(function() {
    classifier.addImage('Tears of Joy');
  });
  
  thinking = select('#thinking');
  thinking.mousePressed(function() {
    classifier.addImage('Thinking');
  });
  
  tearsOfJoy = select('#tears-of-joy');
  tearsOfJoy.mousePressed(function() {
    classifier.addImage('Tears of Joy');
  });
  
  wink = select('#wink');
  wink.mousePressed(function() {
    classifier.addImage('Wink');
  });
  
  zany = select('#zany');
  zany.mousePressed(function() {
    classifier.addImage('Zany');
  });
  
  secret = select('#secret');
  secret.mousePressed(function() {
    classifier.addImage('Secret');
  });
  
  rollingEyes = select('#rolling-eyes');
  rollingEyes.mousePressed(function() {
    classifier.addImage('Rolling Eyes');
  });
  
  frown = select('#frown');
  frown.mousePressed(function() {
    classifier.addImage('Frown');
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
    select('#loss').html('Done Training! Final Loss: ' + loss);
    //classifier.classify(gotResults);
  } else {
    select('#loss').html('Loss: ' + loss);
  }
}


function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
      label = results[0].label;
      select('#label').html(label);
      select('#confidence').html(results[0].confidence.toFixed(2) * 100 + '%');
      classifier.classify(gotResults);
    }
}