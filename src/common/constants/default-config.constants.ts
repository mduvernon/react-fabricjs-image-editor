
// Types
import { AppConfigType, ProjectType } from 'common/type';
// Constants
import { IMAGES_GALLERY } from './images-gallery.constants';

export const defaultConfig: AppConfigType = {
    Projects: {
        getMany: (params: any) => Promise.resolve({ items: [], totalCount: 0 }),
        getOne: (id: string) => Promise.resolve({}),
        create: (data: ProjectType) => Promise.resolve({}),
        update: (id: string, data: ProjectType) => Promise.resolve({}),
        delete: (id: string) => Promise.resolve(0),
    },
    Images: {
        app: {
            getMany: (params: any) => Promise.resolve({ items: [], totalCount: 0 }),
            getOne: (id: string) => Promise.resolve({}),
            create: (data: ProjectType) => Promise.resolve({}),
            update: (id: string, data: ProjectType) => Promise.resolve({}),
            delete: (id: string) => Promise.resolve(0),
        }
    },
    tabsIds: [],
    imagesGallery: IMAGES_GALLERY,
    onClose: undefined,
    onSave: undefined,
    onBeforeSave: undefined,
    language: 'en',
};

export default defaultConfig;
