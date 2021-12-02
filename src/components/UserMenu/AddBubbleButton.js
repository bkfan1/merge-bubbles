import React from 'react'

const btn = {backgroundColor:"#198754",color:"white", fontWeight:"bold"}

export default function AddBubbleButton({db, setDb}){
    return(
        <>
        <button style={btn} onClick={()=>{
            let randomValue = Math.floor(Math.random()*1000);
            // Para evitar valores repetidos, usamos:
            if(db.includes(randomValue)){randomValue *=Math.floor(Math.random()*1000)}
            setDb([...db,randomValue].sort((a,b)=>a-b))
        }}><i className="bi bi-plus-circle btn-icon"></i> Agregar burbuja</button>
        </>
    )
}
