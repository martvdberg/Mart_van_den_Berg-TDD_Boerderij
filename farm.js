const getYieldForPlant = (plant, environment) => {
  let plantObject = undefined;

  // make an simple object out of eevery input option
  if (plant.hasOwnProperty("yield")) {
    plantObject = plant;
  } else if (plant.crop.hasOwnProperty("yield")) {
    plantObject = plant.crop;
  }

  const basicYield = plantObject.yield;

  // Check if environment is not undifined and the plant is effectd by any type of factor
  if (environment != undefined && plantObject.factors != undefined) {
    let yieldWithFactors = basicYield;

    // get all the property names of the environment
    const enviromentFactors = Object.getOwnPropertyNames(environment);

    // itterate over each environment factor to calculate new yield
    enviromentFactors.forEach((factor) => {
      // only recalculate if the environment factor has effect on the plant
      if (plantObject.factors.hasOwnProperty(factor)) {
        switch (environment[factor]) {
          case "low":
            const lowValue = plantObject.factors[factor].low / 100 + 1;
            yieldWithFactors = yieldWithFactors * lowValue;
            break;

          case "medium":
            const mediumValue = plantObject.factors[factor].medium / 100 + 1;
            yieldWithFactors = yieldWithFactors * mediumValue;
            break;

          case "high":
            const highValue = plantObject.factors[factor].high / 100 + 1;
            yieldWithFactors = yieldWithFactors * highValue;
            break;
        }
      }
    });
    return yieldWithFactors;
  } else {
    // if environment is undifined or the plant has no factor to effect it return first yield calculation
    return basicYield;
  }
};

const getYieldForCrop = (crop, environment) =>
  getYieldForPlant(crop, environment) * crop.numCrops;

const getTotalYield = ({ crops }, environmentFactors) =>
  crops.reduce((total, crop) => {
    return total + getYieldForCrop(crop, environmentFactors);
  }, 0);

const getCostsForCrop = (crop) => crop.numCrops * crop.crop.price;

const getRevenueForCrop = (crop, environment) =>
  getYieldForCrop(crop, environment) * crop.crop.salePrice;

const getProfitForCrop = (crop) =>
  getRevenueForCrop(crop) - getCostsForCrop(crop);

const getTotalProfit = ({ crops }) =>
  crops.reduce((total, crop) => {
    return total + getProfitForCrop(crop);
  }, 0);

module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
