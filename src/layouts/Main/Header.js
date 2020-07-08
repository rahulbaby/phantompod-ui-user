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

export default () => {
	const [toggle, setToggle] = React.useState(false);
	const { triggerApiCall, result, loading, error } = useApiHttpCall();
	const [showMessage] = useShowMsg();
	const { dispatch } = useRedux();
	const onSubmit = (data) => {
		triggerApiCall(
			'pod/alter-members',
			data,
			(res) => {
				const { error, message, record } = res;
				showMessage(message, error ? 'danger' : 'success');
				if (!error && record) dispatch(addRow(record));
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
						<LinkCustom to="/pod/settings">
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
						<img className="header-user-img" src="/img/user-img.jpg" alt="" />
					</div>
				</div>
				<div className="header-toggle">
					<span className="toggle-btn" onClick={() => setToggle(!toggle)}></span>
				</div>
			</div>
		</header>
	);
};
