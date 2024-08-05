import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function addCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new Cabin</Button>
                </Modal.Open>

                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}

//export default function AddCabin() {
//const [isOpenModal, setOpenModal] = useState(false);

//function handleCloseModal() {
//setOpenModal(false);
//}

//return (
//<div>
//<Button onClick={() => setOpenModal((show) => !show)}>
//Add new Cabin
//</Button>
//{isOpenModal && (
//<Modal onClose={handleCloseModal}>
//<CreateCabinForm onCloseModal={handleCloseModal}/>
//</Modal>
//)}
//</div>
//);
//}
