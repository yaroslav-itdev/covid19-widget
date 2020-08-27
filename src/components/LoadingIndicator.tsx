import React from 'react'
import Loader from 'react-loader-spinner'
import {makeStyles} from "@material-ui/styles";

export default () => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Loader
                type="Grid"
                color="#00BFFF"
                height={100}
                width={100}
            />
        </div>
    )
}

const useStyles = makeStyles({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        height: 400,
    },
});
