import React,{useState, useEffect} from 'react';
import BubbleFigure from './BubbleFigure/BubbleFigure';
import AddBubbleButton from './UserMenu/AddBubbleButton';
import SumButton from "./UserMenu/SumButton";

const unselectedStyle = {backgroundColor:"white"}, deleteStyles ={backgroundColor:"crimson", fontWeight:"bold", color:"white"}
const unselectAll = {backgroundColor:"#ffc107", color:"black"}
const sumStyle = {backgroundColor:"forestgreen", color:"white", fontWeight:"bold"}


export default function BubbleApp(){

    const initialCantBubbles = [2,4,6,8,10];

    // STATE VARIABLES:
    const [db, setDb] = useState(initialCantBubbles),
    [selectedIndividually, setSelectedIndividually] = useState([]),
    [isSelectingAll, setIsSelectingAll] = useState(false),
    [sumatory, setSumatory] = useState(0);

    // EFFECTS:
    useEffect(()=>{

        db.sort((a,b)=>a-b)
        selectedIndividually.sort((a,b)=>a-b);

    },[db, selectedIndividually])

    // Para remover la animación "bounceIn" después de que se haya ejecutado.
    useEffect(()=>{
        setTimeout(()=>{
            let allBubbles = document.querySelectorAll('.bubbleFigure');
            allBubbles.forEach((bubble)=>bubble.classList.remove('animate__bounceIn'))
        },1000)
    },[])


    // Se ejecutará solo cuando "db" y "isSelectingAll" cambien.	
    useEffect(()=>{

        const changeFocusBubbles =()=>{
            let bubbles = document.querySelectorAll('.bubbleFigure');

            // Si isSelectingAll es true, entonces agrégale la clase "focused" a cada burbuja
            isSelectingAll ? bubbles.forEach((bubble)=>{
                bubble.classList.add('focused')
                bubble.querySelector('h1').classList.add('spinOneTime');
            })
            : bubbles.forEach((bubble)=>{
                bubble.classList.remove('focused')
                bubble.querySelector('h1').classList.remove('spinOneTime');
            })
        }
        changeFocusBubbles();

    },[db, isSelectingAll]);


    // HANDLERS:
    //---- "All" Handlers ----
    const deleteAllBubbles = ()=>{
		let bubbles = document.querySelectorAll('.bubbleFigure');

		bubbles.forEach((bubble)=>bubble.classList.add('animate__bounceOut'));
		
		setIsSelectingAll(false);

		setTimeout(()=>{
			setDb([]);
			setSumatory(0);
		},500);
	}
    //---------------------


    // ---- "Selected" Handlers ----
    const handleSelectedSumatory =()=>{
        let sum = 0;

        selectedIndividually.forEach((el)=>{sum += el})
        if(db.includes(sum)){
            alert("¡No pueden existir burbujas con valores repetidos!")
            alert("Se le agregará un valor aleatorio a la burbuja en su lugar")
            sum += Math.floor(Math.random()*1000)
        }

        let selectedBubbles = []
        selectedIndividually.forEach((el)=>{selectedBubbles.push(document.getElementById(`bubbleFigure_${el}`));})

        selectedBubbles.forEach((el)=>{el.classList.add('animate__bounceOut')})

        setTimeout(() => {
            selectedIndividually.forEach((el)=>{
                if(db.includes(el)){
                    let index = db.indexOf(el);
                    db.splice(index, 1);
                }
            })
            setDb([...db, sum]);

            let bubbleResult = document.getElementById(`bubbleFigure_${sum}`);
            bubbleResult.classList.remove('animate__bounceOut')
            bubbleResult.classList.add('animate__bounceIn')

        }, 900);

        setSelectedIndividually([]);
        //console.log(sum);
    }

    const handleDeleteSelectedBubbles =()=>{

        let toEliminate = [];
        for(let i =0; i<selectedIndividually.length; i++){
            toEliminate.push(document.getElementById(`bubbleFigure_${selectedIndividually[i]}`))
        }

        //console.log(toEliminate);
        toEliminate.forEach((el)=>{el.classList.add('animate__bounceOut')});
     
        setTimeout(() => {
            // Remueve los elementos que comparten tanto "db" como "selectedIndividually"
            selectedIndividually.forEach((el)=>{db.splice(db.indexOf(el), 1);})
            setSelectedIndividually([]);
            setDb([...db]);
        }, 900);
    }
    // ------------------------

    return(
        <>
        <header>
            <h1 className="header-title"><i class="bi bi-ui-radios-grid"></i> Merge Bubbles</h1>
            <h5 className="header-credits">Created by <a href="github.com/bkfan1">Jack</a> (aka bkfan1)</h5>
        </header>
        <div className="grid-container">
            {db.map((el,index)=>
            <BubbleFigure key={index} value={el}
            isSelectingAll={isSelectingAll}
		    setIsSelectingAll={setIsSelectingAll}
            selectedIndividually={selectedIndividually}
            setSelectedIndividually={setSelectedIndividually}
            />
	    )}
        </div>
        <menu className="userMenu">

        {
            db.length > 1 && !isSelectingAll ?
            <button style={unselectedStyle} onClick={()=>{
                setIsSelectingAll(true);
                setSelectedIndividually([]);
            }}><i className="bi bi-check2-all btn-icon"></i> Seleccionar todo</button>
            : console.log(" ")
        }

	    {
		    isSelectingAll && db.length > 1 ? 
            <SumButton db={db} setDb={setDb} sumatory={sumatory} setSumatory={setSumatory}
		    isSelectingAll={isSelectingAll} setIsSelectingAll={setIsSelectingAll}/>
		    : console.log(" ")
	    }

        {
            isSelectingAll && db.length>1 ?
            <button style={unselectAll} onClick={()=>{setIsSelectingAll(false);}}><i className="bi bi-arrow-counterclockwise btn-icon"></i>Deshacer todo</button>
            : console.log(" ")
        }

        {
		    isSelectingAll && db.length >0 ? <button style={deleteStyles} onClick={()=>deleteAllBubbles()}><i className="bi bi-x btn-icon"></i> Eliminar todo</button> 
            : console.log(" ")
	    }

        {
            selectedIndividually.length >1 && !isSelectingAll ?
            <button style={sumStyle} onClick={()=>{handleSelectedSumatory()}}><i className="bi bi-node-plus btn-icon"></i> Sumar selección</button>
            : console.log(" ")
        }

        {
            selectedIndividually.length >=1 && !isSelectingAll ?
            <button style={unselectAll} onClick={()=>{setSelectedIndividually([])}}><i className="bi bi-arrow-counterclockwise btn-icon"></i> Deshacer selección</button>
            : console.log(" ")
        }

        {
            selectedIndividually.length > 0 && !isSelectingAll ?
            <button style={deleteStyles} onClick={()=>{handleDeleteSelectedBubbles()}}><i className="bi bi-x-circle-fill btn-icon"></i> Eliminar selección</button>
            : console.log(" ")
        }

            <AddBubbleButton db={db} setDb={setDb}/>
        </menu>  
        </>
    )
}