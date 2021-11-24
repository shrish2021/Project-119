randomNumber = 0;
objectsToDraw = ["Birds", "Apple", "Arm", "Backpack","Banana","Band-aid", "Pencil", "Bike", "Nuts", "Tornado"];
answerHolder = "";
timerCounter = 0;
timerCheck = "";
drawnSketch = "";
score = 0;

randomNumber = Math.floor((Math.random()*objectsToDraw.length)+1);
    quickDrawDataSet = objectsToDraw[randomNumber];
    sketch = quickDrawDataSet;
    document.getElementById("thingDraw").innerHTML = sketch;
    console.log(sketch);
    
function preload()
    {
        classifier = ml5.imageClassifier("DoodleNet");
    }

function updateCanvas()
{
    background("white");
    randomNumber = Math.floor((Math.random()*objectsToDraw.length)+1);
    quickDrawDataSet = objectsToDraw[randomNumber];
    sketch = quickDrawDataSet;
    document.getElementById("thingDraw").innerHTML = sketch;
    console.log(sketch);
}
function setup()
{
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}

function classifyCanvas()
    {
        classifier.classify(canvas, gotResult);
    }

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("thing").innerHTML = results[0].label;
        document.getElementById("confidence").innerHTML = Math.round(results[0].confidence*100) + "%";
    }
}

function draw()
{
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed)
    {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    checkSketch()
    if(drawnSketch == sketch)
    {
        answerHolder = "set";
        console.log(answerHolder);
        score = score + 1;
        document.getElementById("score").innerHTML = score;
    }
}
function checkSketch()
{
        if(timerCounter < 50)
        {
            timerCounter++; 
            document.getElementById("timer").innerHTML = timerCounter;
            console.log(timerCounter);
        }
            if(timerCounter > 49)
            {
                timerCounter = 0;
                timerCheck = "completed";
            }
            if(timerCheck == "completed" || answerHolder == "set")
            {
                timerCheck = "";
                answerHolder = "";
                updateCanvas();
            }
}
