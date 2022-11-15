import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface OptionFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}
const options = ['Completed', 'Pending', 'Inprogress'];

export default function OptionStatus({ name, ...inputProps }: OptionFieldProps) {
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Status" />}
      />
    </div>
  );
}
