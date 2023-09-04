
import { ethers } from "ethers"

/**
 * change data type from Number to BigNum 
 * @param {Number} value - data that need to be change
 * @param {Number} d - decimals
 */
function toBigNum(value:number, d:number) {
  return ethers.utils.parseUnits(Number(value).toFixed(d), d);
}

/**
 * change data type from BigNum to Number
 * @param {Number} value - data that need to be change
 * @param {Number} d - decimals
 */
function fromBigNum(value:number, d:number) {
  return parseFloat(ethers.utils.formatUnits(value, d));
}

export { toBigNum, fromBigNum };