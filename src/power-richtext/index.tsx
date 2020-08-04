import React from 'react';

import _ from 'lodash';
// @ts-ignore
import CKEditor from '@ckeditor/ckeditor5-react';
// @ts-ignore
import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import "./index.less";


export interface PowerRichTextProps {
  // 受控属性
  value?: any;
  onChange?: (value: any) => void;
}

function PowerRichText(props: PowerRichTextProps) {
  const {value, onChange} = props;
  // @ts-ignore
  const editorChange = (event, editor) => {
    if (editor && _.isFunction(editor.getData)) {
      const data = editor.getData();
      if (_.isFunction(onChange)) {
        onChange(data);
      }
    }
  }
  return (
    <div className="power-rich-text">
      <CKEditor
        // @ts-ignore
        onInit={ editor => {
          console.log( 'Editor is ready to use!', editor );

          // Insert the toolbar before the editable area.
          editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
          );
        } }
        editor={ DocumentEditor }
        data={ value }
        onChange={editorChange}
      />
    </div>
  );
}

export default PowerRichText;
