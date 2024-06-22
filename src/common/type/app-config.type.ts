import {
    ObjectDataType,
    ProjectType,
    ApiService,
    ImageType,
} from "./miscellaneous.type"

export type AppConfigType = {
    Projects?: ApiService<ProjectType>,
    Images?: {
        app?: ApiService<ImageType>,         // To load images gallery from the app server
        pexels?: ApiService<ImageType>,
        pixabay?: ApiService<ImageType>,
        unsplash?: ApiService<ImageType>,
    }
    imagesGallery?: any[]
    objectsData?: { [key: string]: ObjectDataType }
    tabsIds?: any[]
    defaultProjectId?: number | string
    defaultTabId?: number | string
    onClose?: () => void,
    onSave?: (project: ProjectType) => void,
    onBeforeSave?: Function,
    language?: string
    onChange?: (project: ProjectType) => void,
}