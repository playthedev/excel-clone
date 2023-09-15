let dwld=document.querySelector('.download');
let open=document.querySelector('.open');

dwld.addEventListener('click',(e)=>{
    let jsonData=JSON.stringify([sheetDB,graphForChild]);
    let file=new Blob([jsonData],{type:'application/json'});
    let url=URL.createObjectURL(file);
    let a=document.createElement('a');
    a.href=url;
    a.download='sheetData.json';
    a.click();
})

open.addEventListener('click',(e)=>{
    let input=document.createElement('input');
    input.setAttribute('type','file');
    input.click();
    input.addEventListener('change',(e)=>{
        let fr=new FileReader();
        let file=input.files;
        let fileObj=file[0]
        fr.readAsText(fileObj);
        fr.addEventListener('load',(e)=>{
            let readSheeetData=JSON.parse(fr.result);
             
            sheetAddIcon.click();
            sheetDB=readSheeetData[0];
            graphForChild=readSheeetData[1];
            
            sheetDBcontainer[sheetDBcontainer-1]=sheetDB;
            graphForChildContainer[graphForChildContainer-1]=graphForChild;

            cellPropertyApply()
        })
    })
    
   
})