import React from "react";

const ApproveButton = ({ isDeclined }) => {
  return (
    <button
      className={`${
        isDeclined && " text-white bg-red-700 px-2"
      } text-sm rounded-lg p-2 ${
        !isDeclined && " text-white bg-green-700 px-2"
      }`}
    >
      {isDeclined ? "Declined" : "Approved"}
    </button>
  );
};

export default ApproveButton;
