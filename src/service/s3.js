import axios from 'axios';

export async function uploadToS3({ fileType, fileContents, url }) {
	const presignedPostUrl = url;

	const formData = new FormData();
	formData.append('Content-Type', fileType);
	// Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
	//     formData.append(k, v);
	// });
	formData.append('file', fileContents); // The file has be the last element

	const response = await axios.put(presignedPostUrl, fileContents, {
		headers: { 'Content-Type': fileType },
	});

	console.log('response', response);
	return response;
}
