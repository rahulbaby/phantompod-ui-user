import React, { Fragment } from 'react';

import { COLOR_PRIMARY, COLOR_SECONDARY } from 'config/colors';
import { isMobile } from 'lib/functions';

export default (props) => {
  let { title, subTitle } = props;

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <img
          src={`https://image.flaticon.com/icons/svg/3043/3043663.svg`}
          style={{ width: isMobile() ? 50 : 100 }}
        />
      </div>
      <div style={{ margin: 'auto', flexGrow: 1 }}>
        <h5 className="text-warning font-weight-normal-light">
          {title || 'Something went wrong!'}
        </h5>
        {subTitle && <span>{subTitle}</span>}
      </div>
    </div>
  );
};
