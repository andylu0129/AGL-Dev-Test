import React, { useState, useEffect } from 'react';
import { PersonData } from '../dto/PersonData';
import { PetData } from '../dto/PetData';
import DataService from '../services/DataService';
import { MALE_GENDER, FEMALE_GENDER, CAT_TYPE } from '../util/constants';

function SortedData() {
  const [maleOwnerCats, setMaleOwnerCats] = useState<PetData[]>([]);
  const [femaleOwnerCats, setFemaleOwnerCats] = useState<PetData[]>([]);

  // categorise pet data into lists based on the owner's gender and sort in alphabetical order.
  const categorise = (personData: PersonData[]) => {
    const maleOwnerPets: PetData[] = [];
    const femaleOwnerPets: PetData[] = [];

    personData.forEach((owner: PersonData) => {
      const petList = owner.pets?.filter((pet: PetData) => pet.type === CAT_TYPE);
      petList?.forEach((pet: PetData) => {
        // prevent repetitive pet names.
        if (!(maleOwnerPets.includes(pet) && femaleOwnerPets.includes(pet))) {
          if (owner.gender === MALE_GENDER) {
            maleOwnerPets.push(pet);
          } else if (owner.gender === FEMALE_GENDER) {
            femaleOwnerPets.push(pet);
          }
        }
      });
    });
    maleOwnerPets?.sort((a: PetData, b: PetData) => {
      return a.name > b.name ? 1 : -1;
    });
    femaleOwnerPets?.sort((a: PetData, b: PetData) => {
      return a.name > b.name ? 1 : -1;
    });

    setMaleOwnerCats(maleOwnerPets);
    setFemaleOwnerCats(femaleOwnerPets);
  };

  const fetchData = async () => {
    try {
      const result: PersonData[] = await DataService.getJsonData();
      categorise(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container m-0 p-0 text-center">
        <div className="row m-5 m-0">
          <div className="col-sm-auto w-25 mx-4">
            <ul className="list-group">
              <li className="list-group-item fw-bold bg-dark text-white">{MALE_GENDER}</li>
              {maleOwnerCats.map((pet: PetData) => {
                return (
                  <li key={maleOwnerCats.indexOf(pet)} className="list-group-item bg-light">{pet.name}</li>
                );
              })}
            </ul>
          </div>
          <div className="col-sm-auto w-25 mx-4">
            <ul className="list-group">
              <li className="list-group-item fw-bold bg-dark text-white">{FEMALE_GENDER}</li>
              {femaleOwnerCats.map((pet: PetData) => {
                return (
                  <li key={femaleOwnerCats.indexOf(pet)} className="list-group-item bg-light">{pet.name}</li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SortedData;
