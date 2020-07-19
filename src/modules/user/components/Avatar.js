import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import ImageUploader from 'react-images-upload';
import { AUTH_TOKEN_KEY, BASE_URL } from 'config';
import { instance } from 'utils';
import { showMessage } from 'store/messages/actions';
import { refreshUser } from 'modules/auth/actions';
import { LoaderCircular } from 'components/loaders';

const UserAvatar = (props) => {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onDrop = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file[0], file[0].filename);
    instance
      .post(`user/update-profile-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setLoading(false);
        dispatch(showMessage(res.messages));
        if (!res.error) {
          dispatch(refreshUser());
          props.onSuccess && props.onSuccess();
        }
      });
  };

  return (
    <React.Fragment>
      {loading && <LoaderCircular />}
      <ImageUploader
        {...props}
        onChange={onDrop}
        imgExtension={['.jpg', '.png', '.jpeg']}
        maxFileSize={1048576}
        label={'Max file size: 1mb, accepted: jpg , png  '}
        singleImage
        withIcon
      />
    </React.Fragment>
  );
};

export default UserAvatar;
