import React from 'react';
import Card from './Card/Card'

const Cards = props => {
    const projectsList=[];
    for(let i in props.data){
        projectsList.push({
            index:i,
            payload:props.data[i]
        })
    }
    const Cards=projectsList.map(p=>(
        <Card cardData={p.payload} key={p.index} more={props.more}/>
    ))
    return Cards;
}

export default Cards;