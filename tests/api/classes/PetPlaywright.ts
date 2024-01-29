import {APIRequestContext} from "@playwright/test";

export interface Pet {
    id?: number;
    category?: Category;
    name: string;
    photoUrls: string[];
    tags?: Tag[];
    status?: "available" | "pending" | "sold";
}

export interface Category {
    id?: number;
    name?: string;
}

export interface Tag {
    id?: number;
    name?: string;
}

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
}

export class PetPlaywright {

    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async addPet(body: Pet) {
        return await this.request.post('https://petstore.swagger.io/v2/pet', {data: body});
    }
}


