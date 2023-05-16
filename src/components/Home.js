import * as React from 'react';
import './index.css';
import { Radio, 
    RadioGroup, 
    FormControlLabel, 
    FormControl, 
    FormLabel, 
    TextField,
    InputAdornment } from '@material-ui/core';

function Home() {
    const [finalValue, setFinalValue] = React.useState('0');
    const [selectedValueFrom, setSelectedValueFrom] = React.useState('');
    const [selectedValueTo, setSelectedValueTo] = React.useState('');
    const [valueForConvert, setValueForConvert] = React.useState('0');
    const [secondUnit, setSecondUnit] = React.useState('');
    const [firstUnit, setFirstUnit] = React.useState('');

    React.useEffect(() => {
        const stringToFetch = selectedValueFrom + "-" + selectedValueTo;
        if(selectedValueFrom == '' || selectedValueTo == ''){}else{
            if(selectedValueFrom === selectedValueTo) {
                setFinalValue(valueForConvert);    
            } else {
                fetch("https://economia.awesomeapi.com.br/json/last/" + stringToFetch)
                .then(response => {
                    return response.json();
                }).then(data => {
                    setFinalValue((valueForConvert.replace(/,/g, ".") * data[selectedValueFrom + selectedValueTo].bid).toFixed(2));
                })
            }
        }
  }, [selectedValueFrom, selectedValueTo, valueForConvert])

  React.useEffect(() => {
      if(selectedValueFrom === 'BRL') setFirstUnit('R$');
      if(selectedValueFrom === 'USD') setFirstUnit('U$');
      if(selectedValueFrom === 'EUR') setFirstUnit('€');
  }, [selectedValueFrom])
    React.useEffect(() => {
        if(selectedValueTo === 'BRL') setSecondUnit('R$');
        if(selectedValueTo === 'USD') setSecondUnit('U$');
        if(selectedValueTo === 'EUR') setSecondUnit('€');
    }, [selectedValueTo])

  return (
    <div>
        <form className='container'>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Converter</FormLabel>
                <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={(event) => setSelectedValueFrom(event.target.value)}>
                <FormControlLabel value="BRL" control={<Radio color="primary"/>} label="Real" />
                <FormControlLabel value="USD" control={<Radio color="primary"/>} label="Dolar" />
                <FormControlLabel value="EUR" control={<Radio color="primary"/>} label="Euro" />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Em</FormLabel>
                <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={(event) => setSelectedValueTo(event.target.value)}>
                <FormControlLabel value="BRL" control={<Radio color="primary"/>} label="Real" />
                <FormControlLabel value="USD" control={<Radio color="primary"/>} label="Dolar" />
                <FormControlLabel value="EUR" control={<Radio color="primary"/>} label="Euro" />
                </RadioGroup>
            </FormControl>
            <div id='inputValue'>
                <TextField 
                id="input-value" 
                label="Valor a ser convertido" 
                variant="outlined" 
                onChange={(event) => setValueForConvert(event.target.value)}
                InputProps={{
                    startAdornment: <InputAdornment position="start">{firstUnit}</InputAdornment>,
                }}/>
            </div>
            <label>Valor final: </label>
            <label id='finalValue'>{secondUnit}{finalValue}</label>
        </form>
    </div>
  );
}

export default Home;
