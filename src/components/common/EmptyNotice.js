import React, { Fragment } from 'react';

import { COLOR_PRIMARY, COLOR_SECONDARY } from 'config/colors';
import { isMobile } from 'lib/functions';

export default (props) => {
  let { title, subTitle, onRetry } = props;

  return (
    <div className="error-pages-wrapper">
      <div className="error-page-img">
        <img src="/img/no-data.png" alt="" />
      </div>
      <h4 className="error-head">{title || 'Nothing in the list Now!'}</h4>
      {onRetry && (
        <button onClick={onRetry} className="btn small-btn blue-btn">
          Reload Page
        </button>
      )}
    </div>
  );

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <img
          src={`https://image.flaticon.com/icons/svg/2456/2456761.svg`}
          style={{ width: isMobile() ? 50 : 100 }}
        />
      </div>
      <div style={{ margin: 'auto', flexGrow: 1 }}>
        <h5 className="text-warning font-weight-normal-light">
          {title || 'Nothing in the list Now!'}
        </h5>
        <span>{subTitle || 'New items added will come here'}</span>
      </div>
    </div>
  );
};
