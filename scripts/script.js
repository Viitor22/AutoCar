const canvas = document.getElementById("MyCanvas")
canvas.width=200;

const netCanvas = document.getElementById("netCanvas")
netCanvas.width=300;

const sliders = document.querySelectorAll(".slider");

updateSliderStorage(sliders[0], "numCars");
updateSliderStorage(sliders[1], "numDummyCars");
updateSliderStorage(sliders[2], "mutation");


sliders.forEach(slider => {
    const valueSpan = slider.nextElementSibling;

    slider.addEventListener("input", (event) => {
        valueSpan.textContent = event.target.value;
    });
});

const numCars = parseInt(sliders[0].value);
const numDummyCars = parseInt(sliders[1].value);
const mutation = parseFloat(sliders[2].value);

const carCount = JSON.parse(localStorage.getItem("numCars")) || numCars;
const dummyCarCount = JSON.parse(localStorage.getItem("numDummyCars")) || numDummyCars;
const mutationRate = JSON.parse(localStorage.getItem("mutation")) || mutation;

const ctx = canvas.getContext("2d");
const netCtx = netCanvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9);
const car = new Car(road.getLaneCenter(1),100,30,50, "KEYS");
const cars = generateCars(carCount);
let bestCar = cars[0];
if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain")
        );
        if (i!=0) {
            NeuralNetwork.mutate(cars[i].brain, mutationRate);
        }
    }
}

const traffic = generateDummyCars(dummyCarCount);

animate();

function save(){
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));

}

function discard(){
    localStorage.removeItem("bestBrain");
    localStorage.removeItem("controlMode");
}

function setControl(controlMode=false){
    localStorage.setItem("controlMode", JSON.stringify(controlMode));
}

function saveValues(){
    const currentNumCars = parseInt(sliders[0].value);
    const currentNumDummyCars = parseInt(sliders[1].value);
    const currentMutation = parseFloat(sliders[2].value);

    localStorage.setItem("numCars", JSON.stringify(currentNumCars));
    localStorage.setItem("numDummyCars", JSON.stringify(currentNumDummyCars));
    localStorage.setItem("mutation", JSON.stringify(currentMutation));
}

function deleteValues(){
    localStorage.removeItem("numCars");
    localStorage.removeItem("numDummyCars");
    localStorage.removeItem("mutation");
}

function animate(time) {
    if (JSON.parse(localStorage.getItem("controlMode"))) {
        for (let i = 0; i < traffic.length; i++) {
            traffic[i].update(road.borders,[]);
        }
        car.update(road.borders,traffic);
        canvas.height=window.innerHeight;
        netCanvas.height=window.innerHeight;
        ctx.save();
        ctx.translate(0,-car.y+canvas.height*0.7);
        road.draw(ctx);
        for (let i = 0; i < traffic.length; i++) {
            traffic[i].draw(ctx, "red");
        }
        car.draw(ctx, "blue");
        ctx.restore();
        netCtx.lineDashOffset= -time/25;
        Visualizer.drawNetwork(netCtx, car.brain);
        requestAnimationFrame(animate);
    } else {
        for (let i = 0; i < traffic.length; i++) {
            traffic[i].update(road.borders,[]);
        }
        for (let i = 0; i < cars.length; i++) {
            cars[i].update(road.borders,traffic);
        }

        bestCar = cars.find(c=>c.y==Math.min(...cars.map(c=>c.y)));

        canvas.height=window.innerHeight;
        netCanvas.height=window.innerHeight;

        ctx.save();
        ctx.translate(0,-bestCar.y+canvas.height*0.7);

        road.draw(ctx);
        for (let i = 0; i < traffic.length; i++) {
            traffic[i].draw(ctx, "red");
        }
        ctx.globalAlpha=0.2;
        for (let i = 0; i < cars.length; i++) {
            cars[i].draw(ctx, "blue");
        }
        ctx.globalAlpha=1;
        bestCar.draw(ctx, "blue",true);

        ctx.restore();

        netCtx.lineDashOffset= -time/25;

        Visualizer.drawNetwork(netCtx, bestCar.brain);
        requestAnimationFrame(animate);
    }
}

function generateCars(N){
    const cars = [];
    for (let i = 0; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function generateDummyCars(N){
    const dummyCars = [];
    for (let i = 0; i < N; i++) {

        dummyCars.push(new Car(road.getLaneCenter(generateRandomLane()), -(i+1)*200,30,50, "DUMMY", 2, getRandomColor()),);
        dummyCars.push(new Car(road.getLaneCenter(generateRandomLane()), -(i+1)*200,30,50, "DUMMY", 2, getRandomColor()),);
    }
    return dummyCars;
}

function generateRandomLane(){
    return randomLane = Math.round(Math.random()*2);
}

function updateSliderStorage(sliderElement, storageKey) {
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue !== null) {
        const n = JSON.parse(storedValue);
        sliderElement.value = n;
        sliderElement.nextElementSibling.textContent = n;
    }
}