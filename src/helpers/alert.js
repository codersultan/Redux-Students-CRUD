import Swal from "sweetalert2";

/**
 * Create aleart like - success or error
 */
export const createAlert = ({
  title,
  text,
  icon = "error",
  position = "center",
}) => {
  Swal.fire({
    position: position,
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 2000,
  });
};
