import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromSnips } from "../redux/SnipSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Snip = () => {
  const snips = useSelector((state) => state.snip.snips);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = snips.filter((snip) =>
    snip.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(snipId) {
    dispatch(removeFromSnips(snipId));
  }

  function handleShare(snip) {
    if (navigator.share) {
      navigator
        .share({
          title: snip.title,
          text: snip.content,
        })
        .then(() => toast.success("Snip shared successfully!"))
        .catch((error) => toast.error("Share failed: " + error));
    } else {
      navigator.clipboard.writeText(snip.content);
      toast.success("Snip content copied to clipboard for sharing");
    }
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl w-[100%] mt-5 h-14 pl-5 text-[15px]"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((snip) => {
            return (
              <div className="border p-5 rounded-lg " key={snip._id}>
                <div className="font-bold mb-1">Title: {snip.title}</div>
                <div className="text-xs mb-1">Created At: {new Date(snip.createdAt).toLocaleString()}</div>
                <div className="font-normal">Content: {snip.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly mt-5 mb-5">
                  <button className="rounded-md">
                    <NavLink to={`/?snipId=${snip._id}`} className={"text-white hover:text-white"}>
                      Edit
                    </NavLink>
                  </button>
                  <button className="rounded-md">
                    <NavLink to={`/snips/${snip._id}`} className={"text-white hover:text-white"}>
                      View
                    </NavLink>
                  </button >
                  <button onClick={() => handleDelete(snip._id)} className="rounded-md">
                    Delete
                  </button>
                  <button onClick={() => {
                    navigator.clipboard.writeText(snip.content);
                    toast.success("copied to clipboard");
                  }}
                  className="rounded-md">
                    Copy
                  </button>
                  <button onClick={() => handleShare(snip)} className="rounded-md">Share</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Snip;
