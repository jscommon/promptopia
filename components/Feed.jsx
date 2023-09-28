"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Loading from "@app/profile/loading";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);

  const [searchResult, setSearchResult] = useState([]);
  const [searchTime, setSearchTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      console.log(data);
      setPost(data);
    };
    fetchData();
  }, []);

  const filterPrompts = (searchtext) => {
    console.log(searchtext);
    const regex = new RegExp(searchtext, "i");
    // console.log(post.filter(
    //   (item) =>
    //     regex.test(item.creator.username) ||
    //     regex.test(item.tag) ||
    //     regex.test(item.prompt)
    // ))
    //SEARCH & return
    return post.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTime);
    setSearchText(e.target.value);

    setSearchTime(
      setTimeout(() => {
        const result = filterPrompts(e.target.value);
        console.log(result);
        setSearchResult(result);
      }, 500)
    );
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const result = filterPrompts(tagName);
    setSearchResult(result);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>
      {post.length ===0 ? (
        <div className="mt-20" ><Loading /></div>
      ) : (
        <>
          {searchText ? (
            <PromptCardList
              data={searchResult}
              handleTagClick={handleTagClick}
            />
          ) : (
            <PromptCardList data={post} handleTagClick={handleTagClick} />
          )}
        </>
      )}
    </section>
  );
};

export default Feed;
