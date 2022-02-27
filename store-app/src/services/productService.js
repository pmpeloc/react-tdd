export const saveProduct = () =>
  fetch('/products', {
    method: 'POST',
    body: JSON.stringify({}),
  });

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  saveProduct,
};
