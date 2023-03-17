import axios, { Canceler } from "axios";
import { useEffect, useState } from "react";
import { sweeftApi } from "../api/sweeft";
import { UserGeneric } from "../components/UserCard";

interface UserParams {
  userId?: number | null;
  page: number;
  size: number;
}

export const useUsers = ({ page, size, userId = 0 }: UserParams) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<UserGeneric[]>([]);
  const [isNextPage, setIsNextPage] = useState(true);
  const [isError, setIsError] = useState(false);
  const query = userId
    ? `user/${userId}/friends/${page}/${size}`
    : `user/${page}/${size}`;

  useEffect(() => {
    userId && setData([]);
  }, [userId]);

  useEffect(() => {
    let cancel: Canceler;
    setIsLoading(true);
    sweeftApi
      .get(query, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then(({ data }) => {
        if (data.pagination.nextPage === null) setIsNextPage(false);
        setData((prevData) => [...prevData, ...data.list]);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });

    //   same calls won't be made
    return () => cancel();
  }, [page, size, userId]);

  return { data, isNextPage, isLoading, isError };
};
