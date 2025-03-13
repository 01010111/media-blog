//#region populate entries
function make_linked_element(el, url) {
	const link = document.createElement('a');
	link.href = url;
	link.appendChild(el.cloneNode(true));
	return link;
}

var entry_count = document.querySelectorAll('entry:not(.draft)').length;
document.querySelectorAll('entry:not(.draft)').forEach(el => {
	// get data
	let title = el.getAttribute('title');
	let year = el.getAttribute('year');
	let rating = el.getAttribute('rating');
	let watch_date = el.getAttribute('watch-date');
	let imdb_id = el.getAttribute('imdb-id');
	let review = el.innerHTML;

	// clear data
	el.innerHTML = '';

	// make elements
	let el_info = document.createElement('info');
	let el_seq = document.createElement('seq');
	let el_title = document.createElement('title');
	let el_rating = document.createElement('rating');
	let el_date = document.createElement('date');
	let el_connection = document.createElement('connection');
	let el_comment = document.createElement('comment');

	// set element data
	el_seq.innerHTML = `${entry_count--}`;
	el_seq.classList.add(el.classList[0]);

	el_title.innerHTML = year ? `${title} (${year})` : `${title}`;
	el_title.classList.add(el.classList[0]);

	el_rating.classList.add(`s${rating.replace('.', '_')}`, el.classList[0]);

	el_date.innerHTML = watch_date;
	el_date.classList.add(el.classList[0]);

	if (imdb_id) {
		el_connection.classList.add('imdb', el.classList[0]);
		el_connection = make_linked_element(el_connection, `https://www.imdb.com/title/${imdb_id}/`);
	}

	if (review && review.length > 1) {
		el_comment.classList.add(el.classList[0]);
		el_comment.innerHTML = review;
	}

	// add elements
	el_info.append(el_seq, el_title, el_rating, el_date, el_connection);
	el.append(el_info);
	if (el_comment.innerHTML.length > 0) el.append(el_comment);
});
//#endregion