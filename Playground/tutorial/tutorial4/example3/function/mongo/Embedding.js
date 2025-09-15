import { global } from "../..//main.js";
// Database Modeling in MongoDB

// User with embedded address

export default new global.function_handler.Execute_File_Template({
  name: "embedding",
  async execute() {
    const user_data = {
      _id: "#101",
      name: "Chau Kai Lin",
      email: "kailinu@gmail.com",
      address: {
        street: "MountKiara",
        state: "Selangor",
        country: "Malaysia",
        code: "40400",
      },
    };
    return user_data;
  },
});
