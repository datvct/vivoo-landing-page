import { useQuery } from "@tanstack/react-query";
import { statsApi, StatsPeriod } from "./api";

export const useStatsQuery = (period?: StatsPeriod) => {
  return useQuery({
    queryKey: ["stats", period],
    queryFn: () => statsApi.getStats(period),
  });
};
