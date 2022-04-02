/* eslint-disable camelcase */
import { PetData } from './PetData';

export interface PersonData {
    name: string,
    gender: string,
    age: string,
    pets: PetData[],
}
