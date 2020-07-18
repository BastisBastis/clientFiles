const expNeededList=[0,0];
let expNeeded=2000;
for (let i = 2;i<11;i++) {
	expNeededList.push(expNeeded);
	expNeeded*=4;
}

export default class ExpManager{
	static getExpNeededForLevel(level) {
		if (level>=expNeededList.length) {
			console.log('ExpManager: Invalid level');
			return 0;
		}
		return expNeededList[level];
	}
}
