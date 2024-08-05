import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
    // 1. Number of bookings.
    const numBookings = bookings.length;

    // 2.
    const totalSales =
        bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

    // 3.
    const checkins = confirmedStays.length;

    // 4.
    // Estimation: number of checked-in nights / (num of nights * number of cabins)
    const occupation = confirmedStays.reduce(
        (acc, cur) => acc + cur.numNights,
        0
    ) / (numDays * cabinCount);

    return (
        <>
            <Stat
                title="Bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(totalSales)}
            />
            <Stat
                title="Check-Ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={checkins}
            />
            <Stat
                title="Occupancy Rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={`${Math.round(occupation * 100)}%`}
            />
        </>
    );
}

export default Stats;
