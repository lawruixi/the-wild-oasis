import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import {useNavigate} from "react-router-dom";

export function useDeleteBooking() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation(
        {
            mutationFn: (bookingId) => deleteBookingApi(bookingId),
            onSuccess: () => {
                toast.success("Booking successfully deleted.");
                queryClient.invalidateQueries("bookings");
            },
            onError: (err) => {
                toast.error(err.message);
            },
        }
    );

    return { deleteBooking, isDeletingBooking };
}
