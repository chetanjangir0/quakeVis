import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { magnitudeLevels } from '@/lib/earthquake-helpers';

export function MagnitudeLegend() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Magnitude Legend</CardTitle>
        <CardDescription>Color and size indicate magnitude.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {magnitudeLevels.map((level) => (
            <li key={level.range} className="flex items-center gap-3">
              <div
                className="h-5 w-5 rounded-full flex-shrink-0"
                style={{ backgroundColor: level.color }}
              />
              <div>
                <span className="font-semibold">{level.range}</span>
                <p className="text-sm text-muted-foreground">{level.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
