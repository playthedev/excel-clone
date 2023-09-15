 let sheetAddIcon=document.querySelector('.sheet-add-icon');
 
 let sheetFolderCont=document.querySelector('.sheet-folder-cont');
 
 sheetAddIcon.addEventListener('click',(e)=>{
    let sheetFolder=document.querySelectorAll('.sheet-folder');
    console.log(sheetFolder.length);
    let sheet=document.createElement('div');
    sheet.setAttribute('class','sheet-folder');
    sheet.setAttribute('id',sheetFolder.length)
    sheet.innerHTML=`
    <div class="sheet-content">
       sheet${sheetFolder.length+1}
    </div>
    `
    sheetFolderCont.append(sheet)
    sheet.scrollIntoView();

    createSheetDB()
    ActiveDB(sheet);
    let sheetContent=sheet.querySelector('.sheet-content');
    // console.log(sheetContent.click());
    sheetContent.click();
    let firstcell=document.querySelector('.cell');
    firstcell.click()
    
})
sheetAddIcon.click();

function createSheetDB(){
     sheetDB=[];
    for(let i=0;i<100;i++){
     let sheetRow=[];
     for(let j=0;j<26;j++){
        let cellProp={
            bold:false,
            italic:false,
            underline:false,
            alignment:"left",
            fontfamily:'monospace',
            fontSize:'14',
            fontColor:'#000000',
            BGcolor:'#000000',
            value:'',
            formula:'',
            children:[],
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}
sheetDBcontainer.push(sheetDB);


graphForChild=[];
for(let i=0;i<100;i++){
    let row=[];
    for(let j=0;j<26;j++){
        let col=[];
        row.push(col);
    }
    graphForChild.push(row);
}
graphForChildContainer.push(graphForChild);
}
function ActiveDB(sheet){

    let sheetContent=sheet.querySelector('.sheet-content');

    sheetContent.addEventListener('click',(e)=>{
        // console.log('click')
        let sheetFolder=document.querySelectorAll('.sheet-folder');

        for(let i=0;i<sheetFolder.length;i++){
            sheetFolder[i].style.backgroundColor="#dcdde1";
        }
        sheet.style.backgroundColor='#bdc3c7' 
        let id=Number(sheet.getAttribute('id'));
        // console.log(id)
        sheetDB=sheetDBcontainer[id];
        graphForChild=graphForChildContainer[id];
        cellPropertyApply(sheetDB);
        let firstcell=document.querySelector('.cell');
        
        firstcell.click();
    })
    removeSheet(sheet)
}
function cellPropertyApply(sheetDB){
    for(let i=0;i<100;i++){
        for(let j=0;j<26;j++){
            let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
            // attachPropertiesToCell(i,j,sheetDB)
        }
    }
    
}
function removeSheet(sheet){
    sheet.addEventListener('mousedown',(e)=>{
        if(e.button!==2)return;
        let sheetFolder=document.querySelectorAll('.sheet-folder');
        if(sheetFolder.length==1){
            alert('you need to have atleast one sheet!!')
            return;
        }
        let response=confirm('your sheet will be removed permanently,are you sure?')
        if(response===false)return;
        let id=Number(sheet.getAttribute('id'));
        sheet.remove();
        sheetDBcontainer.splice(id,1)
        graphForChildContainer.splice(id,1)
        let sheetFolder1=document.querySelectorAll('.sheet-folder');
        for(let i=0;i<sheetFolder1.length;i++){
            sheetFolder1[i].setAttribute('id',i);
            let sheetContent=sheetFolder1[i].querySelector('.sheet-content');
            sheetContent.innerText=`sheet${i+1}`
        }
        let sheetcontent=sheetFolder1[0].querySelector('.sheet-content');
        sheetcontent.click()
    })
}  