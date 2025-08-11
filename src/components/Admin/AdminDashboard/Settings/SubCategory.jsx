import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import delete1 from '../../../../Assets/delete.svg';
import edit from '../../../../Assets/edit.svg';
import { API_URL } from '../../../../Constants';
import { useLocation } from 'react-router-dom';

const SubCategory = () => {
    const location = useLocation();
    const token = localStorage.getItem('admin-token');
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const { categoryId } = useParams();
    const { categoryName } = location.state || {};

    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editSubCategoryId, setEditSubCategoryId] = useState(null);

    const [showPopup, setShowPopup] = useState(false);
    const [subCategoryName, setSubCategoryName] = useState('');
    const [duplicateSubCategory, setDuplicateSubCategory] = useState(false);

    const handleCloseEditPopup = () => {
        setShowEditPopup(false);
    };

    //IDEA: Fetching sub category list
    const fetchSubCategory = async () => {
        setLoading(true);
        try {
            const data = {
                limit: 100,
                page: 1,
                categoryId: categoryId,
            };
            // //console.log('data: ', data);
            const response = await axios.post(
                `${API_URL}/subCategory/list`,
                data,
            );
            // //console.log('Request: ', response);

            const subCategory = response.data.data.subCategory;

            // const category = subCategory[0]?.categoryName;
            // setCategoryName(category);
            if (subCategory.length) {
                // //console.log("Sub-Category: ", subCategory);
                setSubCategories(subCategory);
                setLoading(false);
            } else {
                setSubCategories([]);
                setLoading(false);
            }
        } catch (error) {
            //console.log('error: ', error);
        }
    };
    useEffect(() => {
        fetchSubCategory();
    }, []);

    //IDEA: Add sub category
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', subCategoryName);
            formData.append('categoryId', categoryId);

            //console.log('name: ', subCategoryName);
            //console.log('catId: ', categoryId);
            //console.log('token: ', token);

            const response = await axios.post(
                `${API_URL}/subCategory/add`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    // maxBodyLength: Infinity,
                },
            );
            // //console.log('Add sub category response: ', response);

            const addedSubCategory = response.data.data;
            if (addedSubCategory) {
                //console.log('Added Sub-Category: ', addedSubCategory);
                setSubCategories((prevSubCategories) => [
                    ...prevSubCategories,
                    addedSubCategory,
                ]);
                setLoading(false);
                setDuplicateSubCategory(false);
                setShowPopup(false);
            } else {
                setLoading(false);
                setDuplicateSubCategory(true);
                setTimeout(() => {
                    setDuplicateSubCategory(false);
                }, 400);
            }
        } catch (error) {
            //console.log('error: ', error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const handleOpenPopup = () => {
        setShowPopup(true);
        setSubCategoryName('');
        setDuplicateSubCategory(false);
    };
    const handleInputChange = (e) => {
        setSubCategoryName(e.target.value);
        //console.log('@@@', e.target.value);
    };

    //IDEA: edit sub category
    const handleEditSubCategory = async (categoryId) => {
        try {
            const formData = new FormData();
            formData.append('categoryId', editSubCategoryId);
            formData.append('name', subCategoryName);
            // //console.log('name: ', subCategoryName);

            const response = await axios.post(
                `${API_URL}/category/add`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setSubCategories((prevSubCategories) =>
                prevSubCategories.map((subCategory) =>
                    subCategory._id === editSubCategoryId
                        ? {
                              ...subCategory,
                              name: response.data.data.name || categoryName,
                          }
                        : subCategory,
                ),
            );
            // //console.log("response: ", response);
            setShowEditPopup(false);
        } catch (error) {
            //console.log('Error: ', error);
        }
    };
    const setUpdateOnEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    const setEditOnEnter = (e) => {
        if (e.key === 'Enter') {
            handleEditSubCategory();
        }
    };
    const handleOpenEditPopup = (subCategoryId, subCategoryName) => {
        // //console.log('sub categoryName: ', subCategoryName);
        setEditSubCategoryId(subCategoryId);
        setShowEditPopup(true);
        setSubCategoryName(subCategoryName);
        // setDuplicateCategory(false);
    };

    //IDEA: delete sub category
    const handleDeleteSubCategory = async (subCategoryId) => {
        try {
            const response = await axios.post(
                `${API_URL}/subCategory/delete`,
                { subCategoryId: subCategoryId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setSubCategories((prevSubCategories) =>
                prevSubCategories.filter(
                    (subCategory) => subCategoryId !== subCategory._id,
                ),
            );
            // //console.log("response: ", response);
        } catch (error) {
            //console.log('Error: ', error);
        }
    };
    return (
        <div className="ml-[20rem] p-3 pl-6 pr-3 font-custom bg-[#F0F0F0] min-h-svh">
            <div className="flex justify-between mb-8 mt-2">
                <h2 className="text-2xl font-medium mb-0">
                    Sub Categories of {categoryName}
                </h2>
                <button
                    className="bg-[#A70024] text-white px-4 py-2 rounded-lg hover:bg-red-800"
                    onClick={handleOpenPopup}
                >
                    Add Sub-Category
                </button>
            </div>

            {showEditPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-200 p-6 rounded-md w-[30%]">
                        <h2 className="text-xl font-bold mb-4 text-gray-700">
                            Edit Category
                        </h2>
                        <input
                            type="text"
                            value={subCategoryName}
                            onChange={handleInputChange}
                            onKeyDown={(e) => setEditOnEnter(e)}
                            placeholder="Enter Sub-Category"
                            className="border border-gray-500 p-2 rounded-md w-full mb-1 text-gray-800 bg-gray-200 outline-none"
                        />

                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={handleEditSubCategory}
                                disabled={!subCategoryName.trim()}
                                className={`px-5 py-2 rounded-md mr-2 text-white ${
                                    !subCategoryName.trim()
                                        ? 'bg-blue-300 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-700'
                                }`}
                            >
                                {loading ? 'Editing...' : 'Edit'}
                            </button>
                            <button
                                onClick={handleCloseEditPopup}
                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-200 p-6 rounded-md w-[30%]">
                        <h2 className="text-xl font-bold mb-4 text-gray-700">
                            Add Sub-Category
                        </h2>
                        <input
                            type="text"
                            value={subCategoryName}
                            onChange={handleInputChange}
                            onKeyDown={(e) => setUpdateOnEnter(e)}
                            placeholder="Enter Sub-Category"
                            className="border border-gray-500 p-2 rounded-md w-full mb-1 text-gray-800 bg-gray-200 outline-none"
                        />
                        <div className="h-6 flex items-center">
                            {duplicateSubCategory && (
                                <div className="text-red-500">
                                    Sub-Category already exists.
                                </div>
                            )}
                        </div>
                        <div className="mt-3 flex justify-between">
                            <button
                                onClick={handleSubmit}
                                disabled={!subCategoryName.trim()}
                                className={`px-5 py-2 rounded-md mr-2 text-white ${
                                    !subCategoryName.trim()
                                        ? 'bg-blue-300 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-700'
                                }`}
                            >
                                {loading ? 'Adding...' : 'Add'}
                            </button>
                            <button
                                onClick={handleClosePopup}
                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full rounded-lg flex flex-col items-center justify-center mx-auto">
                {loading ? (
                    <p>Loading...</p>
                ) : subCategories.length === 0 ? (
                    <h1 className="text-2xl mt-40 text-red-600">
                        No subcategories found.
                    </h1>
                ) : (
                    <div className="w-full overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full bg-white rounded-lg">
                            <thead className="bg-[#5C5C5C]">
                                <tr className="text-left ">
                                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                        Name
                                    </th>

                                    <th className="px-0 py-3 text-xs font-bold tracking-wider text-center text-white w-28">
                                        Edit
                                    </th>
                                    <th className="px-0 py-3 text-xs font-bold tracking-wider text-center text-white w-28">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {subCategories?.map((subCategory, index) => (
                                    <tr
                                        key={subCategory?._id}
                                        className={
                                            index % 2 === 0
                                                ? ''
                                                : 'bg-[#F0F0F0]'
                                        }
                                    >
                                        <td className="py-2 px-4">
                                            {subCategory?.name}
                                        </td>

                                        <td
                                            className="py-2 text-center hover:bg-blue-600"
                                            onClick={() =>
                                                handleOpenEditPopup(
                                                    subCategory?._id,
                                                    subCategory?.name,
                                                )
                                            }
                                        >
                                            <img
                                                src={edit}
                                                alt=""
                                                className="w-10 h-7 mx-auto"
                                            />
                                        </td>
                                        <td
                                            className="py-2 text-center hover:bg-red-500"
                                            onClick={() =>
                                                handleDeleteSubCategory(
                                                    subCategory._id,
                                                )
                                            }
                                        >
                                            <img
                                                src={delete1}
                                                alt=""
                                                className="w-10 h-7 mx-auto"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
export default SubCategory;

//array of all category : res.data
// const totalCategory = res.data.length;
// const startIndex = (page - 1) * limit;
// const endIndex = startIndex + limit;
// const paginateCategory = res.data.slice(startIndex, endIndex);
// setTotalPages(Math.ceil(totalCategory / limit));
// setLoading(false);

/* <div className="flex justify-between items-center mt-5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 ml-10 mb-8 mt-6 bg-gray-600 rounded disabled:opacity-50 "
              >
                Previous
              </button>
              <span className="text-black">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mr-10 mb-8 mt-6 bg-gray-600 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div> */
