let i =0;
let w =5;
let states = [];




function setup(){
    createCanvas(500, 500).parent("canvas-container");
    values = new Array(floor(width/w));
    for(let i =0; i<values.length; i++){
        values[i] = random(height);
        states[i] =-1;
    }
    frameRate(60)
    quickSort(values, 0, values.length-1);

    /*document.querySelector(".reset").addEventListener("click", ()=>{
    values = new Array(floor(width/w));
    for(let i =0; i<values.length; i++){
        values[i] = random(height);
    }
    running = false;
    });
    document.querySelector(".start").addEventListener("click", () => running = true);
    document.querySelector(".stop").addEventListener("click", () => running = false);*/
}

async function quickSort(arr, start, end){
    if (start>=end){
        return;
    }

    let index = await partition(arr, start, end);
    states[index] = -1;

    await Promise.all([quickSort(arr, start, index-1), quickSort(arr, index+1, end)]);
}

async function partition(arr, start, end){

    for(let i=start; i<=end; i++){
        states[i] = 1;
    }

    let pValue = arr[end];
    let pIndex = start;
 
    states[pIndex] = 0;
    
    for(let i =start; i<end; i++){
        if(arr[i]<pValue){
        await swap(arr, i, pIndex);
        states[pIndex] = -1;
        pIndex++;
        states[pIndex] = 0;
        }
    }
    await swap(arr, pIndex, end);
    for(let i=start; i<=end; i++){
        if(i!= pIndex){
        states[i] = -1;
    }}

    return pIndex;
}

async function swap(arr, a, b){
    await sleep(100);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
function draw(){
background(0);
for(let i=0; i<values.length; i++){
    stroke(0);
    if (states[i] == 0){
        fill(255, 0, 0);
    } else if(states[i] == 1){
        fill(255);
    }else{
        fill(128, 255, 128);
    }
    rect(i*w, height-values[i], w, values[i]);
}


}
