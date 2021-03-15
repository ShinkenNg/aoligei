import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import _ from 'lodash';

export function PowerRichText(props: any) {
  const {value, apiKey, initConfig, onChange} = props;

  const defaultInit = {
    height: 500,
    menubar: false,
  };

  return (
    <div>
      <Editor
        apiKey={apiKey}
        value={value}
        init={{
          ...defaultInit,
          ...initConfig,
        }}
        onEditorChange={(v) => {
          if (_.isFunction(onChange)) {
            onChange(v);
          }
        }}
      />
    </div>
  );
}

