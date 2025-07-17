// Question 5: COVID-19 Contact Tracing System - Comprehensive Application (20 marks)
// Scenario: You are developing a contact tracing system for "Smol Tako Health Ministry". The system needs to track people, their visits to locations, and identify potential contacts efficiently.

import { delay } from "./test.js";

// Given Requirements:

// Track individuals and their health status
// Record location visits with timestamps
// Identify potential contacts based on location and time overlap
// Generate health reports and alerts
// Part A: Person and Location Classes (8 marks)

/**
 * @typedef {`healthy`|`infected`|`recovered`} HealthStatus
 *
 */

// Create Person class:

export class Person {
  /**
   *
   * @param {number} id - id -1
   * @param {string} name - full name - "Tan Chin Shi"
   * @param {string} phone - phone number - "0123456789"
   * @param {`healthy`|`infected`|`recovered`} healthStatus - health status
   * @param {Date} [lastTested=Date()] - date
   */

  // Properties: id, name, phone, healthStatus ("healthy", "infected", "recovered"), lastTested
  constructor(id, name, phone, healthStatus = `healthy`, lastTested = Date()) {
    this.id = `#` + id.toString().padStart(3, `0`);
    this.name = name;
    this.phone = phone;
    this.healthStatus = healthStatus;
    /**
     * @type {number}
     */
    this.lastTested = lastTested.getTime();
  }
  // Methods: updateHealthStatus(), isHighRisk(), getDaysSinceTest()
  /**
   *
   * @param {`healthy`|`infected`|`recovered`} healthStatus - health status
   */
  updateHealthStatus(healthStatus) {
    try {
      this.healthStatus = healthStatus;
      console.log(`Status Updated to ${healthStatus}!!!`);
    } catch (error) {
      console.error(error);
    }
  }
  isHighRisk() {
    try {
      if (this.healthStatus === `infected`) {
        console.log(`Warning: ${this.name} is at High Risk !!`);
      } else {
        console.log(`${this.name} is Safe`);
      }
    } catch (error) {
      console.error(error);
    }
  }
  getDaysSinceTest() {
    try {
      const since_test_timestamp = Date.now() - this.lastTested;
      const days_since_test = parseFloat(
        since_test_timestamp / (1000 * 60 * 60 * 24)
      ).toFixed(2);
      console.log(`Day Since Test:\t${days_since_test} day(s)`);
    } catch (error) {
      console.error(error);
    }
  }
}
// Create Location class:
export class Location {
  /**
   * @typedef {Object} Place
   * @property {number} id
   * @property {string} name
   * @property {"restaurant"|"residential college"|"faculty"} type
   * @property {string} address
   * @property {number} maxCapacity
   */

  /**
   * @param {Place[]} [places=[]] - List of location entries
   */
  constructor(places = []) {
    this.places = places;
  }
  static place = class {
    /**
     *
     * @param {number} id - id `1`
     * @param {`Restoran ABC`|`Nasi Ayam Kunyit KK7`|`Daun Cafe`|`Food Arena KK12`|`McD SS2`|`Sharwarma KK2`|`Western Food KK5`|`Faculty of Science`|`Faculty of Engineeringg`|`Faculty of Arts and Social Science`|`Faculty of Medicine`|`Faculty of Business and Administration `|`FSKTM`|`Faculty of Education`|`1st Residential College`|`2nd Residential College`|`3rd Residential College`|`4th Residential College`|`5th Residential College`|`6th Residential College`|`7th Residential College`|`8th Residential College`|`9th Residential College`|`10th Residential College`|`11th Residential College`|`12th Residential College`|`13th Residential College`|`International House`|`Japan Apartment`} name - name `Restoran ABC`
     * @param {`restaurant`|`residential college`|`faculty`} type - type 'restaurant'
     * @param {`Kuala Lumpur`} address - adress `Kuala Lumpur`
     * @param {number} maxCapacity - maximum capacity `50`
     */

    // Properties: id, name, type, address, maxCapacity
    constructor(
      id,
      name = `Restoran ABC`,
      type = `restaurant`,
      address = `Kuala Lumpur`,
      maxCapacity = 50
    ) {
      this.id = `#` + id.toString().padStart(3, `0`);
      this.name = name;
      this.type = type;
      this.address = address;
      this.maxCapacity = maxCapacity;
      return this;
    }
  };
  // Methods: checkCapacity(), addVisit(), getVisitsToday()
  async checkCapacity() {
    await delay();
    console.log(`Checking the maximum capacity for each places ...`);
    await delay();
    const places_max_cap = [];
    this.places.map((place) => {
      places_max_cap.push({
        name: place.name,
        maximum_capacity: place.maxCapacity,
      });
    });
    console.log(`Checking complete`);
    await delay();
    console.table(places_max_cap);
  }
  /**
   *
   * @param {`Restoran ABC`|`Nasi Ayam Kunyit KK7`|`Daun Cafe`|`Food Arena KK12`|`McD SS2`|`Sharwarma KK2`|`Western Food KK5`|`Faculty of Science`|`Faculty of Engineeringg`|`Faculty of Arts and Social Science`|`Faculty of Medicine`|`Faculty of Business and Administration `|`FSKTM`|`Faculty of Education`|`1st Residential College`|`2nd Residential College`|`3rd Residential College`|`4th Residential College`|`5th Residential College`|`6th Residential College`|`7th Residential College`|`8th Residential College`|`9th Residential College`|`10th Residential College`|`11th Residential College`|`12th Residential College`|`13th Residential College`|`International House`|`Japan Apartment`} name - insert the place name `Restoran ABC`
   * @param {number} pax - number of people `1`
   * @returns {Promise}
   */
  async addVisit(name, pax) {
    return new Promise(
      /**
       *
       * @param {Location} resolve
       * @param {string} reject
       */
      async (resolve, reject) => {
        await delay();
        const place_selected = this.places.find(
          (element) => element.name === name
        );
        let current_pax = place_selected.pax ?? 0;
        if (current_pax + pax <= place_selected.maxCapacity) {
          place_selected.pax = current_pax + pax;
        } else {
          const error = [
            `Error: Exceed maximum capacity (${place_selected.maxCapacity})`,
            `Capacity available for ${place_selected.name}: ${
              place_selected.maxCapacity - current_pax
            }`,
          ];
          reject(error.join(`\n`));
          return;
        }
        console.log(`Visit Added`);
        console.log(`Pax Added: ${pax}`);
        console.table(
          (({ name, pax, maxCapacity }) => ({
            name_of_the_place: name,
            pax,
            maximum_capacity: maxCapacity,
          }))(place_selected)
        );
        resolve(this);
      }
    );
  }
  /**
   *
   * @returns {Promise}
   */
  async getVisitsToday() {
    return new Promise(
      /**
       *
       * @param {number} resolve
       * @param {string} reject
       */
      async (resolve, reject) => {
        let visits_today = 0;
        for (const place of this.places) {
          await delay();
          console.log(`${place.name} checked (${place.pax ?? 0})`);
          visits_today += place.pax ?? 0;
        }
        resolve(visits_today);
      }
    );
  }
}
// Expected Usage:

// const person1 = new Person(1, "Ahmad Ali", "012-3456789", "healthy", "2024-01-15");
// const location1 = new Location(1, "Restoran ABC", "restaurant", "KL", 50);
// console.log(person1.getDaysSinceTest()); // Should calculate days from lastTested to today

export class place {
  /**
   *
   * @param {number} id - id `1`
   * @param {`Restoran ABC`|`Nasi Ayam Kunyit KK7`|`Daun Cafe`|`Food Arena KK12`|`McD SS2`|`Sharwarma KK2`|`Western Food KK5`|`Faculty of Science`|`Faculty of Engineeringg`|`Faculty of Arts and Social Science`|`Faculty of Medicine`|`Faculty of Business and Administration `|`FSKTM`|`Faculty of Education`|`1st Residential College`|`2nd Residential College`|`3rd Residential College`|`4th Residential College`|`5th Residential College`|`6th Residential College`|`7th Residential College`|`8th Residential College`|`9th Residential College`|`10th Residential College`|`11th Residential College`|`12th Residential College`|`13th Residential College`|`International House`|`Japan Apartment`} name - name `Restoran ABC`
   * @param {`restaurant`|`residential college`|`faculty`} type - type 'restaurant'
   * @param {`Kuala Lumpur`} address - adress `Kuala Lumpur`
   * @param {number} maxCapacity - maximum capacity `50`
   */

  // Properties: id, name, type, address, maxCapacity
  constructor(
    id,
    name = `Restoran ABC`,
    type = `restaurant`,
    address = `Kuala Lumpur`,
    maxCapacity = 50
  ) {
    this.id = `#` + id.toString().padStart(3, `0`);
    this.name = name;
    this.type = type;
    this.address = address;
    this.maxCapacity = maxCapacity;
    return this;
  }
}
