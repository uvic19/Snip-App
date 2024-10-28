import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams,useParams } from "react-router-dom";
import { addToSnips, updateToSnips,  } from "../redux/SnipSlice";

const ViewSnip = () => {

  const {id} = useParams();

  const allSnips = useSelector((state) => state.snip.snips);

  const snip = allSnips.filter((p) => p._id === id)[0];

  return (
    <div>
      <div className="flex flex-row justify-center">
        <input
          className="rounded-lg place-content-evenly mt-2 w-[100%] pl-4 text-center font-semibold h-10 bg-[#0693a0]"
          type="text"
          placeholder="Enter Title Here"
          value={snip.title}
          onChange={(e) => setTitle(e.target.value)}
          disabled
        />
      </div>
      <div className="mt-2">
        <textarea
          className="rounded-lg mt-2 min-w-[500px] p-5"
          value={snip.content}
          placeholder="Enter your content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          disabled
        ></textarea>
      </div>
    </div>
  )
}

export default ViewSnip
