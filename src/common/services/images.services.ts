// Types
import {
    ApiService,
    ImageType,
    QueryType,
} from "common/type";

class ImagesService implements ApiService<ImageType> {

    private _api: ApiService<ImageType>;

    constructor(api: ApiService<ImageType>) {
        this._api = api;
    }

    public async getMany(query: QueryType): Promise<{ items: ImageType[], totalCount: number }> {
        if (!(typeof this._api?.getMany === 'function')) {
            return { items: [], totalCount: 0 };
        }

        return await this._api.getMany(query);
    };

    public async getOne(id: number | string): Promise<ImageType | undefined> {
        if (!(typeof this._api?.getOne === 'function')) {
            return undefined;
        }

        return await this._api.getOne(id);;
    };

    public async create(image: ImageType): Promise<ImageType | undefined> {
        if (!(typeof this._api?.create === 'function')) {
            return undefined;
        }

        return await this._api.create(image);
    };

    public async update(id: number | string, image: ImageType): Promise<ImageType | undefined> {
        if (!(typeof this._api?.update === 'function')) {
            return undefined;
        }

        return await this._api.update(id, image);
    };

    public async delete(id: number | string): Promise<number | string | undefined> {
        if (!(typeof this._api?.delete === 'function')) {
            return undefined;
        }

        return await this._api.delete(id);
    };
}

export { ImagesService }

export default ImagesService;