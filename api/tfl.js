import axios from "axios";

const tflAPI = axios.create({
	baseURL: "https://api.tfl.gov.uk"
});

tflAPI.interceptors.request.use(config => ({
	...config,
	params: {
		...config.params,
		app_id: "81f99979",
		app_key: "03905d28bc47e8b64e7ef1610a53d985"
	}
}));

export default tflAPI;
