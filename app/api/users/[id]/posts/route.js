import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";


 const handler= async (req,{params})=>{
    try {
        await connectToDB();

        
        const prompts= await Prompt.find({creator:params.id}).populate('creator');

        return new Response(JSON.stringify(prompts),{status: 200});

    } catch (error) {

        return new Response("Failed to fetch all prompts",{status:500});
        
    }
}

export {handler as GET}