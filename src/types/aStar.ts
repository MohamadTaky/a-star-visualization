export const cellTypes = ["traversable", "obsticle", "source", "destination"] as const;

export type CellType = (typeof cellTypes)[number];
export type AStarCell =
	| {
			type: CellType;
			uiType?: "open" | "closed" | "path" | undefined;
			x: number;
			y: number;
			parent?: string;
	  } & ({ type: "obsticle" } | { type: "traversable" | "source" | "destination"; h: number; g: number; f: number });
