// storage

let bold=document.querySelector('.bold')
let italic=document.querySelector('.italic')
let underline=document.querySelector('.underline')
let fontFamily=document.querySelector('.font-family')
let fontSize=document.querySelector('.font-size')
let BGcolor=document.querySelector('.BGcolor-prop')
let alignment=document.querySelectorAll('.alignment')
let fontColor=document.querySelector('.font-color-prop')
let formula=document.querySelector('.formula');       
let allcell=document.querySelectorAll('.cell');

let leftAlign=alignment[0];
let centerAlign=alignment[1];
let rightAlign=alignment[2];

let activeColorProp='#d1d8e0';
let inactiveColorProp='#ecf0f1';

//creating object for every sheet cell
let sheetDBcontainer=[];
let sheetDB=[];                                          

// {
//    let sheetAddIcon=document.querySelector('.sheet-add-icon');
//    sheetAddIcon.click();
// }

// for(let i=0;i<100;i++){
//     let sheetRow=[];
//     for(let j=0;j<26;j++){
//         let cellProp={
//             bold:false,
//             italic:false,
//             underline:false,
//             alignment:"left",
//             fontfamily:'monospace',
//             fontSize:'14',
//             fontColor:'#000000',
//             BGcolor:'#000000',
//             value:'',
//             formula:'',
//             children:[],
//         }
//         sheetRow.push(cellProp);
//     }
//     sheetDB.push(sheetRow);
// }
// sheetDBcontainer.push(sheetDB);
// Selectors for cell properties


//attach property listeners

 bold.addEventListener('click',(e)=>{
   let address=celladd.value;
   let [rid,cid]=decodeActiveCell(address);
   let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
   let cellprop=sheetDB[rid][cid];
   cellprop.bold=!cellprop.bold;
   cell.style.fontWeight=cellprop.bold?'bold':'normal';
   bold.style.backgroundColor=cellprop.bold?activeColorProp:inactiveColorProp;
})


 italic.addEventListener('click',(e)=>{
    let address=celladd.value;
    let [rid,cid]=decodeActiveCell(address);
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellprop=sheetDB[rid][cid];
    cellprop.italic=!cellprop.italic;
    cell.style.fontStyle=cellprop.italic?'italic':'normal';
    italic.style.backgroundColor=cellprop.italic?activeColorProp:inactiveColorProp;

 })
 
 
 underline.addEventListener('click',(e)=>{
    let address=celladd.value;
    let [rid,cid]=decodeActiveCell(address);
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellprop=sheetDB[rid][cid];
    cellprop.underline=!cellprop.underline;
    cell.style.textDecoration=cellprop.underline?'underline':'none';
    underline.style.backgroundColor=cellprop.underline?activeColorProp:inactiveColorProp;

 })
 
 alignment.forEach((alignElem)=>{
    alignElem.addEventListener('click',(e)=>{
        let address=celladd.value;
        let [rid,cid]=decodeActiveCell(address);
        let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
        let cellprop=sheetDB[rid][cid];
        let alignValue=e.target.classList[0];
        cellprop.alignment=alignValue;
        cell.style.textAlign=cellprop.alignment;
        switch(alignValue){
            case "left":
                leftAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                break;
        }
    })
 })
 
 fontSize.addEventListener('click',(e)=>{
    let address=celladd.value;
    let [rid,cid]=decodeActiveCell(address);
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellprop=sheetDB[rid][cid];
    cellprop.fontSize=fontSize.value;
    // console.log(cellprop.fontSize);
    cell.style.fontSize=cellprop.fontSize+"px";
    // fontSize.value=cellprop.fontSize
 })

 fontFamily.addEventListener('click',(e)=>{
    let address=celladd.value;
    let [rid,cid]=decodeActiveCell(address);
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellprop=sheetDB[rid][cid];
    cellprop.fontFamily=fontFamily.value;
    cell.style.fontFamily=cellprop.fontFamily;
    fontSize.value=cellprop.fontFamily;
 })

 fontColor.addEventListener('change',(e)=>{
    let address=celladd.value;
    let [rid,cid]=decodeActiveCell(address);
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellprop=sheetDB[rid][cid];
    cellprop.fontColor=fontColor.value;
    // console.log(fontColor.value) 
    cell.style.color= cellprop.fontColor;
    fontColor.value=cellprop.fontColor;
 })

 BGcolor.addEventListener('change',(e)=>{
    let address=celladd.value;
    let [rid,cid]=decodeActiveCell(address);
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellprop=sheetDB[rid][cid];
    cellprop.BGcolor=BGcolor.value;
    // console.log(BGcolor.value)
    cell.style.backgroundColor= cellprop.BGcolor;
    BGcolor.value=cellprop.BGcolor;
 })

 //cell properties
 for(let i=0;i<allcell.length;i++){
    allcell[i].addEventListener('click',(e)=>{
        attachPropsToCell();
      }
    )
 }

 function attachPropsToCell(){
    let address=celladd.value;
    let [rid,cid]=decodeActiveCell(address);
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellprop=sheetDB[rid][cid];
    formula.value=cellprop.formula;
    cell.style.fontWeight=cellprop.bold?'bold':'normal';
    cell.style.fontStyle=cellprop.italic?'italic':'normal';
    cell.style.textDecoration=cellprop.underline?'underline':'none';
    cell.style.textAlign=cellprop.alignment;
    cell.style.fontSize=cellprop.fontSize+"px";
    cell.style.fontFamily=cellprop.fontFamily;
    cell.style.color= cellprop.fontColor;
    cell.style.backgroundColor= cellprop.BGcolor==="#000000"?'transparent':cellprop.BGcolor;

    bold.style.backgroundColor=cellprop.bold?activeColorProp:inactiveColorProp;
    italic.style.backgroundColor=cellprop.italic?activeColorProp:inactiveColorProp;
    underline.style.backgroundColor=cellprop.underline?activeColorProp:inactiveColorProp;
    let alignValue=cellprop.alignment;
    switch(alignValue){
      case "left":
          leftAlign.style.backgroundColor=activeColorProp;
          rightAlign.style.backgroundColor=inactiveColorProp;
          centerAlign.style.backgroundColor=inactiveColorProp;
          break;
      case "center":
          leftAlign.style.backgroundColor=inactiveColorProp;
          rightAlign.style.backgroundColor=inactiveColorProp;
          centerAlign.style.backgroundColor=activeColorProp;
          break;
      case "right":
          leftAlign.style.backgroundColor=inactiveColorProp;
          rightAlign.style.backgroundColor=activeColorProp;
          centerAlign.style.backgroundColor=inactiveColorProp;
          break;
  }
     cell.innerText=cellprop.value;
 }

 function decodeActiveCell(address){
   let rid=Number(address.slice(1))-1;
//    console.log(rid)
   let cid=Number(address.charCodeAt(0))-65;
   //console.log(rid);.   
   return [rid,cid];
 }