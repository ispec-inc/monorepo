import Konva from "konva";

export type KonvaFilters = Parameters<Konva.Image['filters']>[0]
export type KonvaFilter = KonvaFilters[number]