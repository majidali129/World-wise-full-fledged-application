import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

// const AddCabin = () => {
//     const [isShowModal, setIsShowModal] = useState(false);

//     function handleCloseModal () {
//         setIsShowModal(false)
//     }

//   return (
//     <>
// <Button onClick={() => setIsShowModal(show => !show) } >Add new cabin</Button>

// {
//     isShowModal && <Modal  closeModal={handleCloseModal}>
//         <CreateCabinForm closeModal={handleCloseModal} />
//     </Modal>
// }
//     </>
//   )
// }

export default AddCabin;
