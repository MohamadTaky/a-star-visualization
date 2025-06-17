import distance from "@/lib/distance";
import { getKeyFromCoords } from "@/lib/getKeyFromCoords";
import getNeighbours from "@/lib/getNeighbours";
import type { AStarCell } from "@/types/aStar";
import { PriorityQueue } from "@datastructures-js/priority-queue";

export default function aStar(grid: AStarCell[][]) {
	let source: AStarCell | null = null;
	let destination: AStarCell | null = null;
	const steps: Map<string, AStarCell>[] = [];
	const gridMap: Map<string, AStarCell> = new Map();

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			const cell = { ...grid[i][j] };
			cell.x = j;
			cell.y = i;
			gridMap.set(getKeyFromCoords(j, i), cell);
			if (cell.type === "source") source = cell;
			else if (cell.type === "destination") destination = cell;
		}
	}
	if (!source) throw new Error("source node is not defined");
	if (!destination) throw new Error("destination node is not defined");

	const open = new PriorityQueue<AStarCell>(comparator);
	open.enqueue(source);
	const closed = new Set();

	let current = open.dequeue();
	while (current) {
		if (current.type === "obsticle") break;

		const step: Map<string, AStarCell> = new Map();
		step.set(getKeyFromCoords(current.x, current.y), { ...current, uiType: "closed" });

		if (current.type === "destination") {
			let parentNode: AStarCell | undefined = destination;
			const lasStep: Map<string, AStarCell> = new Map();
			while (parentNode && parentNode.parent) {
				lasStep.set(getKeyFromCoords(parentNode.x, parentNode.y), { ...parentNode, uiType: "path" });
				parentNode = gridMap.get(parentNode.parent);
			}
			steps.push(step, lasStep);
			return steps;
		}

		const neighbors = getNeighbours(current, gridMap);
		for (const neighbour of neighbors) {
			if (!neighbour || neighbour.type === "obsticle" || closed.has(`${neighbour.x},${neighbour.y}`)) continue;

			const gCost = current.g + +distance(current.x, current.y, neighbour.x, neighbour.y);
			const hCost = distance(neighbour.x, neighbour.y, destination.x, destination.y);
			const fCost = gCost + hCost;

			if (neighbour.f === 0 || fCost < neighbour.f) {
				neighbour.g = gCost;
				neighbour.h = hCost;
				neighbour.f = fCost;
				open.enqueue(neighbour);
				neighbour.parent = getKeyFromCoords(current.x, current.y);
				step.set(getKeyFromCoords(neighbour.x, neighbour.y), { ...neighbour, uiType: "open" });
			}
		}

		closed.add(getKeyFromCoords(current.x, current.y));
		current = open.dequeue();
		steps.push(step);
	}
	return steps;
}

function comparator(a: AStarCell, b: AStarCell) {
	if (a.type === "obsticle") return 1;
	if (b.type === "obsticle") return -1;

	if (a.f < b.f) return -1;
	if (a.f > b.f) return 1;

	if (a.h < b.h) return -1;
	if (a.h > b.h) return 1;

	return 0;
}
