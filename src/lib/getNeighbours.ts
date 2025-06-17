import type { AStarCell } from "@/types/aStar";

export default function getNeighbours(node: AStarCell, grid: Map<string, AStarCell>) {
	return [
		grid.get(`${node.x - 1},${node.y - 1}`),
		grid.get(`${node.x},${node.y - 1}`),
		grid.get(`${node.x + 1},${node.y - 1}`),
		grid.get(`${node.x - 1},${node.y}`),
		grid.get(`${node.x + 1},${node.y}`),
		grid.get(`${node.x - 1},${node.y + 1}`),
		grid.get(`${node.x},${node.y + 1}`),
		grid.get(`${node.x + 1},${node.y + 1}`),
	];
}
