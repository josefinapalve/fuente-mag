import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'src', 'assets');

const W = 1600;
const H = 1200;

// Paleta FUENTE
const palette = {
	paper: '#f4f4f4',
	cream: '#ebe6e0',
	navy: '#0e1749',
	inkBlue: '#13247c',
	terracotta: '#af2d27',
	forest: '#296647',
	mustard: '#d4a017',
	rose: '#d4907e',
	sage: '#9db8a4',
	butter: '#e5cfa0',
};

// Composición: fondo de un color + círculo grande de otro color
// Da un feeling editorial tipo zine, con un objeto único que respira
function makeSvg({ bg, fg, cx, cy, r }) {
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
		<rect width="${W}" height="${H}" fill="${bg}"/>
		<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fg}"/>
	</svg>`;
}

const designs = [
	// 1 — Marcos Witt / Música: navy con sol mustard
	{ file: 'blog-placeholder-1.jpg', bg: palette.navy, fg: palette.mustard, cx: W * 0.62, cy: H * 0.42, r: 280 },
	// 2 — Santos del Arte: cream con arco terracota
	{ file: 'blog-placeholder-2.jpg', bg: palette.cream, fg: palette.terracotta, cx: W * 0.5, cy: H * 0.7, r: 340 },
	// 3 — Favoritos del mes: butter con luna forest
	{ file: 'blog-placeholder-3.jpg', bg: palette.butter, fg: palette.forest, cx: W * 0.35, cy: H * 0.55, r: 300 },
	// 4 — variación: rose con punto navy
	{ file: 'blog-placeholder-4.jpg', bg: palette.rose, fg: palette.navy, cx: W * 0.7, cy: H * 0.3, r: 220 },
	// 5 — variación: sage con sol mustard
	{ file: 'blog-placeholder-5.jpg', bg: palette.sage, fg: palette.mustard, cx: W * 0.45, cy: H * 0.6, r: 260 },
	// about — paper con doble círculo
	{ file: 'blog-placeholder-about.jpg', bg: palette.paper, fg: palette.inkBlue, cx: W * 0.5, cy: H * 0.5, r: 260 },
];

for (const d of designs) {
	const svg = makeSvg(d);
	await sharp(Buffer.from(svg))
		.jpeg({ quality: 90, mozjpeg: true })
		.toFile(join(outDir, d.file));
	console.log(`✓ ${d.file}`);
}

console.log('\nListo.');
