import { cellTypes, type AStarCell } from "@/types/aStar";

export default function generateGrid(width: number, height: number) {
	let source = getRandomPosition(width, height);
	let destination = getRandomPosition(width, height);
	while (source.x === destination.x && source.y === destination.y) {
		source = getRandomPosition(width, height);
		destination = getRandomPosition(width, height);
	}

	const grid: AStarCell[][] = Array(height)
		.fill(0)
		.map((_, y) =>
			Array(width)
				.fill(0)
				.map((_, x) =>
					source.x === x && source.y === y
						? { type: "source", g: 0, h: 0, f: 0, ...source }
						: destination.x === x && destination.y === y
						? { type: "destination", g: 0, h: 0, f: 0, ...destination }
						: getRandomCell(x, y)
				)
		);
	return grid;
}

function getRandomCell(x: number, y: number) {
	const filteredTypes = cellTypes.filter(type => type !== "source" && type !== "destination");
	const type = filteredTypes[Math.floor(Math.random() * filteredTypes.length)];

	let cell: AStarCell | null = null;
	if (type === "obsticle") {
		cell = { type, x, y };
	} else {
		cell = { type, x, y, f: 0, g: 0, h: 0 };
	}
	return cell;
}

function getRandomPosition(width: number, height: number) {
	return { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
}
