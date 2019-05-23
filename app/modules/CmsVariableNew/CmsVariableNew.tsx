import * as React from 'react';
import CmsVariableForm from 'modules/CmsVariableForm';

const CmsVariableNew = () => {
  const fields = { label: '', key: '', inputType: '' };

  return(
    <div>
      <CmsVariableForm fields={fields} onValidSubmit={(validFields:any) => {
        console.log('validFields', validFields);
      }} />
    </div>
  );
};

export default CmsVariableNew;
