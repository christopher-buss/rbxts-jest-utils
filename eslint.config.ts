import { isentinel } from "@isentinel/eslint-config";

export default isentinel({
	name: "project/root",
	jsdoc: {
		full: true,
	},
	namedConfigs: true,
	pnpm: true,
	type: "package",
});
