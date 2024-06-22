// Services
import {
    ProjectsService,
    ImagesService,
} from 'common/services';
// Types
import {
    AppConfigType,
    AppStateType
} from 'common/type';

const getInitialAppState = (config: AppConfigType = {}): AppStateType => {
    const configServices: any = {};

    if (Boolean(config.Projects)) {
        configServices.projects = new ProjectsService(config.Projects);
    }

    if (Boolean(config.Images)) {
        configServices.images = {};

        for (const key in config.Images) {
            if (Object.prototype.hasOwnProperty.call(config.Images, key)) {
                configServices.images[key] = new ImagesService(config.Images[key]);
            }
        }
    }

    return {
        // --- Start of services states ---
        services: configServices,
        // --- Start of common states ---
        projectsData: {
            items: [],
            totalCount: 0,
            selectionsIds: [],
        },
        objectsData: {},
        tabId: config.defaultTabId || null,
    };
};

export { getInitialAppState };

export default getInitialAppState;
