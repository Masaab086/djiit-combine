import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import axios from "axios";
import { server } from "../../server";
import { useState } from "react";
import ApproveButton from "./ApproveButton";

const AllProducts = () => {
  const [data, setData] = useState([]);

  const relode = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    axios
      .get(`${server}/product/admin-all-products`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Verified",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        let isApproved = params.getValue(params.id, "isApproved");
        let isDeclined = params.getValue(params.id, "isDeclined");
        const approveProduct = async () => {
          const response = await axios.post(
            `${server}/product/approve/${params.id}`,
            {
              withCredentials: true,
            }
          );
          relode();

          isApproved = true;
          isDeclined = false;
        };
        const declineProduct = async () => {
          const response = await axios.post(
            `${server}/product/decline/${params.id}`,
            {
              withCredentials: true,
            }
          );

          isApproved = true;
          isDeclined = true;
          relode();
        };

        console.log(isDeclined);
        return (
          <>
            {!isApproved && (
              <div
                to={`/product/${params.id}`}
                className="p-2 flex gap-2 w-full text-sm"
              >
                <button
                  className="bg-red-700 rounded-lg text-white px-2"
                  onClick={(e) => declineProduct()}
                >
                  Decline
                </button>
                <button
                  onClick={(e) => approveProduct()}
                  className="bg-blue-700 rounded-lg p-2 text-white px-2 "
                >
                  Approve
                </button>
              </div>
            )}

            {isApproved && <ApproveButton isDeclined={isDeclined} />}
          </>
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
        isApproved: item?.isApproved,
        isDeclined: item?.isDeclined,
      });
    });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </>
  );
};

export default AllProducts;
