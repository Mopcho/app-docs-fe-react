const host = import.meta.env.VITE_SERVICE_HOST;
import { uploadToS3 } from './s3';
import axios from 'axios';


axios.defaults.withCredentials = true;
const service = () => ({
	get(resource, id) {
		const url = `${host}/${resource}/${id}`;
		return axios.get(url, {
			headers: {
				'content-type': 'application/json',
			},
			withCredentials: true,
		}).then((res) => {
			if (res.status > 299) {
				throw new Error(res.status);
			}
			return res;
		}).catch(err => {
			return err.response;
		});
	},
	find(resource, filters = {}) {
		let length = Object.keys(filters).length;

		let queryString = ``;
		Object.keys(filters).forEach((f, i) => {
			if (i === 0) {
				queryString += '?';
			}
			queryString += `${f}=${filters[f]}`;
			if (i < length - 1) {
				queryString += '&';
			}
		});
		let url = `${host}/${resource}${queryString}`;

		console.log(url);
		return axios.get(url, {
			withCredentials: true
		}).then((res) => {
			if (res.status > 299) {
				throw new Error(res.status);
			}

			return res;
		}).catch((err) => {
			return err.response;
		});
	},
	create(resource, data) {
		const url = `${host}/${resource}`;
		return axios.post(url, data, {
			withCredentials: true,
			headers: {
				'content-type': 'application/json',
			},
		}).then((res) => {
			if (res.status > 299) {
				throw new Error(res.status);
			}
			return res;
		}).catch(err => {
			return err.response;
		});
	},
	update(resource, id, data) {
		let url = '';
		if (id) {
			url = `${host}/${resource}/${id}`;
		} else {
			url = `${host}/${resource}`;
		}
		return axios.put(url, data, {
			headers: {
				'content-type': 'application/json',
			},
			withCredentials: true
		}).then((res) => {
			if (res.status > 299) {
				throw new Error(res.status);
			}
			return 'Success';
		})
		.catch((err) => {
			return err.response;
		});
	},
	delete(resource, id) {
		let url = ``;
		if(!id) {
			url = `${host}/${resource}`;
		} else {
			url = `${host}/${resource}/${id}`;
		}
		return axios.delete(url,{
			headers: {
				'content-type': 'application/json',
			},
			withCredentials: true
		})
		.then((res) => {
			if (res.status > 299) {
				throw new Error(res.status);
			}
			return res;
		}).catch(err => {
			return err.response;
		});
	},
	run(resource, id, data = {}) {
		const url = `${host}/${resource}/${id}`;
		return axios.post(url,JSON.stringify(data), {
			headers: new Headers({
				'content-type': 'application/json',
			}),
			withCredentials: true
		}).then((res) => {
			if (res.status > 299) {
				throw new Error(res.status);
			}
			return res;
		}).catch(err => {
			return err.response;
		});
	},
	getUserInfo() {
		const url = `${host}/auth/me`;
		return axios.get(url, {
			headers: new Headers({
				'content-type': 'application/json',
			}),
			withCredentials: true
		}).then((res) => {
			if (res.status > 299) {
				throw new Error(res.status);
			}
			return res;
		}).catch(err => {
			return err.response;
		});
	},

	uploadFileToS3(file, url, contentType) {
		return uploadToS3({ fileType: contentType, fileContents: file, url });
	},

	removeFromTrash(resource,file) {
		const url = `${host}/${resource}/remove-from-trash/${file.key}`;
		return axios.put(url,{},{
			withCredentials: true
		})
		.then((res) => {
			if (res.status > 299) {
				throw new Error(res.status);
			}
			return res;
		})
		.catch((err) => {
			return err.response;
		});
	},
});

export const helpers = {
	isAdmin(user) {
		return user[process.env.REACT_APP_AUTH0_USER_CLAIMS_NS].some(
			(role) => role === 'Admin'
		);
	},
};

export default service;
