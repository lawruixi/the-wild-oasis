import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        // MutationFn only can call a function with one argument.
        mutationFn: updateCurrentUser,
        onSuccess: () => {
            toast.success("User account successfully updated.");
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { updateUser, isUpdating };
}
