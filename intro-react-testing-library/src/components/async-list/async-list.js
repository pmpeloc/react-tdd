import React, { useEffect, useState } from 'react';

const foodList = ['Hamburger', 'Pizza', 'Tacos'];

const fakeApiCall = () =>
  new Promise((resolve) => setTimeout(resolve(foodList), 2000));

const AsyncList = () => {
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    fakeApiCall().then((data) => setFoodData(data));
  }, []);

  return foodData.map((name) => <p key={name}>{name}</p>);
};

export default AsyncList;
