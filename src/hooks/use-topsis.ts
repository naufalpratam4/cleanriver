import {
  calculateWeightColumns,
  WeightDataProps,
  RankRiverDataSawProps,
  normalizeDataTopsisColumns,
  rankingRiverTopsisColumns,
  idealBestColumns,
  idealBestProps,
  idealWorstColumns,
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
  const [idealBestData, setIdealBest] = useState<idealBestProps[]>([]);
  const [idealWorstData, setIdealWorst] = useState<idealBestProps[]>([]);
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

    const normalizeWeightData = criteriaSAW.map((item) => {
      return {
        ...item,
        value: item.weight,
      };
    });

    const normalizeDataObj: any = {};
    normalizeWeightData.forEach((item) => {
      normalizeDataObj[item.criteria] = { ...item };
    });
    console.log(normalizeWeightData);

    const newNormalizeWeightedData = returnNormalizedData.map((item) => {
      // Nasty code, should be use COST-BENEFIT from attribute not hardcode, but it just works
      const criteria: Record<string, number> = {
        temperature: normalizeDataObj.temperature.value * item.temperature,
        turbidity: normalizeDataObj.turbidity.value * item.turbidity,
        solid: normalizeDataObj.solid.value * item.solid,
        distance: normalizeDataObj.distance.value * item.distance,
        terrain: normalizeDataObj.terrain.value * item.terrain,
        debit: normalizeDataObj.debit.value * item.debit,
      };
      return {
        ...item,
        ...criteria,
      };
    });

    const minValues: { [key: string]: number } = {
      temperature: Math.max(...newNormalizeWeightedData.map(data => data.temperature)),
      turbidity: Math.max(...newNormalizeWeightedData.map(data => data.turbidity)),
      solid: Math.max(...newNormalizeWeightedData.map(data => data.solid)),
      distance: Math.max(...newNormalizeWeightedData.map(data => data.distance)),
      terrain: Math.max(...newNormalizeWeightedData.map(data => data.terrain)),
      debit: Math.min(...newNormalizeWeightedData.map(data => data.debit))
    };
    const maxValues: { [key: string]: number } = {
      temperature: Math.min(...newNormalizeWeightedData.map(data => data.temperature)),
      turbidity: Math.min(...newNormalizeWeightedData.map(data => data.turbidity)),
      solid: Math.min(...newNormalizeWeightedData.map(data => data.solid)),
      distance: Math.min(...newNormalizeWeightedData.map(data => data.distance)),
      terrain: Math.min(...newNormalizeWeightedData.map(data => data.terrain)),
      debit: Math.max(...newNormalizeWeightedData.map(data => data.debit))
    };

    const euclideanDistanceBest = newNormalizeWeightedData.map((point) => {
      const distance = Math.sqrt(
        Object.keys(point).reduce((sum, key) => {
          if (key !== 'no' && key !== 'name') { // Exclude non-attribute keys
            const weightedDistance = point[key] - maxValues[key];
            return sum + Math.pow(weightedDistance, 2);
          }
          return sum;
        }, 0)
      );
      return distance;
    });

    const euclideanDistanceWorst = newNormalizeWeightedData.map((point) => {
      const distance = Math.sqrt(
        Object.keys(point).reduce((sum, key) => {
          if (key !== 'no' && key !== 'name') { // Exclude non-attribute keys
            const weightedDistance = point[key] - minValues[key];
            return sum + Math.pow(weightedDistance, 2);
          }
          return sum;
        }, 0)
      );
      return distance;
    });

    const V = euclideanDistanceWorst.map((distanceWorst, index) => {
      const distanceBest = euclideanDistanceBest[index];
      return distanceWorst / (distanceWorst + distanceBest);
    });

    console.log('D+ (Ideal Best):', euclideanDistanceBest);
    console.log('D- (Ideal Worst):', euclideanDistanceWorst);
    console.log('VVVV :', V);
    const combinedData = newNormalizeWeightedData.map((point, index) => {
      return {
        ...point,
        V: V[index]
      };
    });
    console.log('Combine :', combinedData);

    let newRankData = combinedData.map<RankRiverDataSawProps>((item) => {
      return {
        ...item,
        rank: 1,
        total: item.V,
      };
    });

    // Melakukan perangkingan
    let sorted = newRankData.slice().sort(function (a, b) {
      return b.total - a.total;
    });
    let ranks = newRankData.map(function (v) {
      return sorted.indexOf(v) + 1;
    });
    newRankData = ranks.map<RankRiverDataSawProps>((rank, idx) => {
      return {
        ...newRankData[idx],
        rank,
      };
    });
    newRankData = newRankData.map((item) => {
      const isRankFound = newRankData.find((data) => data.total === item.total);
      return {
        ...item,
        rank: isRankFound ? isRankFound.rank : item.rank,
      };
    });

    setNormalizeData(returnNormalizedData);
    setNormalizeWeightData(newNormalizeWeightedData);
    const idealBestValues = Object.entries(maxValues).map(([key, value]) => ({
      criteria: key,
      value,
    }));
    const idealWorstValues = Object.entries(minValues).map(([key, value]) => ({
      criteria: key,
      value,
    }));
    setIdealBest(idealBestValues);
    setIdealWorst(idealWorstValues);
    console.log(returnNormalizedData);
    console.log(newNormalizeWeightedData);
    console.log(newRankData);
    console.log(idealBestValues);
    console.log(maxValues);
    console.log(minValues);
    setRankData(newRankData);
  }, []);

  return {
    calculateWeight: {
      columns: calculateWeightColumns,
      data: calculateWeightData,
    },
    normalizeData: {
      columns: normalizeDataTopsisColumns,
      data: normalizeData,
    },
    normalizeWeightData: {
      columns: normalizeDataTopsisColumns,
      data: normalizeWeightData,
    },
    idealBest: {
      columns: idealBestColumns,
      data: idealBestData,
    },
    idealWorst: {
      columns : idealWorstColumns,
      data: idealWorstData,
    },
    rankData: {
      columns: rankingRiverTopsisColumns,
      data: rankData,
    },
  };

}

export default useTopsis;