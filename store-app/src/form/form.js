import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';

const Form = () => {
  const [formErrors, setFormErrors] = useState({
    name: '',
    size: '',
    type: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const { name, size, type } = e.target.elements;
    if (!name.value) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: 'The name is required',
      }));
    }
    if (!size.value) {
      setFormErrors((prevState) => ({
        ...prevState,
        size: 'The size is required',
      }));
    }
    if (!type.value) {
      setFormErrors((prevState) => ({
        ...prevState,
        type: 'The type is required',
      }));
    }
    await fetch('/products', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    setIsSaving(false);
  };

  const blurHandler = (e) => {
    const { name, value } = e.target;
    setFormErrors({
      ...formErrors,
      [name]: value.length ? '' : `The ${name} is required`,
    });
  };

  return (
    <>
      <h1>Create product</h1>
      <form onSubmit={submitHandler}>
        <TextField
          label='name'
          id='name'
          name='name'
          helperText={formErrors.name}
          onBlur={blurHandler}
        />
        <TextField
          label='size'
          id='size'
          name='size'
          helperText={formErrors.size}
          onBlur={blurHandler}
        />
        <InputLabel htmlFor='type'>Type</InputLabel>
        <NativeSelect
          value=''
          onBlur={blurHandler}
          inputProps={{
            name: 'type',
            id: 'type',
          }}>
          <option aria-label='None' value='' />
          <option value={'electronic'}>Electronic</option>
          <option value={'furniture'}>Furniture</option>
          <option value={'clothing'}>Clothing</option>
        </NativeSelect>
        {formErrors.type.length && <p>{formErrors.type}</p>}
        <Button type='submit' disabled={isSaving}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default Form;
