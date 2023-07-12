import Swal from "sweetalert2";
import { ConfirmProps } from "./../interfaces/";

const useConfirm = () => {
  const onHandleConfirm = async (props: ConfirmProps) => {
    const { title, text, icon } = props;

    const { isConfirmed } = await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: "Yes",
      confirmButtonColor: "#909191",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "red",
      focusCancel: true,
    });

    return isConfirmed;
  };

  const showAlert = (props: ConfirmProps) => {
    const { title, text, icon } = props;
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  };

  return { onHandleConfirm, showAlert };
};

export default useConfirm;
