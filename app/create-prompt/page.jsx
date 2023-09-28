"use client";
import { useSession } from "next-auth/react"
import { useState } from "react"
import Forms from "@components/Forms";
import User from "@models/user";
import { useRouter } from "next/navigation"

const CreatePrompt = () => {
    const {data:session} = useSession();
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    });

    const createPrompt=async (e)=>{
        e.preventDefault();

        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new',{
                method: 'POST',
                body: JSON.stringify({
                    prompt:post.prompt,
                    userId:session?.user.id,
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
    type="Create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    submitHandler={createPrompt}
    />
  )
}

export default CreatePrompt