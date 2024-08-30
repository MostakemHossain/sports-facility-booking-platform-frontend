import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { useEffect, useState } from "react";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

type TDebouncedProps = {
  delay: number;
  searchQuery: string;
};
export const useDebounced = ({ searchQuery, delay }: TDebouncedProps) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debouncedValue;
};
