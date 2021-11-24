function makeFriendsList(friends) {
	let ul = document.createElement('ul');

	let user = friends.map(function(user) {
		let name = '';
		for (let key in user) {
			name += user[key] + ' ';
		}
		return name.slice(0, -1);
	});
	for (let i = 0; i < user.length; i++) {
		let li = '<li>' + user[i] + '</li>';
		ul.insertAdjacentHTML('afterBegin',	li);
	}
	return ul;
}
