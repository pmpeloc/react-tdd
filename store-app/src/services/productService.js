export const saveProduct = ({ name, size, type }) =>
  fetch('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, size, type }),
  });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveProduct,
};
