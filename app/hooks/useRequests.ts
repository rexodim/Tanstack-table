import { useQuery } from "react-query";
import requests from "@/app/mock/requests.json";
import { IRequest } from "@/app/types";

const getData = () =>
  new Promise<IRequest[]>((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(requests as IRequest[]);
      }, 1000);
    } catch (error) {
      reject([]);
    }
  });

const useRequests = () => {
  return useQuery<IRequest[]>("requests", async () => {
    const data = await getData();

    return data;
  });
};

export default useRequests;
