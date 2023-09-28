"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  // alert(session?.user.id);

  // alert(session?.user.id);

  const userData = session?.user;
  // console.log(userData);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {

    const hasConfirmed=confirm('Are you sure you want to delete this Prompt?');

    if(hasConfirmed){
      try {
        // console.log("hasConfirmed");
        await fetch(`api/prompt/${post._id.toString()}`,{method:'DELETE'});
// console.log("after fetch ");
// console.log(post)
        const filteredPost=posts.filter((p)=>p._id !==post._id);

        // console.log(filteredPost);
        setPosts(filteredPost);

      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/users/" + userData?.id + "/posts");
      const data = await response.json();
      setPosts(data);
    };

    if (userData) {
      fetchData();
    }
  }, [session]);

  

  return (
    <Profile
      name="My"
      desc="Welcome to your Personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
