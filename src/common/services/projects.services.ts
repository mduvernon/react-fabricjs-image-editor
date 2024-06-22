// Types
import {
    ProjectType,
    ApiService,
    QueryType,
} from "common/type";

class ProjectsService implements ApiService<ProjectType> {

    private _api: ApiService<ProjectType>;

    constructor(api: ApiService<ProjectType>) {
        this._api = api;
    }

    public async getMany(query: QueryType): Promise<{ items: ProjectType[], totalCount: number }> {
        if (!(typeof this._api?.getMany === 'function')) {
            return { items: [], totalCount: 0 };
        }

        return await this._api.getMany(query);
    };

    public async getOne(id: number | string): Promise<ProjectType | undefined> {
        if (!(typeof this._api?.getOne === 'function')) {
            return undefined;
        }

        return await this._api.getOne(id);;
    };

    public async create(project: ProjectType): Promise<ProjectType | undefined> {
        if (!(typeof this._api?.create === 'function')) {
            return undefined;
        }

        return await this._api.create(project);
    };

    public async update(id: number | string, project: ProjectType): Promise<ProjectType | undefined> {
        if (!(typeof this._api?.update === 'function')) {
            return undefined;
        }

        return await this._api.update(id, project);
    };

    public async delete(id: number | string): Promise<number | string | undefined> {
        if (!(typeof this._api?.delete === 'function')) {
            return undefined;
        }

        return await this._api.delete(id);
    };
}

export { ProjectsService }

export default ProjectsService;