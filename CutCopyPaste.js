let paste=document.querySelector('.paste');
let cut=document.querySelector('.cut');
let copy=document.querySelector('.copy');

let ctrlKey; 
document.addEventListener('keydown',(e)=>{
    ctrlKey=e.ctrlKey;
})

document.addEventListener('keyup',(e)=>{
    ctrlKey=e.ctrlKey;
})

for(let i=0;i<100;i++){
    for(let j=0;j<26;j++){
        let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        handleSelectedCells(cell);
    }
}
let rangeStorage=[];
function handleSelectedCells(cell){
   cell.addEventListener('click',(e)=>{
      if(!ctrlKey)return;
      if(rangeStorage.length>=2){
        handleSelectedcellUI();
        rangeStorage=[];
      }

      cell.style.border='3px solid green';
      let rid=Number(cell.getAttribute('rid'));
      let cid=Number(cell.getAttribute('cid'));
      rangeStorage.push([rid,cid]);
   })
}

function handleSelectedcellUI(){
    for(let i=0;i<rangeStorage.length;i++){
        let cell=document.querySelector(`.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`);
        cell.style.border='1px solid lightgrey';
    }
}

let copyData=[];
copy.addEventListener('click',(e)=>{
    if(rangeStorage.length<2)return;
    copyData=[];
    for(let i=rangeStorage[0][0];i<=rangeStorage[1][0];i++){
        let copyRow=[];
        for(let j=rangeStorage[0][1];j<=rangeStorage[1][1];j++){
           let cellProp=sheetDB[i][j];
           copyRow.push(cellProp);
        }
        copyData.push(copyRow);
    }
    handleSelectedcellUI();
    // console.log(copyData);
})

paste.addEventListener('click',(e)=>{
    if(rangeStorage.length<2)return;
    let address=celladd.value;
    let [strow,stcol]=decodeActiveCell(address);
   

    let rowdiff=Math.abs(rangeStorage[0][0]-rangeStorage[1][0])
    let coldiff=Math.abs(rangeStorage[0][1]-rangeStorage[1][1])
    
    for(let i=strow,r=0;i<=strow+rowdiff;i++,r++){
        for(let j=stcol,c=0;j<=stcol+coldiff;j++,c++){
            let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            if(!cell)return;

           let data=copyData[r][c];
        //    console.log(data.value);
           let cellProp=sheetDB[i][j];

           cellProp.value=data.value;
           cellProp.bold=data.bold;
           cellProp.italic=data.italic;
           cellProp.underline=data.underline;
           cellProp.fontSize=data.fontSize;
           cellProp.fontfamily=data.fontfamily;
           cellProp.fontColor=data.fontColor;
           cellProp.BGcolor=data.BGcolor;
           cellProp.alignment=data.alignment;
           cell.click();
        }
    }
})

cut.addEventListener('click',(e)=>{
    if(rangeStorage.length<2)return;
    for(let i=rangeStorage[0][0];i<=rangeStorage[1][0];i++){
        for(let j=rangeStorage[0][1];j<=rangeStorage[1][1];j++){
            let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            handleSelectedcellUI();
            
            let cellProp=sheetDB[i][j];
            cellProp.value='';
            cellProp.bold=false;
            cellProp.italic=false;
            cellProp.underline=false;
            cellProp.fontSize=14;
            cellProp.fontfamily='monospace';
            cellProp.fontColor='#000000';
            cellProp.BGcolor='#000000';
            cellProp.alignment='left';
            cell.click();
        }
    }
})