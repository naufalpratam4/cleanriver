import {
    calculateWeightColumns,
    WeightDataProps,
    normalizeDataColumns,
    RankRiverDataSawProps,
    rankingRiverColumns,
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

        const newNormalizeData = dataset.map((item) => {
            const criteria: Record<string, number> = {
                temperature: Number(item.temperature) / Math.min(...Object.values(item).map(Number)),
                turbidity: Number(item.turbidity) / Math.min(...Object.values(item).map(Number)),
                solid: Number(item.solid) / Math.min(...Object.values(item).map(Number)),
                distance: Number(item.distance) / Math.min(...Object.values(item).map(Number)),
                terrain: Number(item.terrain) / Math.min(...Object.values(item).map(Number)),
                debit: Number(item.debit) / Math.max(...Object.values(item).map(Number)),
            };
            return {
                ...item,
                ...criteria,
                valueFinal: Object.keys(criteria).reduce(
                    (prev, curr) => prev * criteria[curr],
                    1
                ),
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