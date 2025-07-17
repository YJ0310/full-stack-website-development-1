// Part B: Contact Tracing Manager (12 marks)

import { Location, Person, place } from "./5a.js";
import { delay } from "./test.js";

/**
 * @typedef {Object} Visits
 * @property {number} personId
 * @property {number} locationId
 * @property {number} timestamp
 * @property {number} duration in seconds
 */
/**
 * @typedef {Object} location
 * @property {String} id
 * @property {String} name
 * @property {number} mark
 */
// Create ContactTracer class:

export class ContractTracer {
  /**
   *
   * @param {Person[]} people - people `Tan Chin Shi`
   * @param {place[]} locations - location `Restoran ABC`
   * @param {Visits[]} visits - visits
   * @param {boolean} alerts - alert `True | False`
   */
  constructor(people, locations, visits = [], alerts = false) {
    this.people = people;
    this.locations = locations;
    this.visits = visits;
    this.alerts = alerts;
  }
  /**
   *
   * @param {Promise<Person[]>} person
   */
  addPerson(person) {
    console.log(`Adding ${person.name} (${person.id}) ...`);
    return new Promise((resolve, reject) => {
      delay(0)
        .then(() => {
          console.log(`${person.name} Added`);
          resolve(this.people.push(person));
        })
        .catch((error) => reject(error));
    });
  }
  /**
   *
   * @param {number} personId
   * @param {number} locationId
   * @param {number} timestamp
   * @param {number} duration
   * @returns {Promise<Visits[]>}
   */
  recordVisit(personId, locationId, timestamp, duration) {
    return new Promise((resolve) => {
      delay(0).then(() => {
        const visit = {
          personId: personId,
          locationId: locationId,
          timestamp: timestamp,
          duration: duration,
        };
        // console.log(`Visit recorded`);

        resolve(this.visits.push(visit));
      });
    });
  }
  /**
   *
   * @param {string} personId
   * @param {Date} date
   * @param {number} [day=3]
   * @returns {Promise<Person[]>}
   */
  findContacts(personId, date, day = 3) {
    return new Promise(async (resolve) => {
      const day_to_timestamp = day * 1000 * 3600 * 24;
      const selected_person = this.people.find(
        (person) => person.id === personId
      );
      console.log(
        `Finding contact for ${selected_person.name} (${selected_person.id})`
      );
      const selected_person_visit_list = this.visits.filter(
        (i) => i.personId === selected_person.id
      );
      selected_person_visit_list.map(
        (i) =>
          (i.location_name = this.locations.find(
            (j) => j.id === i.locationId
          ).name)
      );
      selected_person_visit_list.map(
        (i) => (i.time = new Date(i.timestamp).toString())
      );
      selected_person_visit_list.sort((a, b) => a.timestamp - b.timestamp);
      // find the contacts person that contact with the person
      /**
       * @type {Visits[]}
       */
      let selected_person_contact_list = [];
      //   const test = this.locations.map(i=>i)
      for (const location of this.locations) {
        const person_list_location = selected_person_visit_list.filter(
          (i) => i.locationId === location.id
        );
        const people_list_location = this.visits.filter(
          (i) => i.locationId === location.id
        );
        for (const person_location of person_list_location) {
          const contact_list = people_list_location
            .filter(
              (i) =>
                (i.timestamp <
                  person_location.timestamp + person_location.duration ||
                  i.duration > person_location.timestamp - i.timestamp) &&
                i.timestamp > date - day_to_timestamp &&
                i.timestamp < date + day_to_timestamp
            )
            .filter((i) => i.personId !== selected_person.id);
          selected_person_contact_list = [
            ...selected_person_contact_list,
            ...new Set(contact_list),
          ];
        }
      }
      selected_person_contact_list.map(
        (i) => (i.person = this.people.find((j) => j.id === i.personId).name)
      );
      selected_person_contact_list.map(
        (i) =>
          (i.location = this.locations.find((j) => j.id === i.locationId).name)
      );
      selected_person_contact_list.map(
        (i) => (i.time = new Date(i.timestamp).toString())
      );
      selected_person_contact_list.map(
        (i) =>
          (i.duration_in_minutes = parseFloat(i.duration / 60000).toFixed(2))
      );
      const selected_person_contact_list_view = [
        ...new Set(
          selected_person_contact_list.map(
            ({ person, location, time, duration_in_minutes }) => ({
              person,
              location,
              time,
              duration_in_minutes,
            })
          )
        ),
      ];
      const contact_list = [
        ...new Set(selected_person_contact_list_view.map((i) => i.person)),
      ];
      const Person_list = this.people.filter((i) =>
        selected_person_contact_list.some((j) => j.personId === i.id)
      );
      //   console.table(Person_list);
      const stats = {};
      stats.people = this.people.length;
      stats.contact = Person_list.length;
      console.log(
        `${stats.contact} of ${stats.people} were found contacted with ${
          selected_person.name
        } (${selected_person.id}) from ${new Date(
          date - day_to_timestamp
        ).toString()} to ${new Date(date + day_to_timestamp).toString()}`
      );
      await delay(2);
      resolve(Person_list);
      return;
    });
  }
  generateHealthReport() {
    return new Promise((resolve) => {
      //   console.table(this.people);
      let report_list = [
        ...new Set(
          this.people.map(({ id, name, phone, healthStatus, lastTested }) => ({
            id,
            name,
            phone,
            healthStatus,
            lastTested,
          }))
        ),
      ];
      resolve(report_list);
    });
  }

//   /**
//    * @returns {Promise<location[]>}
//    */
  identifyHotspot() {
    return new Promise((resolve) => {
      // no input
      // for every location make a list
      /**
       * @type {location[]}
       */
      let location_list = [];
      for (const location of this.locations) {
        let mark = 0;
        const id = location.id;
        for (const { id, lastTested } of this.people.filter(
          (i) => i.healthStatus === `infected`
        )) {
          mark += this.visits
            .filter((i) => i.personId === id)
            .filter(
              (i) =>
                i.timestamp > lastTested - 3 * 24 * 3600 * 1000 &&
                i.timestamp < lastTested
            )
            .filter((i) => i.locationId === location.id).length;
        }
        location_list = [...new Set(location_list), { id, mark }];
      }
      location_list = location_list.sort((a, b) => b.mark - a.mark);

      for (let { name, id } of location_list) {
        name = this.locations.find((i) => i.id === id).name;
        location_list[location_list.findIndex((i) => i.id === id)].name = name;
      }
      location_list = location_list.map(({ id, name, mark }) => ({
        id,
        name,
        infected: mark,
      }));
      // output top 5 place with most infected.
      location_list = location_list.slice(0, 5);
      resolve(location_list);
    });
  }
  /**
   *
   * @param {string} personId
   * @param {string} message
   */
  async sendHealthAlert(
    personId,
    message = `You are infected. Kindly quarantine yourself for 3 days. Thank you for your coorperation.`
  ) {
    await new Promise(async (resolve, reject) => {
      // send message
      const msg = {
        message,
        person: this.people.find((i) => i.id === personId),
        name: this.people.find((i) => i.id === personId).name,
        send: ``,
      };
      const { name } = msg;
      msg.send = `to: ${name}\nmessage: Hi ${name}. ${message}`;
      await delay();
      console.log(msg.send);
      resolve();
    });
  }
  async processContractTracing(infectedPersonId) {
    // send message
    const list = {
      contact: await this.findContacts(
        infectedPersonId,
        this.people.find((i) => i.id === infectedPersonId).lastTested
      ),
    };
    const message = {
      people: list.contact,
      visit: this.visits,
      template: [
        `You have been found contact with the infected recently. Kindly go to the clinic for swab test.`,
      ],
      custom_message: [
        {
          person: String,
          location: String,
          time: String,
        },
      ],
    };
    for (const person of message.people) {
      for (const visit_item of message.visit.filter(
        (i) => i.personId === person.id
      )) {
        // console.log(`Hi ${person.name}. ${message.template}`);
        const { person_name, location, time } = {
          person_name: person.name,
          location: this.locations.find((i) => i.id === visit_item.locationId)
            .name,
          time: new Date(visit_item.timestamp).toString(),
        };
        message.custom_message.push({ person: person_name, location, time });
      }
    }
    return message.custom_message.slice(1);
    // console.table(message.custom_message.map(({person_name,location,time})=>({person:person_name,location,time})));
  }
}

// Properties: people, locations, visits, alerts
// Methods:
// addPerson(person) - adds person to system
// recordVisit(personId, locationId, timestamp, duration) - records a visit
// findContacts(personId, days) - finds people who visited same locations within timeframe
// generateHealthReport() - creates summary of health status
// identifyHotspots() - finds locations with most infected visits
// Implement asynchronous notification system:

// sendHealthAlert(personId, message) - simulates sending SMS alert (2 second delay)
// processContactTracing(infectedPersonId) - finds contacts and sends alerts to all
