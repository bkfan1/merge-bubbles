import React from 'react'

const selected = {backgroundColor:"forestgreen", color:"white", fontWeight:"bold"}, 
unselected = {backgroundColor:"white", color:"black", fontWeight:"normal"}

export default function BubbleFigureButton({bubbleValue,isSelectingAll, setIsSelectingAll,selectedIndividually, setSelectedIndividually}){

	
	return(
		<>
		{
			isSelectingAll ?
			<button style={selected} onClick={()=>{
				//Pendiente por completar esta función
				setIsSelectingAll(false);
			}}><i className="bi bi-check-lg btn-icon"></i> Seleccionado</button>

			: !isSelectingAll && selectedIndividually.length >= 0 && !selectedIndividually.includes(bubbleValue) ?
			<button className="bubbleBtn" style={unselected} onClick={()=>{
				setSelectedIndividually([...selectedIndividually, bubbleValue]);
			}}><i className="bi bi-hand-index-thumb btn-icon"></i> Seleccionar</button>

			: !isSelectingAll && selectedIndividually.length > 0 ? 
			<button style={selected} onClick={()=>{
				setSelectedIndividually(selectedIndividually.filter((el)=>el!==bubbleValue));
			}}><i className="bi bi-check-lg btn-icon"></i> Seleccionado</button>
			: console.log(" ")
		}
		</>
	)

}
