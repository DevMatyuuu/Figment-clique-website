import { stocks } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchStocks() {
  const {data, error, isLoading} = useQuery<Array<stocks>>({
    queryKey: ["stocks"],
    queryFn: async () => {
      const response = await axios.get('/api/stocks');
      return response.data
    },
  })
  return { data, error, isLoading}
}
