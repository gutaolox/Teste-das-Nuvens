import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

export default function InputSlider({sliderValue, minValue, sliderTitle,handleSliderChange,handleInputChange}) {
  const classes = useStyles();
//   const handleSliderChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleInputChange = (event) => {
//     setValue(event.target.value === '' ? '' : Number(event.target.value));
//   };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        {sliderTitle}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof sliderValue === 'number' ? sliderValue : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={sliderValue}
            margin="dense"
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min: minValue,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
