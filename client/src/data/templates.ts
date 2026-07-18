import templates from "./templates.json";

export { templates };
export type Template = (typeof templates)[number];
