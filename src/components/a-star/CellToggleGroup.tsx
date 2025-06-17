import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";
import { cellTypes, type CellType } from "@/types/aStar";
import { useCallback } from "react";

type CellToggleGroupProps = {
	value: CellType;
	onValueChange?: (value: CellType) => void;
};

export default function CellToggleGroup({ value, onValueChange }: CellToggleGroupProps) {
	const handleValueChange = useCallback(
		(value: CellType) => {
			if (!value) return;
			onValueChange?.(value);
		},
		[onValueChange]
	);
	return (
		<ToggleGroup variant="default" type="single" value={value} onValueChange={handleValueChange}>
			{cellTypes.map(cellType => (
				<Tooltip key={cellType}>
					<ToggleGroupItem value={cellType} asChild className="first:rounded-s-none last:rounded-e-none">
						<TooltipTrigger>
							<div
								className={cn(
									"size-6 rounded-md",
									cellType === "source" ? "bg-green-500" : cellType === "destination" ? "bg-red-500" : cellType === "obsticle" ? "bg-gray-500" : "bg-white"
								)}></div>
						</TooltipTrigger>
					</ToggleGroupItem>
					<TooltipContent>{cellType}</TooltipContent>
				</Tooltip>
			))}
		</ToggleGroup>
	);
}
