import {redirect, type RequestHandler} from "@sveltejs/kit";

export const GET: RequestHandler = () => {
    return redirect(302, "https://discord.gg/sillyscp");
};