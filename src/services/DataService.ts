/* eslint-disable no-useless-escape */
import axios from 'axios';
import { JSON_URL } from '../util/constants';
import { PersonData } from '../dto/PersonData';

class DataService {
  // fetch data using given api and fill in provided parameters
  static async getJsonData(): Promise<Array<PersonData>> {
    const result = await axios.get(
      `${JSON_URL}`,
    );

    const personData = result.data.map((data: PersonData) => {
      return data;
    });

    return personData;
  }
}

export default DataService;
