import React,{useEffect} from 'react';
import BubbleFigureButton from './BubbleFigureButton';

export default function BubbleFigure({value,isSelectingAll, setIsSelectingAll, selectedIndividually, setSelectedIndividually}){


    useEffect(()=>{
        let innerValues = document.querySelectorAll('.bubbleFigure h1')
        innerValues.forEach((value)=> value.textContent.length > 3 ? value.style.fontSize = "34px" : console.log(" "))
    })

    return(
        <>
        <figure id={`bubbleFigure_${value}`} className="bubbleFigure animate__bounceIn" >
            <h1 className="bubbleFigure__value">{value}</h1>
            <BubbleFigureButton
            bubbleValue={value}
            isSelectingAll={isSelectingAll}
            setIsSelectingAll={setIsSelectingAll}
            selectedIndividually={selectedIndividually}
            setSelectedIndividually={setSelectedIndividually}
            />

        </figure>
        </>
    )
}

