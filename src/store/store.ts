import aStar from "@/lib/aStar";
import generateGrid from "@/lib/generateGrid";
import type { AStarCell, CellType } from "@/types/aStar";
import type { Dispatch, SetStateAction } from "react";
import { create } from "zustand";

type Store = {
	size: { width: number; height: number };
	setSize: Dispatch<SetStateAction<Store["size"]>>;
	grid: AStarCell[][];
	setGrid: Dispatch<SetStateAction<Store["grid"]>>;
	steps: Map<string, AStarCell>[];
	setSteps: Dispatch<SetStateAction<Store["steps"]>>;
	currentStep: number;
	setCurrentStep: Dispatch<SetStateAction<Store["currentStep"]>>;
	selectedCellType: CellType;
	setSelectedCellType: Dispatch<SetStateAction<CellType>>;
	executionTime: number;
	setExecutionTime: Dispatch<SetStateAction<Store["executionTime"]>>;
	editing: boolean;
	setEditing: Dispatch<SetStateAction<Store["editing"]>>;
};

const initialGrid = generateGrid(15, 15);
const time = performance.now();
const initialSteps = aStar(initialGrid);
const initialExecutionTime = performance.now() - time;

const useStore = create<Store>((set, get) => ({
	size: { width: 15, height: 15 },
	setSize: value => set({ size: typeof value === "function" ? value(get().size) : value }),
	grid: initialGrid,
	setGrid: value => set({ grid: typeof value === "function" ? value(get().grid) : value }),
	steps: initialSteps,
	setSteps: value => {
		set({ steps: typeof value === "function" ? value(get().steps) : value });
	},
	currentStep: 0,
	setCurrentStep: value => {
		set({ currentStep: typeof value === "function" ? value(get().currentStep) : value });
	},
	selectedCellType: "traversable",
	setSelectedCellType: value => set({ selectedCellType: typeof value === "function" ? value(get().selectedCellType) : value }),
	executionTime: initialExecutionTime,
	setExecutionTime: value => set({ executionTime: typeof value === "function" ? value(get().executionTime) : value }),
	editing: false,
	setEditing: value => set({ editing: typeof value === "function" ? value(get().editing) : value }),
}));

export default useStore;
