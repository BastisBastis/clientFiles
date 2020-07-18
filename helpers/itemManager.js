import * as ItemDB from '../dbs/itemDB';

export default class ItemManager {
	static getItemData(id) {
		if (ItemDB.items[id])
			return ItemDB.items[id];
		
		return false;
	}


}
