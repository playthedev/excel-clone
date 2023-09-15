
let celladd=document.querySelector('.cell-add');
let addresscol=document.querySelector('.address-col-cont');
let addressrow=document.querySelector('.address-row-cont');
let cellcont=document.querySelector('.cell-cont');

//creating address-col-block
for(let i=1;i<=100;i++){
    let address=document.createElement('div');
    address.innerText=i;
    address.setAttribute('class','address-col-block');
    addresscol.appendChild(address);
}

//creating address-row-block
for(let i=0;i<26;i++){
    let address=document.createElement('div');
     let no=String.fromCharCode(65+i);
    address.innerText=no;
    address.setAttribute('class','address-row-block');
    addressrow.appendChild(address);
}

//creating cell of grid cont
for(let  i=0;i<100;i++){
    let rowcont=document.createElement('div');
    rowcont.setAttribute('class','rowcont');
    for(let j=0;j<26;j++){
        let cell=document.createElement('div');
        cell.setAttribute('class','cell');
        cell.setAttribute('contenteditable','true');
        cell.setAttribute('spellcheck','false');
        cell.setAttribute('rid',i);
        cell.setAttribute('cid',j);
        addeventlisteneratcelladd(cell,i,j);
        rowcont.appendChild(cell);
    }
    cellcont.appendChild(rowcont);
}

//presenting cell address in bar
function addeventlisteneratcelladd(cell,i,j){
    cell.addEventListener('click',(e)=>{
        let rowId=i+1;
        let colId=String.fromCharCode(65+j);
        celladd.value=`${colId}${rowId}`;
    })
}


//by default select on first cell
// let firstcell=document.querySelector('.cell');
//  sheetAddIcon=document.querySelector('.sheet-add-icon');

// sheetAddIcon.click();
// let sheetContent=document.querySelector('.sheet-content');
// sheetContent.click();
// firstcell.click();