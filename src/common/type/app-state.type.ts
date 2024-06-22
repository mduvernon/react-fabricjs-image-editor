// Types
import { AppConfigType } from "./app-config.type"
import {
    ProjectsDataType,
    ObjectDataType,
    Services,
} from "./miscellaneous.type"

export type AppStateType = {
    dispatch?: (...args: any[]) => void
    t?: (key?: string) => string
    services?: Services
    config?: AppConfigType
    projectsData?: ProjectsDataType
    objectsData?: { [key: string]: ObjectDataType }
    selectionsIds?: string[]
    tabId?: number | string | null // The current selected tab id
}