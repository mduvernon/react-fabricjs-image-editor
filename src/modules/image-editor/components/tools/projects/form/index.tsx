// React
import { FC, useState } from "react";
// Common Hooks
import { useDeepCompareEffect } from "common/hooks";
// Components
import { Label, Textarea } from "common/components";
// Types
import { ProjectType } from "common/type";
// Styles
import "./style.scss";

const initialState: ProjectType = {
    name: "",
    description: "",
    image: { src: "" },
    pages: [],
}

type OwnProps = {
    project?: ProjectType;
    onChange?: (project: ProjectType) => void;
};

const ProjectForm: FC<OwnProps> = ({
    project: projectInput,
    onChange,
}) => {

    const [project, setProject] = useState<ProjectType>(initialState);

    useDeepCompareEffect(() => {
        if (projectInput?.id) {
            setProject(projectInput);
        } else {
            setProject(initialState);
        }
    }, [projectInput]);

    useDeepCompareEffect(() => {
        if (typeof onChange === "function") {
            onChange(project);
        }
    }, [project]);

    const _handleNameChange = (e: any) => {
        const { value } = e.target;

        setProject({
            ...project,
            name: value
        });
    }

    const _handleDescriptionChange = (e: any) => {
        const { value } = e.target;

        setProject({
            ...project,
            description: value
        });
    }

    if (!Boolean(project)) {
        return null;
    }

    return (
        <div className="rde-editor__tools-projects-form">
            <div className="form-field">
                <Label>
                    Name
                </Label>
                <Textarea
                    className="rde-editor__tools-projects-form-textarea"
                    value={project.name}
                    onChange={_handleNameChange}
                />
            </div>
            <div className="form-field">
                <Label>
                    Description
                </Label>
                <Textarea
                    className="rde-editor__tools-projects-form-textarea"
                    value={project.description}
                    onChange={_handleDescriptionChange}
                    minRows={5}
                />
            </div>
        </div>
    );
};

export { ProjectForm }

export default ProjectForm;
