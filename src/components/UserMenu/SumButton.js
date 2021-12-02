import React from 'react'

const selectedStyle = {backgroundColor:"forestgreen", color:"white", fontWeight:"bold"}

export default function SumButton({db, setDb, sumatory, setSumatory,isSelectingAll, setIsSelectingAll}){

    //useEffect(()=>{console.log("Botón para sumar se ha renderizado")})

    const handleSum = ()=>{

        if(isSelectingAll){
            let sum = 0, bubbles = document.querySelectorAll('.bubbleFigure');

            db.forEach((el)=>sum+=el);

            setSumatory(sum);
            //console.log(sumatory);
            setIsSelectingAll(false);

            bubbles.forEach((bubble)=>bubble.classList.add('animate__bounceOut'))

            setTimeout(() => {
                setDb([]);
            }, 500);

            setTimeout(() => {
                setDb([sum])
            }, 1250);
        }
    }

    return(
        <>
        <button style={selectedStyle} onClick={()=>{handleSum()}}><i className="bi bi-plus btn-icon"></i> Sumar burbujas</button>
        </>
    )
}
