// utils/errorMiddleware.js
import { showMessage } from "../actions/notificationActions";

export const handleApiErrors = (error, store) => {
  if (error.response && error.response.data && error.response.data.errors) {
    const errorMessages = error.response.data.errors.map((err) => ({
      severity: "error",
      summary: 'Error',
      detail: err.msg,
      // summary: err.msg,
      // detail: `Field: ${err.path}`,
    }));

    store.dispatch(showMessage(errorMessages));
  } else {
    // Manejo de otros errores que no sean del tipo validación
    store.dispatch(
      showMessage([
        {
          severity: "error",
          summary: "Error",
          detail: "An unexpected error occurred",
        },
      ])
    );
  }
};
