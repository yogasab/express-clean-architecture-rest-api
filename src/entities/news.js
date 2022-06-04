function news({ title, body, author, tags, status = "draft" }) {
	return {
		getTitle: () => title,
		getBody: () => body,
		getAuthor: () => author,
		getTags: () => tags,
		getStatus: () => status,
	};
}

module.exports = { news };
