//value of cell stored
for(let i=0;i<100;i++){
    for(let j=0;j<26;j++){
           let cell=document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.addEventListener('blur',(e)=>{
            let cellprop=sheetDB[i][j];
            // console.log(celladd.value)
            if(cell.innerText==cellprop.value) return;
            cellprop.value=cell.innerText;
            removeChildFromParent(cellprop.formula);
            cellprop.formula='';
            updatechild(celladd.value)
        
         })
    }   
}



//formula evaluate and store formula
    formula.addEventListener('keydown',async (e)=>{
        if(e.key==='Enter'&&formula.value){
            console.log('enter')
            let address=celladd.value;
            let [rid,cid]=decodeActiveCell(address);
            let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
            let cellprop=sheetDB[rid][cid];
            if(formula.value!==cellprop.formula) {
                removeChildFromParent(cellprop.formula);
             }
            addChildToParentGraph(formula.value,celladd);
            let cycleResponse=IsGraphCyclic(graphForChild);
            // console.log(graphForChild)
            if(cycleResponse){
                let response=confirm('Your formula is cyclic.Do you want to trace your path');
                while(response==true){
                    await IsGraphCyclicTracePath(graphForChild,cycleResponse);
                    response=confirm('Your formula is cyclic,do you want to trace');
                }
                
                removeChildFromParentGraph(formula.value,celladd);
                return;
            }

            addChildToParent(formula.value);
            let formulaValue=evaluateFormula(formula.value);
            cell.innerText=formulaValue;
            cellprop.formula=formula.value;
            cellprop.value=formulaValue;
            updatechild(address)
            // console.log(count);
        }
    })
   
     function addChildToParentGraph(formulaBox,celladd){
        let address=celladd.value;
        let [ridC,cidC]=decodeActiveCell(address);
        let encodedFormula=formulaBox.split(" ");
        for(let i=0;i<encodedFormula.length;i++){
            let asciiValue=encodedFormula[i].charCodeAt(0);
            if(asciiValue>=65&&asciiValue<=90){
                let [ridP,cidP]=decodeActiveCell(encodedFormula[i]);
                // console.log([ridC,cidC])
                graphForChild[ridP][cidP].push([ridC,cidC]);
            }
         } // console.log(graphForChild)
     }
   
     function removeChildFromParentGraph(formulaBox){
        let encodedFormula=formulaBox.split(" ");
        for(let i=0;i<encodedFormula.length;i++){
            let asciiValue=encodedFormula[i].charCodeAt(0);
            if(asciiValue>=65&&asciiValue<=90){
                let [ridP,cidP]=decodeActiveCell(encodedFormula[i]);
                graphForChild[ridP][cidP].pop();
            }
        }
     }

    function removeChildFromParent(formulaBox){
        let address=celladd.value;
        let encodedFormula=formulaBox.split(" ");
        for(let i=0;i<encodedFormula.length;i++){
            let asciiValue=encodedFormula[i].charCodeAt(0);
            if(asciiValue>=65&&asciiValue<=90){
                let [ridP,cidP]=decodeActiveCell(encodedFormula[i]);
                let cellpropP=sheetDB[ridP][cidP];
                let index=cellpropP.children.indexOf(address);
                cellpropP.children.splice(index,1)
            }
        }
    }

    function addChildToParent(formulaBox){
        let address=celladd.value;
        let encodedFormula=formulaBox.split(" ");
        for(let i=0;i<encodedFormula.length;i++){
            let asciiValue=encodedFormula[i].charCodeAt(0);
            if(asciiValue>=65&&asciiValue<=90){
                let [ridP,cidP]=decodeActiveCell(encodedFormula[i]);
                let cellpropP=sheetDB[ridP][cidP];
                cellpropP.children.push(address);
                
            }
        }
    }
    function evaluateFormula(formulaBox){
        // console.log(formulaBox)
       let encodedFormula=formulaBox.split(" ");
        for(let i=0;i<encodedFormula.length;i++){
            let asciiValue=encodedFormula[i].charCodeAt(0);
            if(asciiValue>=65&&asciiValue<=90){
                let [rid,cid]=decodeActiveCell(encodedFormula[i]);
                let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
                let cellprop=sheetDB[rid][cid];
                
                encodedFormula[i]=cellprop.value;
                // console.log(cellprop)
            }
        }
        let decodedFormula=encodedFormula.join(" ");
        // console.log(eval(decodedFormula));
        return eval(decodedFormula)
    }

    function updatechild(address){
            let [ridP,cidP]=decodeActiveCell(address);
            let cellpropP=sheetDB[ridP][cidP]; 
            let childs =  cellpropP.children;      
            for(let i=0;i<childs.length;i++){
                let [ridC,cidC]=decodeActiveCell(childs[i]);
                let cellC=document.querySelector(`.cell[rid="${ridC}"][cid="${cidC}"]`);
                let cellpropC=sheetDB[ridC][cidC];

                let childformula=cellpropC.formula;
                let valueP=evaluateFormula(childformula);
                cellC.innerText=valueP;
                cellpropC.value=valueP;
                updatechild(childs[i]);
            }
            
    }
       