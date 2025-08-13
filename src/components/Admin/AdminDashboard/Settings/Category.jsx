import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import formData from FormData();
import delete1 from '../../../../Assets/delete.svg';
import edit from '../../../../Assets/edit.svg';
import { API_URL, IMAGE_URL } from '../../../../Constants';

const Category = () => {
    // console.log("API_URL: ", API_URL);
    const token = localStorage.getItem('admin-token');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [duplicateCategory, setDuplicateCategory] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);

    //IDEA: Fetching category list
    const fetchCategory = async () => {
        setLoading(true);
        try {
            const data = {
                limit: 100,
                page: 1,
            };
            const response = await axios.post(`${API_URL}/category/list`, data);
            // //console.log("Request: ", response.data.data);

            const category = response.data.data.category;

            if (category.length) {
                // //console.log("Category: ", category);
                setCategories(category);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            //console.log('error: ', error);
        }
    };
    useEffect(() => {
        fetchCategory();
    }, []);

    //IDEA: navigate to sub category
    const handleSubCategory = (categoryId, categoryName) => {
        navigate(`sub-category/${categoryId}`, { state: { categoryName } });
    };

    //IDEA: Delete category
    const deleteCategory = async (categoryId) => {
        try {
            const response = await axios.post(
                `${API_URL}/category/delete`,
                { categoryId: categoryId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setCategories((prevCategories) =>
                prevCategories.filter(
                    (category) => categoryId !== category._id,
                ),
            );
            // //console.log("response: ", response);
        } catch (error) {
            //console.log('Error: ', error);
        }
    };

    //IDEA: Edit category
    const handleCloseEditPopup = () => {
        setShowEditPopup(false);
        setSelectedFile(null);
    };

    const handleOpenEditPopup = (categoryId, categoryName) => {
        setEditCategoryId(categoryId);
        setShowEditPopup(true);
        setCategoryName(categoryName);
        // setDuplicateCategory(false);
    };
    const handleEditCategory = async () => {
        try {
            const formData = new FormData();
            formData.append('categoryId', editCategoryId);
            formData.append('name', categoryName);
            if (selectedFile !== null) {
                formData.append('image', selectedFile);
            }
            const response = await axios.post(
                `${API_URL}/category/add`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category._id === editCategoryId
                        ? {
                            ...category,
                            name: response.data.data.name || categoryName,
                            image: response.data.data.image || selectedFile,
                        }
                        : category,
                ),
            );
            // //console.log("response: ", response);
            setShowEditPopup(false);
        } catch (error) {
            //console.log('Error: ', error);
        }
        setSelectedFile(null);
    };
    const setUpdateOnEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    const setEditOnEnter = (e) => {
        if (e.key === 'Enter') {
            handleEditCategory();
        }
    };

    //IDEA: Add category
    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedFile(null);
    };
    const handleOpenPopup = () => {
        setShowPopup(true);
        setCategoryName('');
        setDuplicateCategory(false);
    };
    const handleInputChange = (e) => {
        setCategoryName(e.target.value);
    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', categoryName);
            if (selectedFile !== null) {
                formData.append('image', selectedFile);
            }
            // //console.log('name: ', categoryName);

            const response = await axios.post(
                `${API_URL}/category/add`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    maxBodyLength: Infinity,
                },
            );
            //console.log('Add categiory response: ', response.data.data);

            const addedCategory = response.data.data;
            if (addedCategory) {
                // //console.log("Added Category: ", addedCategory);
                setCategories((prevCategories) => [
                    ...prevCategories,
                    addedCategory,
                ]);
                setLoading(false);
                setDuplicateCategory(false);
                setShowPopup(false);
            } else {
                setLoading(false);
                setDuplicateCategory(true);
                setTimeout(() => {
                    setDuplicateCategory(false);
                }, 400);
            }
        } catch (error) {
            //console.log('error: ', error.message);
        }
        setSelectedFile(null);
    };

    return (
        <div className="ml-[20rem] p-3 pl-6 pr-3 font-custom bg-[#F0F0F0] min-h-svh">
            <div className="flex justify-between mb-8 mt-2">
                <h2 className="text-2xl font-medium mb-0">All Category</h2>
                <button
                    className="bg-[#A70024] text-white px-4 py-2 rounded-lg hover:bg-red-800"
                    onClick={handleOpenPopup}
                >
                    Add Category
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
                            value={categoryName}
                            onChange={handleInputChange}
                            onKeyDown={(e) => setEditOnEnter(e)}
                            placeholder="Enter Category"
                            className="border border-gray-500 p-2 rounded-md w-full mb-1 text-gray-800 bg-gray-200 outline-none"
                        />
                        <div className="flex">
                            {selectedFile &&
                                selectedFile.type.startsWith('image/') && (
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Preview"
                                        className="mt-2"
                                        style={{
                                            maxWidth: '100px',
                                            maxHeight: '100px',
                                        }}
                                    />
                                )}
                            <label
                                htmlFor="profile-picture"
                                className="cursor-pointer px-3 py-2 focus:outline-none mt-3 ml-3 text-blue-600"
                            >
                                Upload Image
                            </label>
                            <input
                                id="profile-picture"
                                name="profile-picture"
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={handleEditCategory}
                                disabled={!categoryName.trim()}
                                className={`px-5 py-2 rounded-md mr-2 text-white ${!categoryName.trim()
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
                            Add Category
                        </h2>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={handleInputChange}
                            onKeyDown={(e) => setUpdateOnEnter(e)}
                            placeholder="Enter Category"
                            className="border border-gray-500 p-2 rounded-md w-full mb-1 text-gray-800 bg-gray-200 outline-none"
                        />
                        <div className="flex">
                            {selectedFile &&
                                selectedFile.type.startsWith('image/') && (
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Preview"
                                        className="mt-2"
                                        style={{
                                            maxWidth: '100px',
                                            maxHeight: '100px',
                                        }}
                                    />
                                )}
                            <label
                                htmlFor="profile-picture"
                                className="cursor-pointer px-3 py-2 focus:outline-none mt-3 text-blue-600"
                            >
                                Upload Image
                            </label>
                            <input
                                id="profile-picture"
                                name="profile-picture"
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                        <div className="h-6 flex items-center">
                            {duplicateCategory && (
                                <div className="text-red-500">
                                    Category already exists.
                                </div>
                            )}
                        </div>
                        <div className="mt-0 flex justify-between">
                            <button
                                onClick={handleSubmit}
                                disabled={!categoryName.trim()}
                                className={`px-5 py-2 rounded-md mr-2 text-white ${!categoryName.trim()
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

            <div className="w-full rounded-lg">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="overflow-x-auto rounded-lg shadow">
                        <table className="min-w-full bg-white rounded-lg">
                            <thead className="bg-[#5C5C5C]">
                                <tr className="text-left ">
                                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-white">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-center text-white border-b w-96">
                                        Image
                                    </th>
                                    <th className="px-0 py-3 text-xs font-bold tracking-wider text-center text-white">
                                        Edit
                                    </th>
                                    <th className="px-0 py-3 text-xs font-bold tracking-wider text-center text-white">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories?.map((category, index) => (
                                    <tr
                                        key={category?._id}
                                        className={
                                            index % 2 === 0
                                                ? 'cursor-pointer'
                                                : 'bg-[#F0F0F0] cursor-pointer'
                                        }
                                    >
                                        <td
                                            className="py-2 px-4"
                                            onClick={() =>
                                                handleSubCategory(
                                                    category?._id,
                                                    category?.name,
                                                )
                                            }
                                        >
                                            {category?.name}
                                        </td>
                                        <td
                                            className="py-2 text-center"
                                            onClick={() =>
                                                handleSubCategory(
                                                    category?._id,
                                                    category?.name,
                                                )
                                            }
                                        >
                                            <div className="flex justify-center lg:justify-center ">
                                                <img
                                                    src={`${IMAGE_URL}${category?.image}`}
                                                    // src={category?.image}
                                                    className="w-10 h-10 mx-auto lg:mx-auto rounded-md mb-0"
                                                    alt=""
                                                />
                                            </div>
                                        </td>
                                        <td
                                            className="py-2 text-center hover:bg-blue-600"
                                            onClick={() =>
                                                handleOpenEditPopup(
                                                    category?._id,
                                                    category?.name,
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
                                                deleteCategory(category?._id)
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

export default Category;
