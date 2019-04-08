import React from "react";

function NotFound(props) {
  return (
    <div className='container'>
      <h1 className='text-center'>
        Sorry, but you've taken a wrong turn{" "}
        <span role='img' aria-label='sad-face'>
          😟
        </span>
      </h1>
    </div>
  );
}
export default NotFound;
