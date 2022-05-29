import { fileURLToPath } from "url";
import { dirname } from "path";

export const filename = fileURLToPath(import.meta.url);
export const directoryName = dirname(filename);
