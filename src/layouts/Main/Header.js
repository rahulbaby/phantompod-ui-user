import React from 'react';
import { useDispatch } from 'react-redux';

import { LinkCustom } from 'components/common';
import {
	useForm,
	Form,
	FormInput,
	FormTextArea,
	FormSelect,
	FormButton,
	FormResult,
	FormCheckbox,
} from 'components/form';
import { useApiHttpCall, useShowMsg, useRedux } from 'hooks';
import { addRow } from 'modules/pod/actions';
import { isMobile } from 'utils/functions';
import { imgSrc } from 'utils/functions';

export default () => {
	const [toggle, setToggle] = React.useState(false);
	const { triggerApiCall, result, loading, error } = useApiHttpCall();
	const [showMessage] = useShowMsg();
	const { dispatch } = useRedux();
	const { getReduxItem } = useRedux();
	const authData = getReduxItem('auth');
	const userData = authData.user;

	const onSubmit = (data) => {
		triggerApiCall(
			'pod/request-member-access',
			data,
			(res) => {
				const { error, message, record } = res;
				showMessage(message, error ? 'danger' : 'success');
				//if (!error && record) dispatch(addRow(record));
			},
			'put',
			({ message }) => showMessage(message, 'danger'),
		);
	};
	return (
		<header>
			<div className="head-wrapper">
				<div className="pagename-wrapper">
					<div className="pagename">Dashboard</div>
				</div>
				<div className="pod-user-details">
					<div className="header-pod-details" style={toggle ? { right: 0 } : {}}>
						<LinkCustom to="/pod/create-new">
							<button className="btn green-btn mr-3">New Pod</button>
						</LinkCustom>

						<Form
							onSubmit={onSubmit}
							noValidate
							className="d-inline-flex"
							style={isMobile() ? { flexDirection: 'column' } : {}}
						>
							<FormInput name="id" className="mr-3" placeholder="Pod Secret" />
							<FormButton
								type="submit"
								label="Join Pod"
								className="btn blue-btn"
								loading={loading}
							/>
						</Form>
					</div>
					<div className="header-user-details">
						<img className="header-user-img" src={imgSrc(userData.image, 'user')} alt="" />
						<div className="header-login-details-wrapper">
							<div className="header-login-details">
								<div className="profile-pic">
									<img className="header-user-img" src={imgSrc(userData.image, 'user')} alt="" />
								</div>
								<h5 className="profile-name">{userData.name}</h5>
								<p className="logout">
									<LinkCustom to="/logout">logout</LinkCustom>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="header-toggle">
					<span className="toggle-btn" onClick={() => setToggle(!toggle)}></span>
				</div>
			</div>
		</header>
	);
};
