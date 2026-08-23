"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMapData, MAP_DATA_QUERY_KEY } from "./map_data";

export function useMapData(departmentId?: string) {
  return useQuery({
    queryKey: [...MAP_DATA_QUERY_KEY, departmentId || "all"],
    queryFn: () => fetchMapData(departmentId),
  });
}
