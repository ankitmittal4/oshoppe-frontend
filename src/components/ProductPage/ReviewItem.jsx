import React from "react";
import { IoIosStar } from "react-icons/io";
function ReviewItem({ author, date, rating, review }) {
  return (
    <article className="flex flex-col w-full max-md:max-w-full">
      <div className="flex flex-col px-6 pt-6 pb-6 w-full border-t border-zinc-100 max-md:px-5 max-md:max-w-full">
        <header className="flex flex-wrap items-center w-full text-zinc-500 max-md:max-w-full">
          <div className="flex gap-3 items-start self-stretch my-auto min-h-[16px]">
            <span className="text-xs leading-snug">{author}</span>
            <time className="text-xs leading-loose">{date}</time>
          </div>
        </header>
        <div className="flex flex-wrap mt-1 w-full max-md:max-w-full">
          <div className="flex flex-col justify-center pt-1 w-7">
            <div
              className="flex w-9 bg-green-700 rounded min-h-[18px] text-white"
              //   aria-label={`Rating: ${rating} out of 5 stars`}
            >
              <div className="flex pl-2 pr-2">
                <p className="text-white">5</p>
                <IoIosStar className="text-sm text-white mt-1" />
              </div>
            </div>
          </div>
          <h3 className="pt-0.5 pb-px pl-3 text-sm leading-snug text-neutral-800">
            Really Nice
          </h3>
        </div>
        <p className="flex flex-wrap py-2.5 mt-1 w-full text-sm leading-5 text-neutral-800 max-md:max-w-full">
          {review}
        </p>
      </div>
    </article>
  );
}

export default ReviewItem;
