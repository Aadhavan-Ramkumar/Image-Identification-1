Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

Camera = document.getElementById("Camera");

Webcam.attach("Camera");

function TakeASnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("Snapshot").innerHTML = "<img id='CapturedImage' src='" + data_uri + "'/>";
    });
}

console.log("ml5 version:'", ml5.version);
Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/rbFJojDKs/model.json", ModelLoaded);

function ModelLoaded() {
    console.log("Model Loaded!");
}

function Identify() {
    Img = document.getElementById("CapturedImage");
    Classifier.classify(Img, GetResult);    
}

function GetResult(Error, Results) {
    if (Error) {
        console.error(Error);
    } else {
        console.log(Results);
        document.getElementById("ObjectName").innerHTML = "Object: " + Results[0].label;
        document.getElementById("ObjectAccuracy").innerHTML = "Accuracy: " + (Results[0].confidence).toFixed(3) * 100 + "%";
    }
}