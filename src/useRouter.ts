import { useRouterContext } from "./useRouterContext";

export function useRouter(){
    return useRouterContext("useRouter");
}
