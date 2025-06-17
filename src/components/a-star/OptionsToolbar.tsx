import CellToggleGroup from "@/components/a-star/CellToggleGroup";
import StepControls from "@/components/a-star/StepControls";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";
import aStar from "@/lib/aStar";
import generateGrid from "@/lib/generateGrid";
import useStore from "@/store/store";
import { ShuffleIcon, XIcon } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

export default function OptionsToolbar() {
	const { size, setSize, selecteCellType, setSelectedCellType, setGrid, setSteps, setExecutionTime, setCurrentStep } = useStore(
		useShallow(selector => ({
			size: selector.size,
			setSize: selector.setSize,
			selecteCellType: selector.selectedCellType,
			setSelectedCellType: selector.setSelectedCellType,
			setGrid: selector.setGrid,
			setSteps: selector.setSteps,
			setExecutionTime: selector.setExecutionTime,
			setCurrentStep: selector.setCurrentStep,
		}))
	);

	const handleGenerateGrid = () => {
		const grid = generateGrid(size.width, size.height);
		const time = performance.now();
		const steps = aStar(grid);
		const executionTime = performance.now() - time;
		setExecutionTime(executionTime);
		setGrid(grid);
		setSteps(steps);
		setCurrentStep(0);
	};

	return (
		<div className="flex bg-card items-center shadow w-fit mx-auto rounded-2xl justify-center gap-2 text-xs border px-4">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Input type="number" className="w-16 text-xs h-6" value={size.width} onChange={e => setSize({ ...size, width: +e.target.value })} />
					</TooltipTrigger>
					<TooltipContent>width</TooltipContent>
				</Tooltip>
				<XIcon size={16} />
				<Tooltip>
					<TooltipTrigger asChild>
						<Input type="number" className="w-16 text-xs h-6" value={size.height} onChange={e => setSize({ ...size, height: +e.target.value })} />
					</TooltipTrigger>
					<TooltipContent>height</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button size="sm" variant="ghost" onClick={handleGenerateGrid}>
							<ShuffleIcon />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Generate Grid</TooltipContent>
				</Tooltip>
				<CellToggleGroup value={selecteCellType} onValueChange={setSelectedCellType} />
				<StepControls />
			</TooltipProvider>
		</div>
	);
}
