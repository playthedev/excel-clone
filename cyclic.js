//storage for child-parents relation in graph
let graphForChildContainer=[];
let graphForChild=[];
// for(let i=0;i<100;i++){
//     let row=[];
//     for(let j=0;j<26;j++){
//         let col=[];
//         row.push(col);
//     }
//     graphForChild.push(row);
// }
// graphForChildContainer.push(graphForChild);


//detecting cycle in graph algorithm
function IsGraphCyclic(graphForChild){
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
for(let i=0;i<100;i++){
    for(let j=0;j<26;j++){
        if(visited[i][j]==false){
        let response=detectingCycle(graphForChild,visited,dfs,i,j)
        if(response==true){
            // console.log(visited)
            // console.log(dfs )
            // console.log('hello my friend')
            return [i,j];
        }
    }
}
}
return null;
}

function detectingCycle(graphForChild,visited,dfs,row,col){

    visited[row][col]=true;
    dfs[row][col]=true;
    for(let i=0;i<graphForChild[row][col].length;i++){
        let [x,y]=graphForChild[row][col][i];
        if(visited[x][y]==false){
            
            
        let response=detectingCycle(graphForChild,visited,dfs,x,y);
        if(response==true) return true;
        }
        else if(visited[x][y]==true&&dfs[x][y]==true)return true;

    }
    dfs[row][col]=false;
    return false;
}
