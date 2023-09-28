import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

const handler= async (req)=> {
    
    const {userId,prompt,tag}=await req.json();

    try {
        await connectToDB();

        console.log({userId,prompt,tag});
        const newPrompt= await Prompt.create({
            creator:userId,
            prompt,
            tag
        });
        console.log(newPrompt);
        // await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201});

    } catch (error) {
        console.error(error);
        return new Response("Failed to Create a new Prompt", {status: 500});
    }
}

export {handler as POST};