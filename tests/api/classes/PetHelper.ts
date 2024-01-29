import {Pet} from "./generated/PetStoreApi";

interface SimplePetData {
    id: number,
    name: string
}

export class PetHelper {

    readonly pets: Pet[];

    constructor(pets: Pet[]) {
        this.pets = pets;
    }

    getPetsIdsAndNames(): SimplePetData[] {
        return this.pets.map((pet) => {
            return {id: pet.id, name: pet.name}
        })
    }

    countNamesOccurrences(): Map<string, number> {
        const values = new Map<string, number>();
        this.pets.forEach((pet) => {
            values.has(pet.name) ? values.set(pet.name, values.get(pet.name) + 1) : values.set(pet.name, 1);
        })
        return values;
    }
}