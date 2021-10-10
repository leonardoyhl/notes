import { v4 as uuidv4 } from 'uuid';
import isArray from 'lodash-es/isArray';
import { isBoolean } from 'lodash-es';
import isObject from 'lodash/isObject';
// import _ from 'lodash';
import { count, increment } from './incrementer.js';

const id = uuidv4();
console.log(id);

console.log(count); // 0
increment();
console.log(count); // 1

console.log(isArray([]));
console.log(isBoolean(true));
console.log(isObject({}));
// console.log(_.isObject({}));
