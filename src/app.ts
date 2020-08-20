import {
	Message,
	User,
	VoiceChannel,
	Collection,
	GuildMember,
} from 'discord.js';
import {
	token,
	prefix,
	valorantVoiceChannel,
	valorantTextChannel,
	valorantTextChannel2,
	valorantVoiceChannel2,
} from './config/discord.config';

import { globalRoles, globalRoles2 } from './data/globals.data';

import teamGen from './functions/gen-tem.func';
import Client from './client';

// const getAgents = (a: string[], b: string[], agentId: string) => {};

const messageHandler = async (msg: Message): Promise<void> => {
	const { bot } = msg.author as User;
	const pre = msg.content.startsWith(prefix) as boolean;
	const { channel } = msg as Message;
	if (
		bot ||
		!pre ||
		!(channel.id === valorantTextChannel || channel.id === valorantTextChannel2)
	) {
		return;
	}
	if (channel.id === valorantTextChannel) {
		const voiceChannel = client.get(valorantVoiceChannel);
		// const {  } = voiceChannel;
		const channelData = voiceChannel as VoiceChannel;
		const members = channelData.members as Collection<string, GuildMember>;
		const VoiceChannelMembers: { name: string; roles: string[] }[] = [];
		members.map((vl) => {
			VoiceChannelMembers.push({
				name: vl.displayName,
				roles: vl.roles.cache
					.array()
					.filter((miniRole) => Object.keys(globalRoles).includes(miniRole.id))
					.map((lmao) => lmao.id),
			});
		});
		if (!msg.content.includes('_c')) {
			const [teamOne, teamTwo] = await teamGen(
				VoiceChannelMembers,
				false,
				false
			);
			msg.channel.send(`${teamOne}\n\n${teamTwo || ''}`);
		} else {
			const [teamOne, teamTwo] = await teamGen(
				VoiceChannelMembers,
				true,
				false
			);
			msg.channel.send(`${teamOne}\n\n${teamTwo || ''}`);
		}
	} else {
		const voiceChannel = client.get(valorantVoiceChannel2);
		// const {  } = voiceChannel;
		const channelData = voiceChannel as VoiceChannel;
		const members = channelData.members as Collection<string, GuildMember>;
		const VoiceChannelMembers: { name: string; roles: string[] }[] = [];
		members.map((vl) => {
			VoiceChannelMembers.push({
				name: vl.displayName,
				roles: vl.roles.cache
					.array()
					.filter((miniRole) => Object.keys(globalRoles2).includes(miniRole.id))
					.map((lmao) => lmao.id),
			});
		});
		if (!msg.content.includes('_c')) {
			const [teamOne, teamTwo] = await teamGen(
				VoiceChannelMembers,
				false,
				true
			);
			msg.channel.send(`${teamOne}\n\n${teamTwo || ''}`);
		} else {
			const [teamOne, teamTwo] = await teamGen(VoiceChannelMembers, true, true);
			msg.channel.send(`${teamOne}\n\n${teamTwo || ''}`);
		}
	}
	// msg.channel.send(teamOne);
};
const client = new Client({
	messageHandler,
	token,
});
