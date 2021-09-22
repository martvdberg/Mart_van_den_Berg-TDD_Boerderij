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

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
};
