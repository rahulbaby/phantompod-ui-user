import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ImageUploader from 'react-images-upload';
import { useDispatch } from 'react-redux';

import { Button } from 'components/common';
import { AUTH_TOKEN_KEY, BASE_URL } from 'config';
import { instance } from 'utils';
import { showMessage } from 'store/messages/actions';
import { refreshUser } from 'modules/auth/actions';
import { LoaderCircular } from 'components/loaders';

// Setting a high pixel ratio avoids blurriness in the canvas crop preview.
const pixelRatio = 4;

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
function getResizedCanvas(canvas, newWidth, newHeight) {
  const tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = newWidth;
  tmpCanvas.height = newHeight;

  const ctx = tmpCanvas.getContext('2d');
  ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight);

  return tmpCanvas;
}

const generateDownload = async (previewCanvas, crop) => {
  if (!crop || !previewCanvas) {
    return;
  }

  const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        blob.name = 'test';
        blob.lastModifiedDate = new Date();
        resolve(blob);
      },
      'image/jpeg',
      1,
    );
  });
};

export default function App(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: '%',
    aspect: 4 / 4,
    width: 50,
    x: 25,
    y: 10,
  });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (files) => {
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingEnabled = false;

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
  }, [completedCrop]);

  const uploadImg = (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file, file.filename);
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

  const imgAdded = completedCrop?.width;

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 10,
        minWidth: 300,
      }}
    >
      {loading && <LoaderCircular />}
      {!upImg && (
        <ImageUploader
          onChange={onSelectFile}
          imgExtension={['.jpg', '.png', '.jpeg']}
          maxFileSize={1048576}
          label={'Max file size: 1mb, accepted: jpg , png  '}
          singleImage
          withIcon
          buttonStyles={{ backgroundColor: '#8dc63f' }}
          fileContainerStyle={{ boxShadow: 'none', width: '100%' }}
        />
      )}
      {upImg && !loading && (
        <React.Fragment>
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            {...{ minWidth: 100, minHeight: 100, circularCrop: 1 }}
          />
          <div style={{ display: 'none' }}>
            <canvas
              ref={previewCanvasRef}
              style={{
                width: completedCrop?.width ?? 0,
                height: completedCrop?.height ?? 0,
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-around' }}>
            <Button
              className="btn small-btn "
              label={`Retake`}
              type="button"
              onClick={() => setUpImg(null)}
            />
            <Button
              className="btn small-btn subscription-btn"
              label={`Submit`}
              type="button"
              disabled={!completedCrop?.width || !completedCrop?.height}
              onClick={async () => {
                const file = await generateDownload(previewCanvasRef.current, completedCrop);
                uploadImg(file);
              }}
              style={{ backgroundColor: !completedCrop?.width ? '#ccc' : '#8dc63f' }}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
