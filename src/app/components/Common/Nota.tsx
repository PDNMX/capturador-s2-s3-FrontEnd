import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
    nota: {
        color: '#bfac31',
    },
});

export default function Nota() {
    const classes = useStyles();
    return(
        <div className={classes.nota}>
            (DNC)
        </div>
    );
}
