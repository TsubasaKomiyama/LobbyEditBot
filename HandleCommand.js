const discord = require('discord.js');
const prefix = '/'; // prefix

// コマンド一覧
module.exports = {
	call: call,
	isValidLobby: isValidLobby,
	isValidRename: isValidRename,
	lobby: lobby,
	rename: rename
}

function call (message) {
	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	switch (command){
	// lobby
	case 'lobby':
		lobby (message, args[0]);
		break;
	// rename
	case 'rename':
		rename (message, args[0]);
		break;
	}
}

// /lobbyが有効なコマンドか確認を行う
function isValidLobby (message, lobby) {
	// 利用出来るチャンネルを指定する場合
	if (!(message.channel.id === 'チャンネルID')) {
		message.reply('このチャンネルでは実行出来ません。');
		return false;
	}

	// lobbyがない
	if (!(lobby)) {
		message.reply('作成するロビー名を入力してください。');
		return false;
	}

	const lobbyName = lobby;

	// lobbyNameとカテゴリー名が一致するカテゴリー検索
	const searchCategory = message.guild.channels.find((category) => category.name.toLowerCase() === lobbyName.toLowerCase() && category.type == 'category');

	// lobbyNameと同名の既存カテゴリーがある
	if (searchCategory) {
		message.reply('既に同一名称のカテゴリーが存在します。');
		return false;
	}

	return true; // trueで返す
}

// /renameが有効なコマンドか確認を行う
function isValidRename (message, lobby) {
	// 変更されたくないカテゴリーを指定する場合
	if (message.channel.id === 'チャンネルID1' || message.channel.id === 'チャンネルID2') {
		message.reply('このカテゴリー名称は変更出来ません。');
		return false;
	}
	// messageを分けたい場合
	if (message.channel.id === 'チャンネルID3') {
		message.reply('このカテゴリー名称を変更してはいけません。');
		return false;
	}

	// カテゴリーに属さないチャンネル
	if (message.channel.parentID === null) {
		message.reply('カテゴリー内のチャンネルで実行してください。');
		return false;
	}

	// lobbyがない
	if (!(lobby)) {
		message.reply('作成するロビー名を入力してください。');
		return false;
	}

	const lobbyRename = lobby;

	// lobbyRenameとカテゴリー名が一致するカテゴリー検索
	const searchCategory = message.guild.channels.find((category) => category.name.toLowerCase() === lobbyRename.toLowerCase() && category.type == 'category')

	// lobbyRenameと同名の既存カテゴリーがある
	if (findCategory) {
		message.reply('既に同一名称のカテゴリーが存在します。');
		return false;
	}

	return true; // trueで返す
}

// ロビー作成
function lobby (message, lobby) {
	if (!(isValidLobby(message, lobby))) {return; } // 非有効なコマンド

	const lobbyName = lobby;
	const txt = 'テキストチャンネル';
	const vc = 'ボイスチャンネル';

	// カテゴリー作成
	message.guild.createChannel(lobbyName, {type: 'category'})
	.then(console.log("Created：" + lobbyName))
	.catch(console.error);

	// テキストチャンネル作成
	message.guild.createChannel(txt, {type: 'text'})
	.then((channel) => {
		// lobbyNameとカテゴリー名が一致するカテゴリー検索
		let searchCategory = message.guild.channels.find((category) => category.name == lobbyName && category.type == 'category');
		if (!(category)) { return; }
		channel.setParent(category.id); // カテゴリーに配置
	}).catch(console.error);

	// ボイスチャンネル作成
	message.guild.createChannel(vc, {type: 'voice', userLimit: 99})
	.then((channel) => {
		// lobbyNameとカテゴリー名が一致するカテゴリー検索
		let searchCategory = message.guild.channels.find((category) => category.name == lobbyName && category.type == 'category');
		if (!(category)) { return; }
		channel.setParent(category.id); // カテゴリーに配置
	}).catch(console.error);
}

// ロビー名編集
function rename (message, lobby) {
	if (!(isValidRename(message, lobby))) {return; } // 非有効なコマンド

	const lobbyRename = lobby;

	// カテゴリチャンネル名にrenameLobbyを代入
	message.channel.parent.setName(lobbyRename)
	.then(console.log('Edited：' + lobbyRename))
	.catch(console.error);
}