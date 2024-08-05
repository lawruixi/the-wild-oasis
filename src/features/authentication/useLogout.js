import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import supabase from "../../services/supabase";

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout, isLoading: isLoggingOut } = useMutation({
        mutationFn: logoutApi,
        onSuccess: (user) => {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
        },
        onError: (e) => {
            toast.error("Provided email or password are incorrect.");
        },
    });

    return { logout, isLoggingOut };
}
