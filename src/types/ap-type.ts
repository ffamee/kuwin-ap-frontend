type AccessPoint = {
	ipAddress: string;
	apName: string;
	wlc: string;
	model: string;
	firmware: string;
	serial: string;
	rdmac: string;
	ethmac: string;
	apLoc: string;
	numCli: number;
	switch: string;
	eqNum: string;
	channel: string;
	rxRate: number;
	txRate: number;
	iqd: number;
	oqd: number;
};

type AccessPointName = {
	id: number;
	name: string;
};

export type { AccessPoint, AccessPointName };
