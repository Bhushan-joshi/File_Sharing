import { Grid, Typography } from '@material-ui/core';
import React from 'react';

import Details from './CardDetail/CardDetail';
import classes from './CardDetails.module.css';
import { Zoom } from 'react-awesome-reveal'
import Spinner from '../UI/Spinner/Spinner';

// const files = [{
//     id: 'id',
//     fileName: 'file name 1'
// }, {
//     id: 'id2',
//     fileName: 'file name 2'
// },
// ]

const detailCard = props => {
//    console.log(props);
//     const fileList = [];
//     for (let i in files) {
//         fileList.push({
//             index: i,
//             payload: files[i]
//         })
//     }
   
    
    let project = null;
    if(props.error){
        console.log(props.error);
        project=props.error
    }
    if(props.loading){
        project=<Spinner/>
    }
    if (props.project) {
        document.title=props.project.title 
        project = (
            <React.Fragment>
                <Typography variant='h2'>{props.project.title}</Typography>
                <Zoom direction='top' className={classes.Data}>
                    <div className={classes.Din} >
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                            <Details key={props.project._id} 
                            fName={props.project.fileName} 
                            id={props.project._id}
                            getFile={props.getFile} />
                            </Grid>
                        </Grid>
                    </div>
                </Zoom>
            </React.Fragment>
        )
    }

    return project
}
export default detailCard;