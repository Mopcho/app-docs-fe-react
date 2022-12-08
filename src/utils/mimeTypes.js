/**
 * Returns the mime type of a file path if it exists in the database
 * @param {string[]} filePath
 * @param {{extName:string, type:string}[]} db
 * If db is not specified, it will look for matches in its own databse
 */
export const checkMimeType = (filePath, db = mimeDatabase) => {
	const extension = filePath.split('.').pop();

	let foundElement;
	db.forEach((element) => {
		if (element.extName === extension) {
			foundElement = element;
		}
	});

	if (!foundElement) {
		return {
			extName: extension,
			type: 'unknown/unknown',
		};
	} else {
		return foundElement;
	}
};

const mimeDatabase = [
	{
		extName: 'txt',
		type: 'text/plain',
	},
	{
		extName: 'avif',
		type: 'image/avif',
	},
	{
		extName: 'avi',
		type: 'video/x-msvideo',
	},
	{
		extName: 'azw',
		type: 'application/vnd.amazon.ebook',
	},
	{
		extName: 'bin',
		type: 'application/octet-stream',
	},
	{
		extName: 'bmp',
		type: 'image/bmp',
	},
	{
		extName: 'bz',
		type: 'application/x-bzip',
	},
	{
		extName: 'bz2',
		type: 'application/x-bzip2',
	},
	{
		extName: 'cda',
		type: 'application/x-cdf',
	},
	{
		extName: 'csh',
		type: 'application/x-csh',
	},
	{
		extName: 'css',
		type: 'text/css',
	},
	{
		extName: 'csv',
		type: 'text/csv',
	},
	{
		extName: 'doc',
		type: 'application/msword',
	},
	{
		extName: 'docx',
		type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	},
	{
		extName: 'eot',
		type: 'application/vnd.ms-fontobject',
	},
	{
		extName: 'epub',
		type: 'application/epub+zip',
	},
	{
		extName: 'gz',
		type: 'application/gzip',
	},
	{
		extName: 'htm',
		type: 'text/html',
	},
	{
		extName: 'html',
		type: 'text/html',
	},
	{
		extName: 'ico',
		type: 'image/vnd.microsoft.icon',
	},
	{
		extName: 'ics',
		type: 'text/calendar',
	},
	{
		extName: 'jar',
		type: 'application/java-archive',
	},
	{
		extName: 'jpeg',
		type: 'image/jpeg',
	},
	{
		extName: 'jpg',
		type: 'image/jpeg',
	},
	{
		extName: 'js',
		type: 'text/javascript',
	},
	{
		extName: 'json',
		type: 'application/json',
	},
	{
		extName: 'mid',
		type: 'audio/midi',
	},
	{
		extName: 'midi',
		type: 'audio/x-midi',
	},
	{
		extName: 'mjs',
		type: 'text/javascript',
	},
	{
		extName: 'mp3',
		type: 'audio/mpeg',
	},
	{
		extName: 'mp4',
		type: 'video/mp4',
	},
	{
		extName: 'mpeg',
		type: 'video/mpeg',
	},
	{
		extName: 'mpkg',
		type: 'application/vnd.apple.installer+xml',
	},
	{
		extName: 'odp',
		type: 'application/vnd.oasis.opendocument.presentation',
	},
	{
		extName: 'ods',
		type: 'application/vnd.oasis.opendocument.spreadsheet',
	},
	{
		extName: 'odt',
		type: 'application/vnd.oasis.opendocument.text',
	},
	{
		extName: 'oga',
		type: 'audio/ogg',
	},
	{
		extName: 'ogv',
		type: 'video/ogg',
	},
	{
		extName: 'ogx',
		type: 'application/ogg',
	},
	{
		extName: 'opus',
		type: 'audio/opus',
	},
	{
		extName: 'otf',
		type: 'font/otf',
	},
	{
		extName: 'png',
		type: 'image/png',
	},
	{
		extName: 'pdf',
		type: 'application/pdf',
	},
	{
		extName: 'php',
		type: 'application/x-httpd-php',
	},
	{
		extName: 'ppt',
		type: 'application/vnd.ms-powerpoint',
	},
	{
		extName: 'pptx',
		type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	},
	{
		extName: 'rar',
		type: 'application/vnd.rar',
	},
	{
		extName: 'rtf',
		type: 'application/rtf',
	},
	{
		extName: 'sh',
		type: 'application/x-sh',
	},
	{
		extName: 'svg',
		type: 'image/svg+xml',
	},
	{
		extName: 'tar',
		type: 'application/x-tar',
	},
	{
		extName: 'tif ',
		type: 'image/tiff',
	},
	{
		extName: 'tiff',
		type: 'image/tiff',
	},
	{
		extName: 'ts',
		type: 'video/mp2t',
	},
	{
		extName: 'ttf',
		type: 'font/ttf',
	},
	{
		extName: 'rtf',
		type: 'application/rtf',
	},
	{
		extName: 'txt',
		type: 'text/plain',
	},
	{
		extName: 'vsd',
		type: 'application/vnd.visio',
	},
	{
		extName: 'wav',
		type: 'audio/wav',
	},
	{
		extName: 'weba',
		type: 'audio/webm',
	},
	{
		extName: 'webm',
		type: 'video/webm',
	},
	{
		extName: 'webp',
		type: '	image/webp',
	},
	{
		extName: 'woff',
		type: 'font/woff',
	},
	{
		extName: 'woff2',
		type: 'font/woff2',
	},
	{
		extName: 'xhtml',
		type: 'application/xhtml+xml',
	},
	{
		extName: 'xls',
		type: 'application/vnd.ms-excel',
	},
	{
		extName: 'xlsx',
		type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	},
	{
		extName: 'xml',
		type: 'application/xml',
	},
	{
		extName: 'xul',
		type: 'application/vnd.mozilla.xul+xml',
	},
	{
		extName: 'zip',
		type: 'application/zip',
	},
	{
		extName: '3gp',
		type: 'video/3gpp',
	},
	{
		extName: '3g2',
		type: 'video/3gpp2',
	},
	{
		extName: '7z',
		type: 'application/x-7z-compressed',
	},
];
