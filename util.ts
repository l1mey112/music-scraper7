import { statSync, existsSync } from 'fs'

export function log(part: string, message: string, level: 'init' | 'info' | 'error') {
	console.log(`[${part}] ${message}`)
}

export function exit(code: number = 0): never {
	process.exit(code)
}

export function fatal(part: string, message: string): never {
	log(part, message, 'error')
	exit(1)
}

export function extract_root() {
	let root = 'root'

	if (process.argv[2]) {
		root = process.argv[2]
	}

	if (process.env.ROOT) {
		root = process.env.ROOT
	}

	const stat = statSync(root,  { throwIfNoEntry: false })

	if (!stat) {
		fatal('root', `\`${root}\` does not exist not a directory`)
	}

	if (!stat.isDirectory()) {
		fatal('root', `\`${root}\` is not a directory`)
	}

	if (!existsSync(`${root}/.obsidian`)) {
		fatal('root', `\`${root}\` doesn't seem to be an obsidian vault (no .obsidian directory)`)
	}

	log('root', `using \`${root}\` as root`, 'init')

	return root
}
