import axios from "axios";

const transportAPI = axios.create({
	baseURL: "https://transportapi.com/v3"
});

transportAPI.interceptors.request.use(config => ({
	...config,
	params: {
		...config.params,
		app_id: "b56c65f8",
		app_key: "15025a32903d02ce3c22b589b48b1e66"
	}
}));

export default transportAPI;
