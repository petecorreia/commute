import axios from 'axios';

const transportAPI = axios.create({
	baseURL: 'https://transportapi.com/v3',
});

transportAPI.interceptors.request.use(config => ({
	...config,
	params: {
		...config.params,
		app_id: 'e9faa536',
		app_key: 'ef6c68ad89052e7917fa9900e22baf43',
	},
}));

export default transportAPI;
