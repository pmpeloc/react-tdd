import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { saveProduct } from '../services/productService';
import {
  CREATED_STATUS,
  ERROR_SERVER_STATUS,
  INVALID_REQUEST_STATUS,
} from '../constants/httpStatus';

const Form = () => {
  const [formErrors, setFormErrors] = useState({
    name: '',
    size: '',
    type: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateFields = ({ name, value }) => {
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: value.length ? '' : `The ${name} is required`,
    }));
  };

  const validateForm = ({ name, size, type }) => {
    validateFields({ name: 'name', value: name });
    validateFields({ name: 'size', value: size });
    validateFields({ name: 'type', value: type });
  };

  const getFormValues = ({ name, size, type }) => ({
    name: name.value,
    size: size.value,
    type: type.value,
  });

  const fetchErrorsHandler = async (error) => {
    if (error.status === ERROR_SERVER_STATUS) {
      setErrorMessage('Unexpected error, please try again');
      return;
    }
    if (error.status === INVALID_REQUEST_STATUS) {
      const data = await error.json();
      setErrorMessage(data.message);
      return;
    }
    setErrorMessage('Connection error, please try later');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const { name, size, type } = e.target.elements;
    validateForm(getFormValues({ name, size, type }));
    try {
      const res = await saveProduct(getFormValues({ name, size, type }));
      if (!res.ok) {
        throw res;
      }
      if (res.status === CREATED_STATUS) {
        e.target.reset();
        setIsSuccess(true);
      }
    } catch (error) {
      fetchErrorsHandler(error);
    }
    setIsSaving(false);
  };

  const blurHandler = (e) => {
    const { name, value } = e.target;
    validateFields({ name, value });
  };

  return (
    <Container maxWidth='xs'>
      <CssBaseline />
      <Typography component='h1' variant='h5' align='center'>
        Create product
      </Typography>
      {isSuccess && <p>Product Stored</p>}
      <p>{errorMessage}</p>
      <form onSubmit={submitHandler}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='name'
              id='name'
              name='name'
              helperText={formErrors.name}
              onBlur={blurHandler}
              error={!!formErrors.name.length}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='size'
              id='size'
              name='size'
              helperText={formErrors.size}
              onBlur={blurHandler}
              error={!!formErrors.size.length}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor='type'>Type</InputLabel>
            <NativeSelect
              fullWidth
              onBlur={blurHandler}
              error={!!formErrors.type.length}
              inputProps={{
                name: 'type',
                id: 'type',
              }}>
              <option aria-label='None' value='' />
              <option value={'electronic'}>Electronic</option>
              <option value={'furniture'}>Furniture</option>
              <option value={'clothing'}>Clothing</option>
            </NativeSelect>
            {!!formErrors.type && <p>{formErrors.type}</p>}
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type='submit' disabled={isSaving}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Form;
