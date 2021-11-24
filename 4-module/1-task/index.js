function makeFriendsList(friends) {
	let ul = document.createElement('ul');
	let li = friends.map(user => '<li>' + user.firstName + ' ' + user.lastName + '</li>').join('');
	ul.insertAdjacentHTML('afterBegin',	li);
	return ul;
}
