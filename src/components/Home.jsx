import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToSnips, updateToSnips } from "../redux/SnipSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const snipId = searchParams.get("snipId");
  const dispatch = useDispatch();
  const snips = useSelector((state) => state.snip.snips);

  useEffect(() => {
    console.log("useEffect: snipId changed", snipId);
    console.log("useEffect: Allsnips changed", snips);

    if (snipId) {
      const snipToEdit = snips.find((snip) => snip._id === snipId);
      if (snipToEdit) {
        setTitle(snipToEdit.title);
        setValue(snipToEdit.content);
      } else {
        console.warn(`Snip not found for id: ${snipId}`);
        // Clear fields if snip is not found
        setTitle('');
        setValue('');
      }
    } else {
      // Clear fields when no snipId
      setTitle('');
      setValue('');
    }
  }, [snipId, snips]);

  const createSnip = () => {
    const snip = {
      title,
      content: value,
      _id: snipId || Date.now().toString(36), // Ensure unique ID
      createdAt: new Date().toISOString(),
    };

    if (snipId) {
      dispatch(updateToSnips(snip));
    } else {
      dispatch(addToSnips(snip));
    }

    // Clear fields after creating/updating
    setTitle('');
    setValue('');
    setSearchParams({});
  };

  return (
    <div>
      <div className="flex flex-row justify-center">
        <input
          className="rounded-l-lg place-content-evenly mt-2 w-[80%] pl-4"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="p-2 rounded-r place-content-evenly mt-2"
          onClick={createSnip}
        >
          {snipId ? "Update my Snip" : "Create my Snip"}
        </button>
      </div>
      <div className="mt-2">
        <textarea
          className="rounded-2xl mt-0 min-w-[500px] p-5"
          value={value}
          placeholder="Enter your content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;