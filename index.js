const discord = require('discord.js');
const client = new discord.Client();
const HandleCommand = require('絶対パス');
const prefix = '/';

client.on ('ready', message => {
	console.log('Bot on redy');
	client.user.setPresence({ game: { name: 'LobbyEdit' } });
});

/**
 * メンバーがVCに接続・切断した時にカテゴリーを削除する。
 */
client.on ('voiceStateUpdate', member => {
  /**
   * //TODO
   * 接続人数0人のvoiceChannelを検索する。
   * 見つかった場合、カテゴリごとチャンネルを削除する。
   * 常設カテゴリにあるVCは削除しない。
   */

  /** 検索するVCチャンネル名 */
  const voiceChannel = 'ゲーム用VC';

  // 5秒後に実行
  setTimeout (() => {
    // 接続人数0人のvoiceChannelを検索
    let sizeCheckChannel = client.channels.find ((channel) => channel.name === voiceChannel && channel.members.size === 0);

    if (!(sizeCheckChannel)) return; // 検索結果無し

		const category = sizeCheckChannel.parent; // 検索結果チャンネルのカテゴリID取得
		category.children.forEach ((channel) => channel.delete()); // カテゴリに属するチャンネル削除
		category.delete(); // カテゴリ削除
	}, 5000) // 5000ミリ秒
  .then (console.log ('Deleted' + category))
  .catch (console.error);
});

/**
 * 特定のメッセージが投稿された時、HandleCommandを呼び出す。
 * @param message
 */
client.on ('message', message => {
	if (message.author.id == client.user.id || message.author.bot) return;

	/**
   * HandleCommandを呼び出して実行処理。
   */
	if (!message.content.startsWith(prefix)) return;
	if (message.content.startsWith(prefix)) {
		HandleCommand.call(message)
	}
});

if (process.env.DISCORD_BOT_TOKEN == undefined) {
	console.log('DISCORD_BOT_TOKENが設定されていません。');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );
