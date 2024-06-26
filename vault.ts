import { extract_root } from "./util";

const root = extract_root()
const glob = new Bun.Glob('**.md')
const all = glob.scanSync({ cwd: root })

for (const file of all) {
	console.log()
}
