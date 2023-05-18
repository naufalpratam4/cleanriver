import DatasetPage from "@/pages/dataset";
import TopsisPage from '@/pages/topsis';
import WeightProductPage from "@/pages/weight-product";
import SawPage from "@/pages/saw";

const mainRouter = [
  {
    path: "weight-product",
    element: <WeightProductPage />,
  },
    {
    path: "saw",
    element: <SawPage />,
  },
  {
    path: "",
    element: <DatasetPage />,
  },
];

export default mainRouter;
