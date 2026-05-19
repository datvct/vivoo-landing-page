import api from "@/lib/axios";
import { ApiResponse } from "@/types/response";

export type StatsPeriod = "week" | "month" | "year";

export type StatsResponseData = {
  period: StatsPeriod;
  from: string;
  to: string;
  counts: {
    products: number;
    services: number;
    solutions: number;
    contacts: number;
  };
};

export const statsApi = {
  getStats: async (period?: StatsPeriod): Promise<ApiResponse<StatsResponseData>> => {
    const response = await api.get("/stats", { params: { period } });
    return response.data;
  },
};
