"use client";

import {
  QueryClient,
  // useQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [queryClient] = useState(() => {
  //   const client = new QueryClient();
  //   return client;
  // });
  const queryClient = new QueryClient();

  // queryClient.setQueryDefaults(["city"], {
  //   enabled: false,
  //   gcTime: Infinity,
  //   staleTime: Infinity,
  // });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
