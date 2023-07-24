cancion = "";
function preload(){
    cancion = loadSound("Hummingbird.mp3");
}

manoIzqX = 0;
manoIzqY = 0;
manoDerX = 0;
manoDerY = 0;
manoIzqPuntos = 0;
manoDerPuntos = 0;
function setup(){
    canvas = createCanvas(600, 540);
    canvas.center();
    background("red")
    video = createCapture("VIDEO");
    video.hide();
    video.size(600, 540);
    modelo = ml5.poseNet(video, listo);
    modelo.on("pose", respuesta);
}

function draw(){
    image(video, 0, 0, 600,540);
    if(manoDerPuntos > 0.2){
        velocidad = 1;
        if(manoDerY < 108){
             velocidad = 5;
        }else if(manoDerY < 216){
            velocidad = 4;
        }else if(manoDerY < 324){
            velocidad = 3;
        }else if(manoDerY < 432){
            velocidad = 2;
        }else if(manoDerY < 540){
            velocidad = 1;
        }
        cancion.rate(velocidad);
        document.getElementById("velocidad").innerHTML = "Velocidad: " + velocidad;
    }
    if(manoIzqPuntos > 0.2){
        volumen = (manoIzqY * 5) / 540;
        volumen = 5 - volumen;
        volumen = Math.round(volumen * 100) / 100;
        document.getElementById("volumen").innerHTML = "Volumen; " + volumen;
        cancion.setVolume(volumen);
    }
}



function reproducir(){
    if(!cancion.isPlaying()){
        cancion.play();
        cancion.rate(1.3)
        cancion.setVolume(1)
    }
}

function detener(){
    cancion.stop();
}

function listo(){
    console.log("que inicie 🤘🏻");
}

function respuesta(resultados){
    if(resultados.length > 0){
        console.log(resultados);
        manoIzqX = resultados[0].pose.leftWrist.x;
        manoIzqY = resultados[0].pose.leftWrist.y;
        manoDerX =resultados[0].pose.rightWrist.x;
        manoDerY =resultados[0].pose.rightWrist.y;
        manoIzqPuntos = resultados[0].pose.keypoints[9].score;
        manoDerPuntos = resultados[0].pose.keypoints[10].score;
    }
}