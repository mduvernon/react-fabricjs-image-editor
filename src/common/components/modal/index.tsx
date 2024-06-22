// React
import { FC, PropsWithChildren, ReactElement } from 'react';
// Material-UI
import { Button, Modal as BaseModal } from 'antd';
// Styles
import './style.scss';

type OwnProps = PropsWithChildren & {
    title: ReactElement | string;
    Icon: any;
    onDone: (...args: any[]) => any;
    onCancel: (...args: any[]) => any;
    hint?: string;
    isOpened?: boolean;
    doneLabel?: string;
    cancelLabel?: string;
    doneButtonVariant?: 'text' | 'outlined' | 'contained';
    doneButtonStyle?: any;
    doneButtonColor?: string;
    cancelButtonVariant?: 'text' | 'outlined' | 'contained';
    cancelButtonColor?: string;
    areButtonsDisabled?: boolean;
    zIndex?: number;
    className?: string;
    width?: string;
    isWarning?: boolean;
};

const Modal: FC<OwnProps> = ({
    hint = null,
    isOpened = false,
    doneLabel = 'Yes',
    cancelLabel = 'No',
    doneButtonStyle = undefined,
    doneButtonColor = 'basic',
    doneButtonVariant = 'outlined',
    cancelButtonColor = 'basic',
    cancelButtonVariant = 'text',
    children = undefined,
    areButtonsDisabled = false,
    zIndex = undefined,
    className = undefined,
    width = '',
    isWarning = false,
    title,
    Icon,
    onDone,
    onCancel,
}) => {

    return (
        <BaseModal
            className={`rde-editor__modal-container ${className}`}
            aria-labelledby="modal-header"
            aria-describedby="modal-content"
            aria-controls="modal-footer"
            title={(
                <>
                    <Icon size={25} />
                    <h2 className='title' >
                        {title}
                    </h2>
                </>
            )}
            open={isOpened}
            onCancel={onCancel}
            style={{ zIndex }}
            footer={[
                <Button
                    color={'blue'}
                    onClick={onCancel}
                    size="middle"
                    disabled={areButtonsDisabled}
                >
                    {cancelLabel}
                </Button>,
                <Button
                    color={isWarning ? 'red' : 'blue'}
                    onClick={onDone}
                    size="middle"
                    style={doneButtonStyle}
                    disabled={areButtonsDisabled}
                >
                    {doneLabel}
                </Button>,
            ]}
        >
            <div className='rde-editor__modal-content'>
                {(Boolean(children) || Boolean(hint)) && (
                    <div className='rde-editor__modal-body'
                        id='modal-content'
                    >
                        {Boolean(hint) && (
                            <p className='hint'>
                                {hint}
                            </p>
                        )}

                        {Boolean(children) && (
                            <div className='content'>
                                {children}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </BaseModal>
    );
};

export { Modal };

export default Modal;
