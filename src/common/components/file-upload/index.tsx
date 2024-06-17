// React
import { FC, useRef, useState } from "react";
// Ant Design
import {
    Upload,
    message
} from 'antd';
// Common Hooks
import { useDeepCompareEffect } from "common/hooks";
// Common Components
import { Icon } from "../icon";

type OwnProps = {
    onChange?: (value: any) => void;
    limit?: number;
    accept?: string;
    value?: any;
}

const FileUpload: FC<OwnProps> = ({
    onChange,
    limit = 5,
    accept,
    value
}) => {

    const [fileList, setFileList] = useState([]);

    const handlers = useRef({

        onChange: (info: any) => {
            const isLimit = info?.file?.size / 1024 / 1024 < limit;

            if (!Boolean(isLimit)) {
                message.error(`Limited to ${limit}MB or less`);
                return false;
            }

            if (typeof onChange === 'function') {
                onChange(info.file);
            }
        },
        onRemove: (file: any) => {
            setFileList((fileList) => {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();

                newFileList.splice(index, 1);

                return newFileList;
            });

            if (typeof onChange === 'function') {
                onChange(null);
            }
        },
        beforeUpload: (file: any) => {
            const isLimit = file?.size / 1024 / 1024 < limit;

            if (!isLimit) {
                return false;
            }

            setFileList([file]);

            return false;
        },
    });

    useDeepCompareEffect(() => {
        setFileList(value ? [value] : []);
    }, [value]);

    return (
        <Upload.Dragger accept={accept} name={'file'} multiple={false} fileList={fileList} {...handlers.current} >
            <p className="ant-upload-drag-icon">
                <Icon name="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">{`Support for a single upload. Limited to ${limit}MB or less`}</p>
        </Upload.Dragger>
    )
}

export { FileUpload };

export default FileUpload;
