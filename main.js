import {Bodies, Body, Collision, Engine, Events, Render, Runner, World} from "matter-js";
import { FRUITS_BASE } from "./fruits";

let FRUITS = FRUITS_BASE;

const engine = Engine.create();
const render = Render.create({
        engine: engine,
        element: document.body,
        options: {
            wireframes: false,
            background: "#F7F4C8",
            width: 620,
            height: 850,
    }
});

const world = engine.world;

const leftWall = Bodies.rectangle(15,395,30,790,{
    isStatic: true,
    render:{fillStyle: "#E6B143"}
});

const rightWall = Bodies.rectangle(605,395,30,790,{
    isStatic: true,
    render:{fillStyle: "#E6B143"}
});

const groundWall = Bodies.rectangle(310,820,620,60,{
    isStatic: true,
    render:{fillStyle: "#E6B143"}
});

const topLine = Bodies.rectangle(310, 150, 620, 2,{
    name:"topLine",
    isSensor:true,
    isStatic: true,
    render:{fillStyle: "#E6B143"}
});

World.add(world, [leftWall, rightWall, groundWall,topLine]);

Render.run(render);
Runner.run(engine);

let currentBody = null;
let currentFruit = null;
let disableAction = null;
let interval = null;

function addFruit(){
    const index = Math.floor(Math.random() * 5);
    const fruit = FRUITS[index];
    
    const body = Bodies.circle(300,50,fruit.radius, {
        index: index,
        isSleeping: true,
        render:{
            sprite:{texture: `${fruit.name}.png`}
        },
        restitution: 0.2
        });

        currentBody = body;
        currentFruit = fruit;

        World.add(world, body);
}

window.onkeydown = (event) =>{
    if(disableAction){
        return;
    }
    switch (event.code) {
        case "ArrowLeft":
            if(interval)
                return;
            interval = setInterval(()=>{
            if(currentBody.position.x - currentFruit.radius > 30)
                Body.setPosition(currentBody,{
                    x:currentBody.position.x-1.7,
                    y:currentBody.position.y,
                });
            },5);
            break;
        case "ArrowDown":
            currentBody.isSleeping = false;
            disableAction = true;
            setTimeout(() => {
                addFruit();
                disableAction = false;
            },1000);

            break;
        case "ArrowRight":
            if(interval)
                return;
            interval = setInterval(()=>{
            if(currentBody.position.x + currentFruit.radius < 590){
                Body.setPosition(currentBody,{
                    x:currentBody.position.x+1.7,
                    y:currentBody.position.y,
                });}},5);
            break;
    }
}

window.onkeyup = (event)=>{
    switch(event.code){
        case "ArrowLeft":
        case "ArrowRight":
            clearInterval(interval);
            interval= null;
    }
}

Events.on(engine, "collisionStart", (event)=>{
    event.pairs.forEach(Collision=>{
        if(Collision.bodyA.index === Collision.bodyB.index){
            const index = Collision.bodyA.index;
            if(index === FRUITS.length - 1){
                return;
            }
            World.remove(world,[Collision.bodyA, Collision.bodyB]);

            const newFruit = FRUITS[index + 1];

            const newBody = Bodies.circle(
                Collision.collision.supports[0].x,
                Collision.collision.supports[0].y,
                newFruit.radius,{
                    render:{
                        sprite: {texture: `${newFruit.name}.png`}},
                    index: index+1,
                }

            )
            World.add(world,newBody);
        }

        if(
            !disableAction &&
            (collision.bodyA.name==="topLine"||collision.bodyB.name === "topLine")){
            alert("Game over!");

        }
    });
});



addFruit();