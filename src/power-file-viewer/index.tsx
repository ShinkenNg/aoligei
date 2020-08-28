import React from 'react';

// @ts-ignore
import FileViewer from 'react-file-viewer';

export interface PowerFileViewerProps {
    fileType: string;
    filePath: string;
    errorComponent: React.ReactNode;
    onError?: (e: any) => void;
}

export function PowerFileViewer (props: PowerFileViewerProps) {
    const defaultOnError = (e: any) => {
        console.error(e);
    }
    return (
        <FileViewer
            fileType={props.fileType}
            filePath={props.filePath}
            errorComponent={props.errorComponent}
            onError={props.onError || defaultOnError}
        />
    );
}
