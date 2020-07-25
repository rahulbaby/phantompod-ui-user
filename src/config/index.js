const onProduction = process.env.NODE_ENV === 'production';

export const BASE_URL = onProduction ? 'http://3.15.135.37:4000/' : 'http://localhost:4000/';
export const AUTH_TOKEN_KEY = 'usertoken';
export const REACT_APP_STRIPE_PUBLISHABLE_KEY = 'pk_test_F1U8ZiSPK9gAcjttJZTUiwrZ';
