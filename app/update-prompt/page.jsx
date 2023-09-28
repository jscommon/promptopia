"use client";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Forms from "@components/Forms";
import User from "@models/user";
import { useRouter ,useSearchParams} from "next/navigation"

const UpdatePrompt = () => {
    // const {data:session} = useSession();

    const searchParams=useSearchParams();
    const promptId=searchParams.get('id');
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    });

    useEffect(() => {
        const getPromptDetails =async ()=>{
            const response= await fetch(`/api/prompt/${promptId}`);
            const data=await response.json();

            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }

        if(promptId) getPromptDetails();
    
    }, [promptId])

    const updatePrompt=async (e)=>{
        e.preventDefault();

        if(!promptId) alert('Missing Prompt Id')
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/'+promptId,{
                method: 'PATCH',
                body: JSON.stringify({
                    prompt:post.prompt,
                    tag:post.tag
                })
            });

            if(response.ok){
                router.push('/');
            }
            
        } catch (error) {
            console.log(error)
        }finally{
            setSubmitting(false);
        }
        
    }
  return (
    <Forms 
    type="Edit"
    post={post}
    setPost={setPost}
    submitting={submitting}
    submitHandler={updatePrompt}
    />
  )
}

export default UpdatePrompt
