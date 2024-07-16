import { catalog } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchCatalog() {
  const {data, error, isLoading} = useQuery<Array<catalog>>({
    queryKey: ["catalog"],
    queryFn: async () => {
      const response = await axios.get('/api/catalog');
      return response.data
    },
  })
  return { data, error, isLoading}
}
