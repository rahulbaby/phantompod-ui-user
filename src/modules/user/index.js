import React from 'react';
import { LayoutMain } from 'layouts';
import { useRedux, useRouter } from 'hooks';
import UserPasswordChangeForm from './components/PasswordChangeForm';
import UserBillingForm from './components/BillingForm';
import SubscriptionCard from './components/SubscriptionCard';
import ResetButton from './components/ResetButton';
import UserAvatar from './components/Avatar';
import { Modal } from 'components/common';
import { imgSrc } from 'utils/functions';
import { useDispatch } from 'react-redux';
import { instance } from 'utils';
import { showMessage } from 'store/messages/actions';
import { refreshUser } from 'modules/auth/actions';
import { LoaderCircular } from 'components/loaders';

const AvatarDeleteButton = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const handleClick = () => {
    setLoading(true);
    instance({
      url: `user/remove-profile-image`,
      method: 'get',
    }).then((res) => {
      setLoading(false);
      dispatch(showMessage(res.message));
      dispatch(refreshUser());
    });
  };

  if (loading) return <span className="action-text">processing...</span>;

  return (
    <span className="action-text color-red" style={{ cursor: 'pointer' }} onClick={handleClick}>
      Delete
    </span>
  );
};

const ProfileCard = ({ setShowPasswordForm, userData }) => {
  const modalRef = React.useRef();

  return (
    <div className="profile-card box-shadow">
      <div className="prfile-img-wrapper">
        <div className="prfile-img">
          <img src={imgSrc(userData.image, 'user')} alt="" />
        </div>

        <div className="profile-img-actions">
          <Modal ref={modalRef}>
            <span className="action-text color-blue" style={{ cursor: 'pointer' }}>
              {userData.image ? 'Change' : 'Add profile picture'}
            </span>
            <UserAvatar onSuccess={() => modalRef.current.toggleModal()} />
          </Modal>
          {userData.image && <AvatarDeleteButton />}
        </div>
      </div>
      <div className="profile-details">
        <h3 className="profle-name">{userData.name}</h3>
        <div>
          <a href="javascript:(0)" className="profile-email">
            {userData.email}
          </a>
        </div>
        <button className="btn small-btn blue-btn" onClick={() => setShowPasswordForm(true)}>
          Change Password
        </button>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const [showPasswordForm, setShowPasswordForm] = React.useState(false);
  const [showBillingForm, setShowBillingForm] = React.useState(false);
  const { getReduxItem } = useRedux();
  const authData = getReduxItem('auth');
  const userData = authData.user;
  const { history } = useRouter();

  React.useEffect(() => {
    if (userData.status === null) history.push('plan-selction');
  }, []);

  return (
    <React.Fragment>
      <div className="title-card">
        <div className="title-cardHead-wrapper">
          <h4 className="title-cardHead">Billing Information</h4>
        </div>
      </div>
      <div className="profile-cards-wrapper">
        <ProfileCard
          showPasswordForm={showPasswordForm}
          setShowPasswordForm={setShowPasswordForm}
          userData={userData}
        />
        <SubscriptionCard setShowBillingForm={setShowBillingForm} />
      </div>
      {showPasswordForm && (
        <UserPasswordChangeForm
          setShowPasswordForm={setShowPasswordForm}
          onSuccess={() => setShowPasswordForm(false)}
        />
      )}
      {(userData.isBillingAdded || showBillingForm || 1) && <UserBillingForm />}
    </React.Fragment>
  );
};

export default () => (
  <LayoutMain>
    <UserProfile />
  </LayoutMain>
);
