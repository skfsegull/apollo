var _ = require('underscore');
var json = require('./songs.json').songs;

/* Returns a random song from the song collection */
var random = function random(songs) {
	return songs.length > 0 && _.shuffle(songs)[0];
};

/* Returns a random song of a specific type from the song collection */
var randomByType = function random(songs, type, lower, upper) {
	var filtered = _.filter(songs, function(song) {
		return song.type === type && song.tempo >= lower && song.tempo <= upper;
	});
	return songs.length > 0 &&
		_.shuffle(filtered)[0];
};

/* Returns a random song list of a specified length with the
	specified percentage of action songs */
var randomList = function random(songs, length, percentage, lower, upper) {
	var totalLength = 0;
	var actionLength = 0;
	var array = [];

	while (totalLength < length) {
		var song = randomByType(
			songs,
			percentage > 0 && actionLength / percentage < length ? 'action' : 'song',
			lower,
			upper
		);

		totalLength += song.length;
		if (song.type === 'action') {
			actionLength += song.length;
		}
		array.push(song);
		songs.splice(
			_.indexOf(songs, song),
			1
		);
	}

	return array;
};

var list(songs, length, percentage) {
	// TODO - generate three lists, 20% 3, 55% 3-5 and 25% 1-2
	// TODO - make sure song count is optimal
};

var list = randomList(json, 15, .3);
console.log(list);
console.log(_.reduce(_.pluck(list, 'length'), function(memo, num){ return memo + num; }, 0));
console.log(_.reduce(_.pluck(_.filter(list, function(obj) { return obj.type === 'action'; }), 'length'), function(memo, num){ return memo + num; }, 0));
