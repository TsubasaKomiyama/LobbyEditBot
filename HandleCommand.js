const discord = require('discord.js');
const prefix = '/';

/**
 * メニュー一覧
 * @module exports
 */
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

	switch (command)　{

	case 'lobby':
		lobby (message, args[0]);
		break;

	case 'rename':
		rename (message, args[0]);
		break;
	}
}

/**
 * 作成可能なチャンネルか確認する。
 * @function
 */
function isValidLobby (message, lobby) {
	/**
	 * // TODO
	 * 規定のチャンネルでのみ実行出来る。
	 * 既存カテゴリと重複する名前は受け付けない。
	 * 有効ならばlobbyの処理を続行する。
	 */

	// 規定のチャンネル以外で入力
	if (!(message.channel.id === 'チャンネルID')) {
		message.reply('このチャンネルでは実行出来ません。');
		return false;
	}

	// args[0]がない
	if (!(lobby)) {
		message.reply('作成するロビー名を入力してください。');
		return false;
	}

	/** 検索するカテゴリ名 lobbyName */
	const lobbyName = lobby;
	// カテゴリー検索
	const searchCategory = message.guild.channels.find ((category) => category.name.toLowerCase() === lobbyName && category.type == 'category');

	// args[0]と同名の既存カテゴリーがある
	if (searchCategory) {
		message.reply('既に同一名称のカテゴリーが存在します。');
		return false;
	}

	return true; // trueで返す
}

/**
 * 変更可能なチャンネルか確認する。
 * @function
 */
function isValidRename (message, lobby) {
	/**
	 * // TODO
	 * 常設カテゴリ以外で実行出来る。
	 * 既存カテゴリと重複する名前は受け付けない。
	 * 有効ならばrenameの処理を続行する。
	 */

	// 常設チャンネルで入力
	if (message.channel.id === 'チャンネルID') {
		message.reply('このカテゴリーは変更出来ません。');
		return false;
	}

	// カテゴリーに属さないチャンネル
	if (message.channel.parentID === null) {
		message.reply('カテゴリー内のチャンネルで実行してください。');
		return false;
	}

	// args[0]がない
	if (!(lobby)) {
		message.reply('作成するロビー名を入力してください。');
		return false;
	}

	/** 検索するカテゴリ名 lobbyRename */
	const lobbyRename = lobby;
	// カテゴリー検索
	const searchCategory = message.guild.channels.find ((category) => category.name.toLowerCase() === lobbyRename && category.type == 'category')

	// args[0]と同名の既存カテゴリーがある
	if (searchCategory) {
		message.reply('既に同一名称のカテゴリーが存在します。');
		return false;
	}

	return true; // trueで返す
}

/**
 * 入力された値を受け取り、カテゴリとチャンネルを作成する。
 * @function
 */
function lobby (message, lobby) {
	/**
	 * //TODO
	 * カテゴリを作成する。
	 * 予め名称の決まっているテキストチャンネルとボイスチャンネルを作成する。
	 * それらを作成したカテゴリに配置する。
	 */

	if (!(isValidLobby(message, lobby))) {return; } // 非有効なコマンドはreturn

	/** 作成するカテゴリ名 lobbyName */
	const lobbyName = lobby;
	/** 作成するテキストチャンネル名  txt */
	const txt = 'テキストチャンネル';
	/** 作成するボイスチャンネル名 vc*/
	const vc = 'ボイスチャンネル';

	// カテゴリー作成
	message.guild.createChannel(lobbyName, {type: 'category'})
	.then (console.log("Created：" + lobbyName))
	.catch (console.error);

	// テキストチャンネル作成
	message.guild.createChannel(txt, {type: 'text'})
	.then ((channel) => {
		// lobbyNameと一致するカテゴリー検索
		let searchCategory = message.guild.channels.find ((category) => category.name == lobbyName && category.type == 'category');
		if (!(searchCategory)) { return; }
		channel.setParent(category.id); // カテゴリーに配置
	}).catch (console.error);

	// ボイスチャンネル作成
	message.guild.createChannel(vc, {type: 'voice', userLimit: 99})
	.then((channel) => {
		// lobbyNameと一致するカテゴリー検索
		let searchCategory = message.guild.channels.find ((category) => category.name == lobbyName && category.type == 'category');
		if (!(searchCategory)) { return; }
		channel.setParent(category.id); // カテゴリーに配置
	}).catch(console.error);
}

/**
 * 作成したカテゴリのカテゴリ名を変更する。
 * @function
*/
function rename (message, lobby) {
	if (!(isValidRename(message, lobby))) {return; } // 非有効なコマンドはreturn

	/** 変更後のカテゴリ名 lobbyRename*/
	const lobbyRename = lobby;

	// カテゴリ名をlobbyRenameに変更
	// 仕様上、テキストチャンネルがないカテゴリの名称は変更出来ない。
	message.channel.parent.setName(lobbyRename)
	.then (console.log('Edited：' + lobbyRename))
	.catch (console.error);
}
