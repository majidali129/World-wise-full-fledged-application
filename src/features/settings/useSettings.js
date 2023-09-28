// import { useQuery } from "@tanstack/react-query/build/lib"
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings"

export const useSettings = () => {

    const {isLoading, error, data: settings} = useQuery({
        queryFn: getSettings,
        queryKey: ['settings']
    })

    return {isLoading, error, settings};
}
