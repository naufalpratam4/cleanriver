import Chip from "@/components/chip";
import DataTable from "@/components/data-table";
import { datasetColumns } from "@/data/columns";
import { calculateWeightSAWColumns } from "@/data/columns/product-weight";
import { criteriaSAW, criteriaWP } from "@/data/criteria";
import useSaw from "@/hooks/use-saw";
import useTitlePage from "@/hooks/use-title-page";
import DashboardLayout from "@/layouts/dashboard";
import useDataset from "@/store/use-dataset";
import { HStack } from "@chakra-ui/layout";
import { useState } from "react";

const chipMenu = [
  {
    text: "Dataset",
    value: "DATASET",
  },
  {
    text: "Criteria",
    value: "CRITERIA",
  },
  {
    text: "Calculate Criteria Weight",
    value: "CALCULATE",
  },
  {
    text: "Normalize Criteria Weight",
    value: "NORMALIZE_WEIGHT",
  },
  {
    text: "Normalize Data",
    value: "NORMALIZE_DATA",
  },
  {
    text: "Ranking",
    value: "RANKING",
  },
];

const SawPage = () => {
  useTitlePage("SAW");
  const [activeChip, setActiveChip] = useState(chipMenu[0]);
  const dataset = useDataset((store) => store.rivers);
  const calculate = useSaw();

  console.log(calculate.normalizeData);

  return (
    <DashboardLayout title="SAW Method">
      <HStack spacing="2" mb={3}>
        {chipMenu.map((item) => {
          return (
            <Chip
              key={item.value}
              text={item.text}
              active={item.value === activeChip.value}
              onClick={() => {
                setActiveChip(item);
              }}
            />
          );
        })}
      </HStack>
      {activeChip.value === "DATASET" ? (
        <DataTable data={dataset} columns={datasetColumns} />
      ) : null}
      {activeChip.value === "CRITERIA" ? (
        <DataTable
          data={criteriaSAW.map((item) => ({ ...item, value: item.weight }))}
          columns={calculateWeightSAWColumns}
        />
      ) : null}
      {activeChip.value === "CALCULATE" ? (
        <DataTable {...calculate.calculateWeight} />
      ) : null}
      {activeChip.value === "NORMALIZE_WEIGHT" ? (
        <DataTable {...calculate.normalizeWeight} />
      ) : null}
      {activeChip.value === "NORMALIZE_DATA" ? (
        <DataTable {...calculate.normalizeData} />
      ) : null}
      {activeChip.value === "RANKING" ? (
        <DataTable {...calculate.rankData} />
      ) : null}
    </DashboardLayout>
  );
};

export default SawPage;
