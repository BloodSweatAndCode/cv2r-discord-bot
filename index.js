const config = require('config');
const Discord = require('discord.js');
const { HelixStream, default: TwitchClient } = require('twitch');
const WebHookListener = require('twitch-webhooks').default;

console.log(HelixStream, TwitchClient);
process.exit(0);

// validate required inputs
const botToken = config.get('botToken');
if (!botToken) {
	throw new Error('must provide discord token');
}
const channel = config.get('channel');
if (!channel) {
	throw new Error('must provide discord channel id');
}

// configure clients
const discordClient = new Discord.Client();
let twitchClient;
let webHookListener;

// discord is connected, do stuff
discordClient.on('ready', async () => {
	console.log(`Logged in as ${discordClient.user.tag}`);

	twitchClient = await TwitchClient.withCredentials(config.get('twitch'));
	webHookListener = await WebHookListener.create(twitchClient, { port: 8090 });
	webHookListener.listen();

	// const twitchClient = await TwitchClient.withCredentials(config.get('twitch'));
	// console.log(JSON.stringify(await twitchClient.kraken.search.searchStreams('castlevania'), null, 2));
	
	//client.channels.get(channel).send('I\'m testing this bot');
});

// https://api.twitch.tv/helix/streams?user_id=5678

// connect to discord
discordClient.login(botToken);