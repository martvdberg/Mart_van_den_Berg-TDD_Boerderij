const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

describe("getCostsForCrop", () => {
  test("calculate price for crop", () => {
    const corn = {
      name: "corn",
      price: 2,
    };
    const input = {
      crop: corn,
      numCrops: 20,
    };

    expect(getCostsForCrop(input)).toBe(40);
  });
});

describe("getRevenueForCrop", () => {
  test("Calculate revenue for crop with no environment factors", () => {
    const corn = {
      name: "corn",
      yield: 5,
      salePrice: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };

    expect(getRevenueForCrop(input)).toBe(150);
  });
});

describe("getProfitForCrop", () => {
  test("Calculate profit with no environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      price: 2,
      salePrice: 3,
    };

    const input = {
      crop: corn,
      numCrops: 5,
    };

    expect(getProfitForCrop(input)).toBe(35);
  });
});

describe("getTotalProfit", () => {
  test("Calculate total profit with no environmental factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      price: 2,
      salePrice: 3,
    };

    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      price: 3,
      salePrice: 5,
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];

    expect(getTotalProfit({ crops })).toBe(69);
  });
});

// Test with environment factors
describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
    factors: {
      sun: {
        low: -50,
        medium: 0,
        high: 50,
      },
    },
  };

  const environmentFactors = {
    sun: "high",
  };

  test("Get yield for plant with environment factors", () => {
    expect(getYieldForPlant(corn, environmentFactors)).toBe(45);
  });
});

describe("getYieldForCrop", () => {
  test("Calculate yield for crop with invironment factors", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      rain: "medium",
      wind: "low",
    };

    const input = {
      crop: corn,
      numCrops: 1,
    };

    expect(getYieldForCrop(input, environmentFactors)).toBe(15);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops and environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 30,
          medium: 0,
          high: -15,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };

    const environmentFactors = {
      sun: "low",
      rain: "medium",
      wind: "low",
    };

    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops }, environmentFactors)).toBe(13.75);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});
