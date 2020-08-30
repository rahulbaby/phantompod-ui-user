import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Slider, { Range } from 'rc-slider';
import Cropper from 'react-easy-crop';

import 'rc-slider/assets/index.css';
import ImageUploader from 'react-images-upload';
import { AUTH_TOKEN_KEY, BASE_URL } from 'config';
import { instance } from 'utils';
import { showMessage } from 'store/messages/actions';
import { refreshUser } from 'modules/auth/actions';
import { LoaderCircular } from 'components/loaders';

const UserAvatar = (props) => {
  const [file, setFile] = useState(null);
  const [imgPathname, setImgPathname] = useState(null);
  const [loading, setLoading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const dispatch = useDispatch();

  const onDrop = async (file) => {
    setFile(file);
    let image = await readFile(file[0]);
    setImgPathname(image);
    return;

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
        dispatch(showMessage(res.message));
        if (!res.error) {
          dispatch(refreshUser());
          props.onSuccess && props.onSuccess();
        }
      });
  };

  return (
    <div
      style={{
        minWidth: 300,
        minHeight: 300,
        textAlign: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: '#fff',
      }}
    >
      {loading && <LoaderCircular />}
      {imgPathname && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 280, height: 280 }}>
            <Cropper
              image={imgPathname}
              crop={crop}
              zoom={zoom}
              aspect={4 / 4}
              onCropChange={(crop) => setCrop(crop)}
              onCropComplete={async (croppedArea, croppedAreaPixels) => {
                const croppedImg = await getCroppedImg(imgPathname, croppedArea, imgPathname);
              }}
              onZoomChange={(zoom) => setZoom(zoom)}
              cropShape="round"
            />
          </div>
          <div style={{ width: 400, alignItems: 'flex-end' }}>
            <Slider
              min={0}
              max={2}
              step={0.1}
              onChange={(zoom) => setZoom(zoom)}
              defaultValue={1}
            />
          </div>
        </div>
      )}
      {!imgPathname && (
        <ImageUploader
          {...props}
          onChange={onDrop}
          imgExtension={['.jpg', '.png', '.jpeg']}
          maxFileSize={1048576}
          label={'Max file size: 1mb, accepted: jpg , png  '}
          singleImage
          withIcon
          buttonStyles={{ backgroundColor: '#8dc63f' }}
          fileContainerStyle={{ boxShadow: 'none' }}
        />
      )}
    </div>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

function getCroppedImg(image, crop, fileName) {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        blob.name = fileName;
        resolve(blob);
      },
      'image/jpeg',
      1,
    );
  });
}

export default UserAvatar;
