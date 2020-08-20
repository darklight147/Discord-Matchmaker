import { globalRoles, globalRoles2 } from '../data/globals.data';

const teamGen = async (
	allPlayers: { name: string; roles: string[] }[],
	custom: boolean = false,
	two: boolean
): Promise<string[]> => {
	let tempRoles: string[] = Object.keys(!two ? globalRoles : globalRoles2);
	const tempUsers = allPlayers;
	const teamOne: string[] = [];
	const teamTwo: string[] = [];

	tempUsers.map((value, index, arr) => {
		const availableChoices = value.roles.filter((vl) => tempRoles.includes(vl));
		const random = Math.floor(Math.random() * availableChoices.length);
		const agentId = availableChoices[random];

		const agentName = !two ? globalRoles[agentId] : globalRoles2[agentId];

		teamOne.push(`${value.name} khod lik ${agentName}`);

		tempRoles = tempRoles.filter((vl) => vl !== agentId);
	});

	if (custom) {
		let _tempRoles: string[] = Object.keys(!two ? globalRoles : globalRoles2);
		const _tempUsers = allPlayers;
		_tempUsers.map((value, index, arr) => {
			const availableChoices = value.roles.filter((vl) =>
				_tempRoles.includes(vl)
			);
			const random = Math.floor(Math.random() * availableChoices.length);
			const agentId = availableChoices[random];

			const agentName = !two ? globalRoles[agentId] : globalRoles2[agentId];

			teamTwo.push(`${value.name} khod lik ${agentName}`);

			_tempRoles = _tempRoles.filter((vl) => vl !== agentId);
		});
	}
	// await Promise.all();
	return [teamOne.join('\n'), teamTwo.join('\n')];
};
export default teamGen;
