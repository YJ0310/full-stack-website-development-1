import { Person, Location, place } from "./5a.js";
import { ContractTracer } from "./5b.js";
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
 * @returns {Promise<Person[]>} Persons
 */
const intialize_Persons = (name_list_given = null, id_start = 0) => {
  return new Promise(
    /**
     *
     * @param {Person[]} resolve
     */
    async (resolve, reject) => {
      setTimeout(() => {
        console.log(`Initializing ...`);
        const name_list = name_list_given ?? [
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
        const date_range = [1577808000000, 1580486400000 - 1];
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
            index + (id_start ?? 0) + 1,
            name_list[index],
            tel_list[index],
            health_list[index],
            date_list[index]
          );
          Persons.push(Person_item);
        }

        console.log(`Initialized Done !!`);
        resolve([...new Set(Persons)]);
      }, 0);
    }
  );
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
 * @returns {Promise<place[]>} Location
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
      await delay(0);
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
        `FSKTM`,
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
      const name_list = [...new Set(name_list_gross)];
      await delay(0);
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
            `FSKTM`,
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
      await delay(0);
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
      console.log(`Location generates successfully`);
      await delay(0);
      resolve([...new Set(location_list)]);
    }
  );
};

// Location_list()
//   .then(
//     /**
//      *
//      * @param {Location} Locations
//      */
//     async (Locations) => {
//       // await Locations.checkCapacity();
//       for (let i = 0; i < 10; i++) {
//         console.log(i+1)
//       try {
//           const add_visit_name =
//             Locations.places[
//               Math.floor(Math.random() * Locations.places.length)
//             ].name;
//           const add_visit_pax = Math.floor(Math.random() * 80);
//           await Locations.addVisit(add_visit_name, add_visit_pax);

//         } catch (error) {
//           console.error(error);
//         }
//       }
//       console.log(`Total visits today:\t${await Locations.getVisitsToday()}`);
//     }
//   )
//   .catch(console.error);

/**
 *
 * @param {Person[]} old_name_list
 * @returns {Person[]}
 */
const add_new_person_function = async (old_name_list = null) => {
  const name_list = [
    `Cheah Jin Yi`,
    `Leong Shi Ting`,
    `Cheah Yee Shuen`,
    `Loo Ee Wen`,
    `Paris Yap Zheng Cheng`,
    `Elaine Liew Hui Xin`,
    `Chin Man Li`,
    `Samantha Chuo Meng Eng`,
    `Katherine Lee Xin Yu`,
    `Olivia Ong`,
    `Chin Wen Xuan`,
    `Phuah En Yii`,
    `Angellice Ling Jing Err`,
  ].sort();
  const id_start = old_name_list.length;
  const new_name_list = await intialize_Persons(name_list, id_start);
  for (let i = 0; i < name_list.length - 3; i++) {
    await new_name_list.splice(
      Math.floor(Math.random() * new_name_list.length),
      1
    );
  }
  return new_name_list;
};

/**
 *
 * @param {Person[]} person_list
 * @param {place[]} location_list
 * @returns {import("./5b.js").Visits}
 */
const add_record_data_function = async (person_list, location_list) => {
  // data needed personId, locationId, timestamp, duration
  const date_range = [1577808000000, 1580486400000 - 1];
  const duration_range = [1000 * 60 * 5, 1000 * 3600 * 3];
  return {
    personId: person_list[Math.floor(Math.random() * person_list.length)].id,
    locationId:
      location_list[Math.floor(Math.random() * location_list.length)].id,
    timestamp: Math.floor(
      date_range[0] + Math.random() * (date_range[1] - date_range[0])
    ),
    duration: Math.floor(
      duration_range[0] +
        Math.random() * (duration_range[1] - duration_range[0])
    ),
  };
};

intialize_Persons()
  .then((people) => {
    Location_list()
      .then(async (location) => {
        const contract_tracer = new ContractTracer(people, location);

        const new_name_list = await add_new_person_function(people);
        // await delay();
        for (const new_name of new_name_list) {
          await contract_tracer.addPerson(new_name);
          // await delay(0.5);
        }
        let new_visit_record_list = [];
        const data_needed = contract_tracer.people.length * 10;
        for (let i = 0; i < data_needed; i++) {
          // call function to generate the data
          const new_visit_record = await add_record_data_function(
            people,
            location
          );
          new_visit_record_list.push(new_visit_record);
        }
        try {
          for (const visit_record of new_visit_record_list) {
            const { personId, locationId, timestamp, duration } = visit_record;
            await contract_tracer.recordVisit(
              personId,
              locationId,
              timestamp,
              duration
            );
          }
        } catch (error) {
          console.error(error);
        }
        new_visit_record_list = [...new Set(new_visit_record_list)];
        console.log(`${new_visit_record_list.length} Records Added`);
        const date_range = [1577808000000, 1580486400000 - 1];
        const contact_list = await contract_tracer.findContacts(
          contract_tracer.people[
            Math.floor(Math.random() * contract_tracer.people.length)
          ].id,
          Math.floor(
            date_range[0] + Math.random() * (date_range[1] - date_range[0])
          )
        );
        // console.table(contact_list);
        const health_report = await contract_tracer.generateHealthReport();
        console.log(`Below are health report ...`);
        await delay(2);
        console.table(health_report);

        const hotspot_area = await contract_tracer.identifyHotspot();
        console.log(`Below are hotspot area ...`);
        await delay(2);
        console.table(hotspot_area);

        console.log(`Now go to send health alert...`);
        await delay(2);
        if (
          contract_tracer.people.filter((i) => i.healthStatus === `infected`)
            .length === 0
        )
          return console.log(`No one is Infected ...`);
        for (const infected of contract_tracer.people.filter(
          (i) => i.healthStatus === `infected`
        )) {
          await contract_tracer.sendHealthAlert(infected.id);
        }
        let message_list = [{person: String,location: String,time: String}];
        for (const infected of contract_tracer.people.filter(
          (i) => i.healthStatus === `infected`
        )) {
         message_list = [...message_list, ...await contract_tracer.processContractTracing(infected.id) ]
          
        }
        message_list = [...new Set(message_list.slice(1).sort((a,b)=>a.time-b.time))];
        // message_list = message_list.sort((a,b)=>a.)
        console.table(message_list);
      })
      .catch(console.error);
  })
  .catch(console.error);
