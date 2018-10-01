import { Toast } from "native-base";

export default {
  showSuccess(message: string) {
    Toast.show({
      text: message,
      type: "success"
    });
  },
  showError(message: string) {
    Toast.show({
      text: message,
      type: "danger"
    });
  }
};
