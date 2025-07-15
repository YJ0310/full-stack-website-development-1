import { Person, Location } from "./5a.js";
/**
 *
 * @returns {Person}
 */
const Person_test_function = () => {
  const Person_test = new Person(
    1,
    `Sek Yin Jia`,
    `0134540120`,
    `healthy`,
    new Date(1737350420000)
  );
  return Person_test;
};

/**
 * @returns {Person} Persons
 */
const intialize_Persons = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Initializing ...`);
      const name_list = [
        `Sek Yin Jia`,
        `Tan Chin Shi`,
        `Lim Zhi Wei`,
        `Goh Yu Chen`,
        `Ang Sheng Jun`,
        `Chan Wei Lun`,
        `Elizebeth Soo Wei Yean`,
        `Ku Kian Xiang`,
      ];

      const tel_list = [];
      for (let index = 0; index < name_list.length; index++) {
        let random_number;
        if (Math.random() < 0.4) {
          random_number = Math.floor(
            100000000 + Math.random() * (999999999 - 100000000)
          );
        } else {
          random_number = Math.floor(
            10000000 + Math.random() * (99999999 - 10000000)
          );
        }
        tel_list.push(`01${random_number}`);
      }

      const health_list = [];
      const health_choice = [`healthy`, `infected`, `recovered`];
      for (let index = 0; index < name_list.length; index++) {
        const probability = Math.random();
        if (probability <= 0.5) {
          health_list.push(health_choice[0]);
        } else if (probability <= 0.75) {
          health_list.push(health_choice[1]);
        } else {
          health_list.push(health_choice[2]);
        }
      }

      const date_list = [];
      const date_range = [1577808000000, 1672502400000 - 1];
      for (let index = 0; index < name_list.length; index++) {
        const random_date = Math.floor(
          date_range[0] + Math.random() * (date_range[1] - date_range[0])
        );
        date_list.push(new Date(random_date));
      }
      /**
       * @type {Person[]}
       */
      const Persons = [];
      for (let index = 0; index < name_list.length; index++) {
        const Person_item = new Person(
          index + 1,
          name_list[index],
          tel_list[index],
          health_list[index],
          date_list[index]
        );
        Persons.push(Person_item);
      }

      console.log(`Initialized Done !!`);
      resolve(Persons);
    }, 1000);
  });
};
/**
 *
 * @param {number} time
 * @returns
 */
export const delay = (time = 1) =>
  new Promise((resolve) => setTimeout(resolve, time * 1000));
/**
 *
 * @param {Person} Person_param - insert your Person Class
 * @returns {Person} Person_param (same value)
 */
const fully_check = (Person_param) => {
  return new Promise(async (resolve, reject) => {
    for (const person of Person_param) {
      await delay(1);
      console.log(person.name);
      person.isHighRisk();
      person.getDaysSinceTest();
      console.log(``);
    }
    console.log(`All done`);
    resolve(Person_param);
  });
};

// intialize_Persons().then(async (Persons) => {
//   const test = await fully_check(Persons);
// //   console.table(test);
// });

const Location_test_function = () => {
  return new Promise((resolve, reject) => {
    const Location_test_item = new Location.place(
      1,
      `Restoran ABC`,
      `restaurant`,
      `Kuala Lumpur`
    );
    const Location_test = new Location(Location_test_item);
    resolve(Location_test);
  });
};
/**
 *
 * @returns {Location}
 */
const Location_list = () => {
  return new Promise(
    /**
     *
     * @param {Location} resolve
     * @param {string} reject
     */
    async (resolve, reject) => {
      console.log(`Start Generating Location ...`);
      // to build a list of class we need name
      await delay();
      console.log(`Generating Name ...`);
      const name_list_gross = [];
      const name_choice = [
        `Restoran ABC`,
        `Nasi Ayam Kunyit KK7`,
        `Daun Cafe`,
        `Food Arena KK12`,
        `McD SS2`,
        `Sharwarma KK2`,
        `Western Food KK5`,
        `Faculty of Science`,
        `Faculty of Engineeringg`,
        `Faculty of Arts and Social Science`,
        `Faculty of Medicine`,
        `Faculty of Business and Administration `,
        `Faculty of Computer Science and Information Technology`,
        `Faculty of Education`,
        `1st Residential College`,
        `2nd Residential College`,
        `3rd Residential College`,
        `4th Residential College`,
        `5th Residential College`,
        `6th Residential College`,
        `7th Residential College`,
        `8th Residential College`,
        `9th Residential College`,
        `10th Residential College`,
        `11th Residential College`,
        `12th Residential College`,
        `13th Residential College`,
        `International House`,
        `Japan Apartment`,
      ];
      for (let i = 0; i < 10; i++) {
        name_list_gross.push(
          name_choice[Math.floor(Math.random() * name_choice.length)]
        );
      }
      const name_list = [...new Set(name_list_gross)]
      await delay();
      console.log(`Generating Other Properties ...`);
      const type_list = [];
      const address = [];
      const maxCapacity = [];
      const type_choice = [`restaurant`, `residential college`, `faculty`];
      const address_choice = `Kuala Lumpur`;
      const maxCapacity_choice = [5, 100];
      for (const name of name_list) {
        // type list & address list
        if (
          [
            `Restoran ABC`,
            `Nasi Ayam Kunyit KK7`,
            `Daun Cafe`,
            `Food Arena KK12`,
            `McD SS2`,
            `Sharwarma KK2`,
            `Western Food KK5`,
          ].includes(name)
        ) {
          type_list.push(type_choice[0]);
          address.push(address_choice);
        } else if (
          [
            `Faculty of Science`,
            `Faculty of Engineeringg`,
            `Faculty of Arts and Social Science`,
            `Faculty of Medicine`,
            `Faculty of Business and Administration `,
            `Faculty of Computer Science and Information Technology`,
            `Faculty of Education`,
          ].includes(name)
        ) {
          type_list.push(type_choice[1]);
          address.push(address_choice);
        } else if (
          [
            `1st Residential College`,
            `2nd Residential College`,
            `3rd Residential College`,
            `4th Residential College`,
            `5th Residential College`,
            `6th Residential College`,
            `7th Residential College`,
            `8th Residential College`,
            `9th Residential College`,
            `10th Residential College`,
            `11th Residential College`,
            `12th Residential College`,
            `13th Residential College`,
            `International House`,
            `Japan Apartment`,
          ].includes(name)
        ) {
          type_list.push(type_choice[2]);
          address.push(address_choice);
        } else {
          reject(
            `Invalid Name in name list: ${name_list[name_list.indexOf(name)]}`
          );
        }
        // maximum capacity
        maxCapacity.push(
          Math.floor(
            maxCapacity_choice[0] +
              Math.random() * (maxCapacity_choice[1] - maxCapacity_choice[0])
          )
        );
      }
      await delay();
      const location_list = [];
      name_list.forEach((name_item, index) => {
        const location_item = new Location.place(
          index + 1,
          name_item,
          type_list[index],
          address[index],
          maxCapacity[index]
        );
        location_list.push(location_item);
      });
      const Locations = new Location(location_list);
      console.log(`End`);
      resolve(Locations);
    }
  );
};

Location_list()
  .then(
    /**
     *
     * @param {Location} Locations
     */
    async (Locations) => {
      // await Locations.checkCapacity();
      for (let i = 0; i < 10; i++) {
        console.log(i+1)
      try {
          const add_visit_name =
            Locations.places[
              Math.floor(Math.random() * Locations.places.length)
            ].name;
          const add_visit_pax = Math.floor(Math.random() * 80);
          await Locations.addVisit(add_visit_name, add_visit_pax);
          
        } catch (error) {
          console.error(error);
        }
      }
      console.log(`Total visits today:\t${await Locations.getVisitsToday()}`);
    }
  )
  .catch(console.error);
