const host = import.meta.env.VITE_SERVICE_HOST;
import axios from 'axios';
import { uploadToS3 } from './s3';

const service = (_token) => ({
	get(resource, id) {
		// BRACKETS ERROR
		const url = `${host}/${resource}/${id}`;
		return fetch(url, {
			method: 'GET',
			headers: new Headers({
				'content-type': 'application/json',
				Authorization: `Bearer ${_token}`,
			})
		}).then((res) => {
				if (res.status > 299) {
					throw new Error(res.status);
				}
				return res.json();
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
		return fetch(url, {
			method: 'GET',
			headers: new Headers({
				'content-type': 'application/json',
				Authorization: `Bearer ${_token}`,
			}),
		}).then((res) => {
			if (res.status > 299) {
				throw new Error(res.status);
			}
			return res.json();
		});
		// .catch(console.log)
	},
	create(resource, data) {
		console.log('in service, create');
		return fetch(`${host}/${resource}`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: new Headers({
				'content-type': 'application/json',
				Authorization: `Bearer ${_token}`,
			}),
		}).then(async (res) => {
			if (res.status > 299) {
				throw new Error(res.status);
			}
			return await res.json();
		});
	},
	update(resource, id, data) {
		let url = '';
		if (id) {
			url = `${host}/${resource}/${id}`;
		} else {
			url = `${host}/${resource}`;
		}
		return fetch(url, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: new Headers({
				'content-type': 'application/json',
				Authorization: `Bearer ${_token}`,
			}),
		})
			.then((res) => {
				if (res.status > 299) {
					throw new Error(res.status);
				}
				return 'Success';
			})
			.catch((err) => console.log(err));
	},
	delete(resource, id) {
		console.log('in delete');
		return fetch(`${host}/${resource}/${id}`, {
			method: 'DELETE',
			headers: new Headers({
				'content-type': 'application/json',
				Authorization: `Bearer ${_token}`,
			}),
		})
			.then((res) => 'Success')
			.catch(console.log);
	},
	run(resource, id, data = {}) {
		return fetch(`${host}/${resource}/${id}`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: new Headers({
				'content-type': 'application/json',
				Authorization: `Bearer ${_token}`,
			}),
		}).then((res) => res.json());
	},
	getUserInfo() {
		return fetch(`${host}/users/me`, {
			method: 'GET',
			headers: new Headers({
				'content-type': 'application/json',
				Authorization: `Bearer ${_token}`,
			}),
		}).then((res) => res.json());
	},

	uploadFileToS3(file, url, contentType) {
		return uploadToS3({ fileType: contentType, fileContents: file, url });
	},

	removeFromTrash(resource,file) {
		return fetch(`${host}/${resource}/remove-from-trash/${file.key}`, {
			method: 'PUT',
			headers: new Headers({
				Authorization: `Bearer ${_token}`,
			}),
		}).then((res)=> res.json());
	}
});

export const helpers = {
	isAdmin(user) {
		return user[process.env.REACT_APP_AUTH0_USER_CLAIMS_NS].some(
			(role) => role === 'Admin'
		);
	},
};

export default service;
