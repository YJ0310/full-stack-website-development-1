import { Execute_File_Template } from "../../../../../global_function/function_handler/execute_file_class.js";

export default new Execute_File_Template({
  name: "referencing",
  async execute() {
    const user_data = {
      _id: "#101",
      name: "Chau Kai Lin",
      email: "kailinu@gmail.com",
      addres: "#A01",
    };

    const address_data = {
      _id: "#A01",
      street: "MountKiara",
      state: "Selangor",
      country: "Malaysia",
      code: "40400",
    };

    return { user_data, address_data };
  },
});
