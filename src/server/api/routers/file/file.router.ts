import { getFile, uploadFile } from "./requests";
import { createTRPCRouter } from "../../trpc";

export const fileRouter = createTRPCRouter({
	getFile,
	uploadFile,
});
