import Discord, { Client } from 'discord.js';

interface Iinit {
	token: string;
	messageHandler: (...arg: any[]) => void;
}

class ClientC {
	private client: Client;
	constructor(init: Iinit) {
		this.client = new Discord.Client();
		this.client.login(init.token);
		this.setMessage('message', init.messageHandler);
		this.client.on('ready', () => {
			console.log('Discord is ready!');
		});
	}
	/**
	 * message
	 */
	public setMessage(event: string, func: (...arg: any[]) => any) {
		this.client.on(event, func);
	}
	public get(token: string) {
		return this.client.channels.cache.get(token);
	}
}

export default ClientC;
