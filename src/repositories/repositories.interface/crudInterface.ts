export default interface attributesCrud<T> {
    store(json: object): Promise<T>;
    update(id: string, json: object): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    getAll(): Promise<T[]>;
    findOneById(id: string): Promise<T | null>
}