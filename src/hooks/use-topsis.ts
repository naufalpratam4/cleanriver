import {
  calculateWeightColumns,
  WeightDataProps,
  RankRiverDataSawProps,
  normalizeDataTopsisColumns,
  rankingRiverSawColumns,
} from "@/data/columns/product-weight";
import { criteriaSAW } from "@/data/criteria";
import useDataset from "@/store/use-dataset";
import { useEffect, useState } from "react";
import { River } from "type";

const useTopsis = () => {
  const dataset = useDataset((store) => store.rivers);
  const [calculateWeightData, setCalculateWeightData] = useState<
    WeightDataProps[]
  >([]);
  const [normalizeWeightData, setNormalizeWeightData] = useState<
    WeightDataProps[]
  >([]);
  const [normalizeData, setNormalizeData] = useState<
    (River & { valueFinal: number })[]
  >([]);
  const [rankData, setRankData] = useState<RankRiverDataSawProps[]>([]);

  useEffect(() => {
    const n = dataset.length; // number of rows
    const m = Object.keys(dataset[0]).length; // number of columns

    const matrix = new Array(n);
    const normalizedMatrix = new Array(n);

    // Populate the matrix array
    for (let i = 0; i < n; i++) {
      matrix[i] = new Array(m);
      const data = Object.values(dataset[i]);

      for (let j = 0; j < m; j++) {
        const key = Object.keys(dataset[0])[j];
        matrix[i][j] = data[j];
      }
    }

    for (let j = 0; j < m; j++) {
      const key = Object.keys(dataset[0])[j];
      if (key !== 'no' && key !== 'name') {
        const denominator = Math.sqrt(
          new Array(n)
            .fill(0)
            .map((_, i) => Math.pow(matrix[i][j], 2))
            .reduce((p, c) => p + c, 0)
        );

        for (let i = 0; i < n; i++) {
          normalizedMatrix[i] = normalizedMatrix[i] || {}; // Create an empty object if it doesn't exist
          normalizedMatrix[i][key] = matrix[i][j] / denominator;
        }
      } else {
        for (let i = 0; i < n; i++) {
          normalizedMatrix[i] = normalizedMatrix[i] || {}; // Create an empty object if it doesn't exist
          normalizedMatrix[i][key] = matrix[i][j];
        }
      }
    }


    const returnNormalizedData = normalizedMatrix.map((item) => {
      return {
        ...item,
      };
    })

    setNormalizeData(returnNormalizedData);
    console.log(returnNormalizedData);
  }, []);

  return {
    calculateWeight: {
      columns: calculateWeightColumns,
      data: calculateWeightData,
    },
    normalizeWeight: {
      columns: calculateWeightColumns,
      data: normalizeWeightData,
    },
    normalizeData: {
      columns: normalizeDataTopsisColumns,
      data: normalizeData,
    },
    rankData: {
      columns: rankingRiverSawColumns,
      data: rankData,
    },
  };

}

export default useTopsis;