import React from 'react';
import { LayoutMain } from 'layouts';
import { useRedux } from 'hooks';
import UserPasswordChangeForm from './components/PasswordChangeForm';
import UserBillingForm from './components/BillingForm';
import SubscriptionCard from './components/SubscriptionCard';

const ProfileCard = ({ setShowPasswordForm }) => {
  const { getReduxItem } = useRedux();
  const authData = getReduxItem('auth');
  const userData = authData.user;
  return (
    <div className="profile-card box-shadow">
      <div className="prfile-img-wrapper">
        <div className="prfile-img">
          <img src="img/user-img.jpg" alt="" />
        </div>
        <div className="profile-img-actions">
          <span className="action-text color-blue">Change</span>
          <span className="action-text color-red">Delete</span>
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
          Change password
        </button>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const [showPasswordForm, setShowPasswordForm] = React.useState(false);
  return (
    <React.Fragment>
      <div className="title-card">
        <div className="title-cardHead-wrapper">
          <h4 className="title-cardHead">Profile Settings</h4>
        </div>
      </div>
      <div className="profile-cards-wrapper">
        <ProfileCard
          showPasswordForm={showPasswordForm}
          setShowPasswordForm={setShowPasswordForm}
        />
        <SubscriptionCard />
      </div>
      {showPasswordForm && <UserPasswordChangeForm setShowPasswordForm={setShowPasswordForm} />}
      <UserBillingForm />
    </React.Fragment>
  );
};

export default () => (
  <LayoutMain>
    <UserProfile />
  </LayoutMain>
);
