import "toastify-js/src/toastify.css";

import Toastify from "toastify-js";

export const toast = (message: string) => {
  Toastify({
    text: message,
    duration: 3500,
    close: false,
    gravity: "bottom",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "hsl(var(--background))",
      "border-radius": "0.5rem",
      border: "solid",
      "border-width": "2px",
      "border-color": "hsl(var(--border))",
    },
  }).showToast();
};
