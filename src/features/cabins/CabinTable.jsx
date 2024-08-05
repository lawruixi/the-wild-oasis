import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) {
        return <Spinner />;
    }

    if (!cabins.length) {
        return <Empty resourceName={cabins} />;
    }

    const filterValue = searchParams.get("discount") || "all";

    // Filter results.

    let filteredCabins;
    if (filterValue === "all") {
        filteredCabins = cabins;
    } else if (filterValue === "no-discount") {
        filteredCabins = cabins.filter((cabin) => {
            return cabin.discount === 0;
        });
    } else if (filterValue === "with-discount") {
        filteredCabins = cabins.filter((cabin) => {
            return cabin.discount > 0;
        });
    }

    // 2. Sort Results
    const sortBy = searchParams.get("sortBy") || "startDate-asc";
    const [field, direction] = sortBy.split("-");

    const modifier = direction === "asc" ? 1 : -1;
    const sortedCabins = filteredCabins.sort(
        (a, b) => modifier * (a[field] - b[field])
    );

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header role="row">
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
}

//{cabins.map((cabin) => {
//return <CabinRow cabin={cabin} key={cabin.id} />;
//})}
//
export default CabinTable;