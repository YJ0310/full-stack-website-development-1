export class Global_data_generation {
  constructor(parameters) {
    /**
     * @type {global_data_generation_jsdoc.data}
     */
    this.data = [];
    const name = [
      `Sek Yin Jia`,
      "Tan Chin Shi",
      "Tan E Jane",
      "Angellice Ling Jing Err",
      "Kueh Pang Lang",
      "Loo Ee Wen",
      "Cheah Jin Yi",
      "Ang Ai Qin",
      "Samantha Chuo Meng Eng",
      "Leong Shi Ting",
      "Leong Shi Xuan",
      "Tang Euzine",
      "Siew Shi Nee",
      "Katherine Lee Xin Yu",
      "Cheah Yong Ning",
      "Elizebeth Soo",
      "Ooi Hui En",
      "Jing Ying",
      "Chau Kai Lin",
      "Liew Xin Tong",
      "Michelle Tan",
      "Olivia Ong",
      "Cheah Xin Ru",
      "Soh Yong En",
    ];
    const place = [
      "Alor Setar",
      "Penang",
      "Alor Setar",
      "Bintulu",
      "Johor Bharu",
      "Alor Setar",
      "Alor Setar",
      "Sarawak",
      "Sibu",
      "Alor Setar",
      "Alor Setar",
      "Alor Setar",
      "Kepong",
      "Batu Pahat",
      "Ipoh",
      "Puchong",
      "Alor Setar",
      "Johor",
      "Selangor",
      "Johor",
      "Johor",
      "Selangor",
      "Perak",
      "Pahang",
    ];
    const age = [
      21, 22, 21, 21, 21, 21, 22, 21, 21, 22, 23, 20, 21, 20, 22, 21, 21, 19,
      21, 21, 21, 20, 22, 19,
    ];
    const university = [
      "University Of Malaya",
      "University Of Malaya",
      "INTI",
      "University Of Malaya",
      "University Of Malaya",
      "Sunway University",
      "Taiwan Defence University",
      "University Science Malaysia",
      "University Of Malaya",
      "University In China",
      "University In China",
      "Brickfield Asia College",
      "University Of Malaya",
      "University Of Malaya",
      "University Of Malaya",
      "University Of Malaya",
      "Taylor University",
      "Johor Matriculation College",
      "University Of Malaya",
      "University Kebangsaan Malaysia",
      "University Of Malaya",
      "XMUM",
      "University Of Malaya",
      "University Johor Malaysia",
    ];
    let phone_number = ["0123345589"];
    for (let index = 1; index < name.length; index++) {
      const phone_number_element =
        "01" + Math.floor(10000000 + 189999999 * Math.random()).toString();
      phone_number.push(phone_number_element);
    }
    for (let index = 0; index < name.length; index++) {
      this.data.push({
        name: name[index],
        place: place[index],
        age: age[index],
        phone_number: phone_number[index],
        university: university[index],
      });
    }
  }
  my_potential_wife() {
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      const probability = Math.random();
      switch (true) {
        case probability < 0.4:
          element.potential_waifu = true;
          break;

        default:
          element.potential_waifu = false;
          break;
      }
    }
  }
}
