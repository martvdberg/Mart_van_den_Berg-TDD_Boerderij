const getYieldForPlant = (plant) => {
  //   check if its a simple or a more complex object structur based on test provided by Winc
  if (plant.hasOwnProperty("yield")) {
    const basicYield = plant.yield;
    return basicYield;
  } else if (plant.crop.hasOwnProperty("yield")) {
    const basicYield = plant.crop.yield;
    return basicYield;
  }
};

const getYieldForCrop = (crop) => getYieldForPlant(crop) * crop.numCrops;

const getTotalYield = ({ crops }) =>
  crops.reduce((total, crop) => {
    return total + getYieldForCrop(crop);
  }, 0);

const getCostsForCrop = (crop) => crop.numCrops * crop.crop.price;

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
};
