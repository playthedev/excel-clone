async function IsGraphCyclicTracePath(graphForChild,cycleResponse){
    //creating visited array and dfs array
let visited=[];
let dfs=[];
for(let i=0;i<100;i++){
    let rowV=[];
    let rowdfs=[];
    for(let j=0;j<26;j++){
        rowV.push(false);
        rowdfs.push(false);
    }
    visited.push(rowV);
    dfs.push(rowdfs);
} 
let [row,col]=cycleResponse;
console.log('cycleResponse',[row,col])
let response=await detectingCycleTracePath(graphForChild,visited,dfs,row,col)
if(response===true) return Promise.resolve(true);

return Promise.resolve(false);
}

function colorPromise(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            setTimeout(()=>{
                resolve();
            },1000);
        })
    })
}
//coloring cells for tracking
async function detectingCycleTracePath(graphForChild,visited,dfs,row,col){

    visited[row][col]=true;
    dfs[row][col]=true;
    let cell=document.querySelector(`.cell[rid="${row}"][cid="${col}"]`);
    console.log('entering cell',[row,col])
    cell.style.backgroundColor='lightblue';
    await colorPromise(); 

    for(let i=0;i<graphForChild[row][col].length;i++){
        let [x,y]=graphForChild[row][col][i];
        if(visited[x][y]==false){
         let response=await detectingCycleTracePath(graphForChild,visited,dfs,x,y);
         if(response==true) {
            cell.style.backgroundColor='transparent';
            console.log('coming back cell',[row,col])
            await colorPromise(); 
            return Promise.resolve(true);
         }
        }
        else if(visited[x][y]==true&&dfs[x][y]==true){
            let cyclicCell=document.querySelector(`.cell[rid="${x}"][cid="${y}"]`);
            cyclicCell.style.backgroundColor='lightsalmon';
            console.log('cycle detect',[x,y])
            await colorPromise(); 

            cyclicCell.style.backgroundColor='transparent';
            await colorPromise(); 

            cell.style.backgroundColor='transparent';
            console.log([x,y])
            await colorPromise(); 

            return Promise.resolve(true);
        }

    }
    dfs[row][col]=false;
    return Promise.resolve(false);
}