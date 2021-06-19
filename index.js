const discord = require('discord.js');
const client = new discord.Client();
const HandleCommand = require('絶対パス');
const test = ;
const test = ;

// カテゴリー自動削除
// メンバーがVCに接続・切断した時
client.on ('voiceStateUpdate', member => {
  // 検索したいVCチャンネル名
  const channelName = 'VCチャンネル名';

  // 指定秒数経過後に実行する処理
  setTimeout(() => {
    // チャンネル名がchannelNameかつVC接続人数が0人
    let sizeCheck = client.channels.find((sizeCheck) => sizeCheck.name) === channelName &&
                                          sizeCheck.members.size === 0);

    if (!(sizeCheck)) return; // 検索結果無し

    const category = sizeCheck.parent; // 検索結果のチャンネルのカテゴリID取得

    category.children.forEach((channel) => channel.delete()); // カテゴリに属するチャンネル削除
    category.delete(); // カテゴリ削除
  }, 5000) // 5000ミリ秒 = 5秒
  .then (console.log('Deleted' + category))
  .catch (console.error);
})
