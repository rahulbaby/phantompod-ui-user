import React from 'react';
import { LayoutMain } from 'layouts';
import Faq from './Faq';
import SupportForm from './Form';

const Support = () => (
	<React.Fragment>
		<Faq />
		<SupportForm />
	</React.Fragment>
);

export default () => (
	<LayoutMain>
		<Support />
	</LayoutMain>
);
