Prediction_1 = "";
Prediction_2 = "";

Webcam.set ({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 90
});
camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap (function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_img' src='" + data_uri + "' />";
    });

}

console.log("ml5 version - " + ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/7AugPSoia/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model is loaded");
}

function Speak() {
    synth = window.speechSynthesis;
    speech_data1 = "The First Prediction Is - " + Prediction_1; 
    speech_data2 = "And The Second Prediction Is - " + Prediction_2;
    utterthis = new SpeechSynthesisUtterance(speech_data1 + speech_data2);
    synth.speak(utterthis);
}

function Check_image() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        Prediction_1 = results[0].label;
        Prediction_2 = results[1].label;

        document.getElementById("result_emotion_name_1").innerHTML = Prediction_1;
        document.getElementById("result_emotion_name_2").innerHTML = Prediction_2;
        Speak();

        if (Prediction_1 == "Happy") {
            document.getElementById("update_emoji_1").innerHTML = "&#128522;";
        }
        if (Prediction_1 == "Sad") {
            document.getElementById("update_emoji_1").innerHTML = "&#128532;";
        }
        if (Prediction_1 == "Angry") {
            document.getElementById("update_emoji_1").innerHTML = "&#128545;";
        }

        if (Prediction_2 == "Happy") {
            document.getElementById("update_emoji_2").innerHTML = "&#128522;";
        }
        if (Prediction_2 == "Sad") {
            document.getElementById("update_emoji_2").innerHTML = "&#128532;";
        }
        if (Prediction_2 == "Angry") {
            document.getElementById("update_emoji_2").innerHTML = "&#128545;";
        }
    }
}