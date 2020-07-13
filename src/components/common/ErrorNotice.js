import React, { Fragment } from 'react';

import { COLOR_PRIMARY, COLOR_SECONDARY } from 'config/colors';
import { isMobile } from 'lib/functions';

export default (props) => {
  let { title, subTitle, onRetry } = props;

  return (
    <div className="error-pages-wrapper">
      <div className="error-page-img">
        <img src="/img/no-connection.png" alt="" />
      </div>
      <h4 className="error-head">{title || 'Something went wrong!'}</h4>
      {subTitle && <p className="card-text">{subTitle}</p>}
      {onRetry && (
        <button onClick={onRetry} className="btn small-btn blue-btn">
          Reload Page
        </button>
      )}
    </div>
  );

  return (
    <div className="card">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img
            src={`https://image.flaticon.com/icons/svg/3043/3043663.svg`}
            style={{ width: isMobile() ? 50 : 100 }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body" style={{ textAlign: 'left' }}>
            <h5 className="card-title text-danger">{title || 'Something went wrong!'}</h5>
            {subTitle && <p className="card-text">{subTitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
