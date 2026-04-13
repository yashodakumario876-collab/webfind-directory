import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type WebsiteId = bigint;
export interface Website {
    id: WebsiteId;
    url: string;
    name: string;
    tags: Array<string>;
    submittedAt: bigint;
    description: string;
    category: string;
}
export interface backendInterface {
    getAllWebsites(): Promise<Array<Website>>;
    getCategories(): Promise<Array<string>>;
    getWebsiteById(id: WebsiteId): Promise<Website | null>;
    searchWebsites(searchTerm: string, category: string | null): Promise<Array<Website>>;
    submitWebsite(name: string, description: string, url: string, category: string, tags: Array<string>): Promise<Website>;
}
