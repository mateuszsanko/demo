import {expect, request, test} from "@playwright/test";
import {PetStoreApi} from "./classes/generated/PetStoreApi";
import {PetHelper} from "./classes/PetHelper";
import {PetPlaywright} from "./classes/PetPlaywright";

let api: PetStoreApi<unknown>;

test.beforeEach((async ({page}, testInfo) => {
    api = new PetStoreApi();
}))

test("create user", async ({request}) => {
    const id = 123;
    const response = await api.user.createUser({
        userStatus: 0,
        email: "ms@github.com",
        firstName: "mati",
        lastName: "san",
        phone: "888333222",
        password: "secret",
        username: "msan",
        id: id
    });

    const obj = await response.json();

    expect(parseInt(obj.message)).toEqual(id);
    expect(response.status).toEqual(200);
});

test("list of available pets", async ({request}) => {
    // const api = new PetStoreApi();
    const pets = await api.pet.findPetsByStatus({status: ["available"]});
    const helper = new PetHelper(pets.data);
    const result = helper.getPetsIdsAndNames();

    console.log(result);
});

test("count occurrences of pets", async ({request}) => {
    const pets =
        await api.pet.findPetsByStatus({status: ["available", "pending", "sold"]});
    const helper = new PetHelper(pets.data);
    const result = helper.countNamesOccurrences();

    console.log(result);
});

test.only("add pet", async ({request}) => {
    const petPlay = new PetPlaywright(request);
    const response = await petPlay.addPet({
        status: "available",
        id: 1,
        name: "piesek",
        category: {id: 1, name: "cat"},
        tags: [{id: 2, name: "tag"}],
        photoUrls: ["ur1l", "url2"]
    });

    const obj = await response.json();

    console.log(obj.name);
})