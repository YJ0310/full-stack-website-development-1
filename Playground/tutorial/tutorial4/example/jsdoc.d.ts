import { WithId } from "mongodb";

declare namespace global_data_generation_jsdoc {
  type data = {
    name: string,
    place: string,
    age: number,
    university: "University of Malaya" | string,
    phone_number: string,
    potential_waifu: boolean,
    current_data: WithId<Document>[]
  }[];
}
