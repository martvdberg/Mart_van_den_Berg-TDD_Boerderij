const getYieldForPlant = (plant, environment) => {
  // Check if environment is not undifined and the plant is effectd by any type of factor
  if (environment != undefined && plant.factors != undefined) {
    // get all the property names of the environment
    const enviromentFactors = Object.getOwnPropertyNames(environment);

    // itterate over each environment factor to calculate new yield
    let yieldWithFactors = plant.yield;
    enviromentFactors.forEach((factor) => {
      // only recalculate if the environment factor has effect on the plant
      if (plant.factors.hasOwnProperty(factor)) {
        switch (environment[factor]) {
          case "low":
            const lowValue = plant.factors[factor].low / 100 + 1;
            yieldWithFactors = yieldWithFactors * lowValue;
            break;

          case "medium":
            const mediumValue = plant.factors[factor].medium / 100 + 1;
            yieldWithFactors = yieldWithFactors * mediumValue;
            break;

          case "high":
            const highValue = plant.factors[factor].high / 100 + 1;
            yieldWithFactors = yieldWithFactors * highValue;
            break;
        }
      }
    });
    return yieldWithFactors;
  } else {
    // if environment is undifined or the plant has no factor to effect it return first yield calculation
    return plant.yield;
  }
};

const getYieldForCrop = (crop, environment) =>
  getYieldForPlant(crop.crop, environment) * crop.numCrops;

const getTotalYield = ({ crops }, environment) =>
  crops.reduce((total, crop) => {
    return total + getYieldForCrop(crop, environment);
  }, 0);

const getCostsForCrop = (crop) => crop.numCrops * crop.crop.price;

const getRevenueForCrop = (crop, environment) =>
  getYieldForCrop(crop, environment) * crop.crop.salePrice;

const getProfitForCrop = (crop, environment) =>
  getRevenueForCrop(crop, environment) - getCostsForCrop(crop);

const getTotalProfit = ({ crops }, environment) =>
  crops.reduce((total, crop) => {
    return total + getProfitForCrop(crop, environment);
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
