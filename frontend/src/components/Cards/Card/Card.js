import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import { Button } from '@material-ui/core'
import classes from './Card.module.css';
import { Slide, Fade } from 'react-awesome-reveal'

const card = props => {
    const showDetails = () => {
        props.more(props.cardData._id)
    }
    return (
            <Slide direction='top' duration='2000' className={classes.Card} >
                  <Fade cascade>
                <div >
                    <h2>{props.cardData.title}</h2>
                    <hr />
                    <p>
                        {props.cardData.description}
                    </p>
                    <Button
                        onClick={showDetails}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<SendIcon />}>
                        MORE
                    </Button>
                </div>
                </Fade>
            </Slide >
      
    )
}
export default card;