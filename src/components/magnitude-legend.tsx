import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { magnitudeLevels, clusterCountLevels } from "@/lib/earthquake-helpers";


export function MagnitudeLegend() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Legend</CardTitle>
        <CardDescription>Color and size indicate magnitude and density.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Magnitude Legend */}
        <h4 className="font-semibold text-lg mb-2">Magnitude</h4>
        <ul className="space-y-3">
          {magnitudeLevels.map((level) => (
            <li key={level.range} className="flex items-center gap-3">
              <div
                className="h-5 w-5 rounded-full flex-shrink-0"
                style={{ backgroundColor: level.color }}
              />
              <div>
                <span className="font-semibold">{level.range}</span>
                <p className="text-sm text-muted-foreground">
                  {level.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t pt-3" />

        {/* Count Legend */}
        <h4 className="font-semibold text-lg mb-2">Count/Density</h4>
        <ul className="space-y-3">
          {clusterCountLevels.map((level) => (
            <li key={level.range} className="flex items-center gap-3">
              <div
                className="h-5 w-5 rounded-full flex-shrink-0"
                style={{ backgroundColor: level.color }}
              />
              <div>
                <span className="font-semibold">{level.range}</span>
                <p className="text-sm text-muted-foreground">
                  {level.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
