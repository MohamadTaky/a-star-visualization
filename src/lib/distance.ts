export default function distance(x1: number, y1: number, x2: number, y2: number) {
	const dx = Math.abs(x2 - x1);
	const dy = Math.abs(y2 - y1);
	return Math.floor(Math.sqrt(dx * dx + dy * dy) * 10);
}
