/**
 * 
 * @param {number} start_number 
 * @param {number} end_number 
 * @returns 
 */
export const random = (start_number, end_number) => {
  return Math.floor(start_number + Math.random() * (end_number - start_number));
};
