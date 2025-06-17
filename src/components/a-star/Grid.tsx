import Cell from "@/components/a-star/Cell";
import aStar from "@/lib/aStar";
import { getKeyFromCoords } from "@/lib/getKeyFromCoords";
import { cn } from "@/lib/utils";
import useStore from "@/store/store";
import type { AStarCell } from "@/types/aStar";
import { memo, useCallback, useState, type HTMLAttributes } from "react";
import { useShallow } from "zustand/react/shallow";

type GridProps = HTMLAttributes<HTMLDivElement>;

const cellSize = 32;

const Grid = memo(({ className, ...props }: GridProps) => {
	const [clicked, setClicked] = useState(false);
	const { grid, setGrid, setSteps, selectedCellType, editing, setExecutionTime, setCurrentStep } = useStore(
		useShallow(selector => ({
			grid: selector.grid,
			setGrid: selector.setGrid,
			setSteps: selector.setSteps,
			selectedCellType: selector.selectedCellType,
			editing: selector.editing,
			setExecutionTime: selector.setExecutionTime,
			setCurrentStep: selector.setCurrentStep,
		}))
	);

	const handleCellClick = useCallback(
		(cell: AStarCell) => {
			if (!editing) return;
			if (cell.type === "source" || cell.type === "destination") return;
			let newCell: AStarCell | null = null;
			if (selectedCellType === "obsticle") {
				newCell = { type: selectedCellType, x: cell.x, y: cell.y };
			} else {
				newCell = { type: selectedCellType, g: 0, h: 0, f: 0, x: cell.x, y: cell.y };
			}

			setGrid(prev => {
				const newGrid = prev.map(row =>
					row.map(cell => {
						if (cell.type !== "obsticle") {
							cell.f = 0;
							cell.g = 0;
							cell.h = 0;
						}
						cell.uiType = undefined;
						return cell;
					})
				);

				if (newCell.type === "source") {
					const sourceCell = newGrid.flat().find(cell => cell.type === "source")!;
					newGrid[sourceCell.y][sourceCell.x] = { type: "traversable", x: sourceCell.x, y: sourceCell.y, g: 0, h: 0, f: 0 };
				} else if (newCell.type === "destination") {
					const destinationCell = newGrid.flat().find(cell => cell.type === "destination")!;
					newGrid[destinationCell.y][destinationCell.x] = { type: "traversable", x: destinationCell.x, y: destinationCell.y, g: 0, h: 0, f: 0 };
				}
				newGrid[newCell.y][newCell.x] = newCell;
				const time = performance.now();
				setSteps(aStar(newGrid));
				setExecutionTime(performance.now() - time);
				setCurrentStep(0);
				return newGrid;
			});
		},
		[selectedCellType, setGrid, setSteps, editing, setExecutionTime, setCurrentStep]
	);

	return (
		<div
			style={{ width: cellSize * grid[0].length + 1, height: cellSize * grid.length + 0.5 }}
			className={cn("border-b border-s border-black w-fit mx-auto relative rounded-sm overflow-hidden", className)}
			onPointerDown={() => setClicked(true)}
			onPointerUp={() => setClicked(false)}
			onPointerLeave={() => setClicked(false)}
			{...props}>
			{grid.map(row =>
				row.map(cell => (
					<Cell
						style={{ left: cellSize * cell.x, top: cellSize * cell.y, width: cellSize, height: cellSize }}
						cell={cell}
						key={getKeyFromCoords(cell.x, cell.y)}
						onPointerEnter={() => clicked && handleCellClick(cell)}
					/>
				))
			)}
		</div>
	);
});

export default Grid;
