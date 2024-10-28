import { delayExecution } from "@common/utils/delayExecution";
import { AxiosError } from "axios";
import { useState } from "react";

type ServerError = AxiosError<{
  error: {
    statusCode: number;
    message: string;
  };
}>;

interface FetchState<D> {
  data: D | null;
  loading: boolean;
  error: ServerError | null;
}

interface useFetchReturn<P, D> {
  state: FetchState<D>;
  request: (payload: P) => Promise<void>;
}

/**
 * 비동기 요청에 대한 상태를 제공하는 훅
 *
 * @param props.fetch - 요청 핸들러 함수를 전달합니다.
 * @param options.delay - 지연할 응답 시간을 명시합니다.
 */
const useFetch = <P, D>(
  fetch: (payload: P) => Promise<D>,
  options?: {
    delay: number;
  }
): useFetchReturn<P, D> => {
  const [state, setState] = useState<FetchState<D>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = async (payload: P) => {
    try {
      setState(() => ({ data: null, error: null, loading: true }));

      if (options?.delay) {
        await delayExecution(options.delay).start();
      }

      const data = await fetch(payload);

      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error as ServerError,
      });
    }
  };

  return { state, request };
};

export default useFetch;
