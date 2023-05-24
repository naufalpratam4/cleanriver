import create from "zustand";
import dataset from "@/data/dataset";
import { River } from "type";

type UseDatasetProps = {
  rivers: River[];
  push: (river: Omit<River, "no">) => void;
};

const useDataset = create<UseDatasetProps>((set) => {
  return {
    rivers: dataset,
    push: (river) => {
      set((store) => {
        const newRivers = store.rivers.map((item, idx) => ({
          ...item,
          no: idx + 1,
        }));

        const lastNum = newRivers[newRivers.length - 1].no;
        const newRiver = {
          no: lastNum + 1,
          name: river.name,
          temperature: river.temperature,
          turbidity: river.turbidity,
          solid: river.solid,
          distance: river.distance,
          terrain: river.terrain,
          debit: river.debit,
        };

        newRivers.push(newRiver);

        return {
          rivers: newRivers,
        };
      });
    },
  };
});

export default useDataset;
