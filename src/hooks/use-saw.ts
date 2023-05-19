import {
  calculateWeightColumns,
  WeightDataProps,
  RankRiverDataSawProps,
  normalizeDataSawColumns,
  rankingRiverSawColumns,
} from "@/data/columns/product-weight";
import { criteriaSAW } from "@/data/criteria";
import useDataset from "@/store/use-dataset";
import { useEffect, useState } from "react";
import { River } from "type";

const useSaw = () => {
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
    const totalWeight = criteriaSAW.reduce(
      (prev, curr) => prev + curr.weight,
      0
    )

    const normalizeWeightData = criteriaSAW.map((item) => {
      return {
        ...item,
        value: item.weight / totalWeight,
      };
    });

    const normalizeDataObj: any = {};
    normalizeWeightData.forEach((item) => {
      normalizeDataObj[item.criteria] = { ...item };
    });

    // Bad code, but it just works, and easy to understand
    const maxValues = {
      temperature: Math.max(...dataset.map(data => data.temperature)),
      turbidity: Math.max(...dataset.map(data => data.turbidity)),
      solid: Math.max(...dataset.map(data => data.solid)),
      distance: Math.max(...dataset.map(data => data.distance)),
      terrain: Math.max(...dataset.map(data => data.terrain)),
      debit: Math.max(...dataset.map(data => data.debit))
    };
    const minValues = {
      temperature: Math.min(...dataset.map(data => data.temperature)),
      turbidity: Math.min(...dataset.map(data => data.turbidity)),
      solid: Math.min(...dataset.map(data => data.solid)),
      distance: Math.min(...dataset.map(data => data.distance)),
      terrain: Math.min(...dataset.map(data => data.terrain)),
      debit: Math.min(...dataset.map(data => data.debit))
    };

    const newNormalizeData = dataset.map((item) => {
      // Bad code, should be use COST-BENEFIT from attribute not hardcode, but it just works
      const criteria: Record<string, number> = {
        temperature: minValues.temperature * normalizeDataObj.temperature.value / item.temperature,
        turbidity: minValues.turbidity * normalizeDataObj.turbidity.value / item.turbidity,
        solid: minValues.solid * normalizeDataObj.solid.value / item.solid,
        distance: minValues.distance * normalizeDataObj.distance.value / item.distance,
        terrain: minValues.terrain * normalizeDataObj.terrain.value / item.terrain,
        debit: item.debit / maxValues.debit * normalizeDataObj.debit.value,
      };
      const valueFinal = Object.values(criteria).reduce(
        (prev, curr) => prev + curr,
        0
      );
      return {
        ...item,
        ...criteria,
        valueFinal,
      };
    });

    let newRankData = newNormalizeData.map<RankRiverDataSawProps>((item) => {
      return {
        ...item,
        rank: 1,
        total: item.valueFinal,
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

    // Memasukkan data kedalam user interface
    setNormalizeData(newNormalizeData);
    // setCalculateWeightData(weightData);
    setNormalizeWeightData(normalizeWeightData);
    setRankData(newRankData);
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
      columns: normalizeDataSawColumns,
      data: normalizeData,
    },
    rankData: {
      columns: rankingRiverSawColumns,
      data: rankData,
    },
  };
}

export default useSaw;