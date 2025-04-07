import { useState } from "react";

type mutationTypes<T, V> = {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onMutate?: (variables: V) => void;
};

export const useMutation = <T, V = void>(
  mutationFn: (variables: V) => Promise<T>,
  options?: mutationTypes<T, V>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const mutate = async (variables: V) => {
    setIsLoading(true);
    setError(null);
    options?.onMutate?.(variables);

    try {
      const result = await mutationFn(variables);
      setData(result);
      options?.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Mutation failed");
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, mutate };
};
