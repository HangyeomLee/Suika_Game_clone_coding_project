import {Bodies, Engine, Render, Runner, World} from "matter-js";
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
    isStatic: true,
    render:{fillStyle: "#E6B143"}
});

World.add(world, [leftWall, rightWall, groundWall,topLine]);

Render.run(render);
Runner.run(engine);

function addFruit(){
    const index = 7;
    const fruit = FRUITS[index];
    
    const body = Bodies.circle(300,50,fruit.radius, {
        index: index,
        render:{
            sprite:{texture: `${fruit.name}.png`}
        }
        });
        World.add(world, add);
}
addFruit();