"use client";

import { useState } from "react";
import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { QuakeMap } from "@/components/quake-map";
import { MagnitudeLegend } from "@/components/magnitude-legend";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { TimePeriod } from "@/hooks/use-earthquakes";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

export default function Home() {
    const [timePeriod, setTimePeriod] = useState<TimePeriod>("day");
    const [magnitudeRange, setMagnitudeRange] = useState<[number, number]>([
        0, 10,
    ]);
    const [mapTypeId, setMapTypeId] = useState<string>("roadmap");

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold font-headline">QuakeVis</h1>
                    </div>
                </SidebarHeader>
                <SidebarContent className="flex flex-col gap-6 p-4">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="time-period" className="text-base">
                                Time Period
                            </Label>
                            <Select
                                value={timePeriod}
                                onValueChange={(v) => setTimePeriod(v as TimePeriod)}
                            >
                                <SelectTrigger id="time-period" className="mt-2">
                                    <SelectValue placeholder="Select time period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hour">Last Hour</SelectItem>
                                    <SelectItem value="day">Last 24 Hours</SelectItem>
                                    <SelectItem value="week">Last 7 Days</SelectItem>
                                    <SelectItem value="month">Last 30 Days</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-base">
                                Magnitude: {magnitudeRange[0].toFixed(1)} -{" "}
                                {magnitudeRange[1].toFixed(1)}
                            </Label>
                            <Slider
                                value={magnitudeRange}
                                onValueChange={(value) => {
                                    setMagnitudeRange(value as [number, number]);
                                }}
                                min={0}
                                max={10}
                                step={0.1}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <Label htmlFor="map-style" className="text-base">
                                Map Style
                            </Label>
                            <Select value={mapTypeId} onValueChange={setMapTypeId}>
                                <SelectTrigger id="map-style" className="mt-2">
                                    <SelectValue placeholder="Select map style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="roadmap">Roadmap</SelectItem>
                                    <SelectItem value="satellite">Satellite</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                    <SelectItem value="terrain">Terrain</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Separator />

                    <MagnitudeLegend />
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                <div className="absolute top-4 left-4 z-10">
                    <SidebarTrigger>
                        <Button size="icon" variant="default" className="shadow-lg">
                            <PanelLeft />
                        </Button>
                    </SidebarTrigger>
                </div>
                <QuakeMap
                    timePeriod={timePeriod}
                    magnitudeRange={magnitudeRange}
                    mapTypeId={mapTypeId}
                />
            </SidebarInset>
        </SidebarProvider>
    );
}
