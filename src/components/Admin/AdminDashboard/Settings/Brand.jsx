import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import formData from FormData();
import delete1 from '../../../../Assets/delete.svg';
import edit from '../../../../Assets/edit.svg';
import { API_URL, IMAGE_URL } from '../../../../Constants';
import chroma from 'chroma-js';
import Pagination from '../../../Pagination/Pagination';

const Brand = () => {
    const token = localStorage.getItem('admin-token');
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const [brandName, setBrandName] = useState('');
    const [duplicateCategory, setDuplicateCategory] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const [showEditPopup, setShowEditPopup] = useState(false);
    const [editBrandId, setEditBrandId] = useState(null);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    // const [selectedSubCategories, setSelectedSubCategories] = useState();

    const [subCategories, setSubCategories] = useState([]);
    // const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);

    const [showlistPopup, setShowlistPopup] = useState(true);

    //IDEA: Fetching category list
    const fetchBrand = async () => {
        setLoading(true);
        try {
            const data = {
                limit: 100,
                page: 1,
            };
            const response = await axios.post(`${API_URL}/brand/list`, data);
            // //console.log("Request: ", response.data.data);

            const brand = response.data.data.brands;

            if (brand.length) {
                //console.log('Category: ', brand);
                setBrands(brand);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            //console.log('error: ', error);
        }
    };
    useEffect(() => {
        fetchBrand();
    }, []);

    //IDEA: fetch category list
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = {
                    limit: 100,
                    page: 1,
                };
                const response = await axios.post(
                    `${API_URL}/category/list`,
                    data,
                );
                // //console.log("Request: ", response.data.data);

                const category = response.data.data.category;

                if (category.length) {
                    // //console.log("Category: ", category);
                    setCategories(category);
                }
            } catch (error) {
                //console.log('error: ', error);
            }
        };

        fetchCategory();
        // if (showPopup || showEditPopup) {
        // }
    }, [showPopup, showEditPopup]);

    useEffect(() => {
        const fetchSubCategory = async () => {
            try {
                const data = {
                    limit: 100,
                    page: 1,
                    categoryId: selectedCategory,
                };
                // //console.log('data: ', data);
                const response = await axios.post(
                    `${API_URL}/subCategory/list`,
                    data,
                );
                //console.log('Request: ', response);

                const subCategory = response.data.data.subCategory;

                // const category = subCategory[0]?.categoryName;
                // setCategoryName(category);
                setSubCategories(subCategory);
                // if (subCategory.length) {
                // //console.log("Sub-Category: ", subCategory);
                // setLoading(false);
                // }
            } catch (error) {
                //console.log('error: ', error);
            }
        };
        fetchSubCategory();
    }, [selectedCategory]);

    // const handleCheckboxChange1 = (event, subCategoryId) => {
    //     if (event.target.checked) {
    //         // Add the selected subcategory
    //         setSelectedSubCategories([...selectedSubCategories, subCategoryId]);
    //     } else {
    //         // Remove the unselected subcategory
    //         setSelectedSubCategories(
    //             selectedSubCategories.filter((id) => id !== subCategoryId),
    //         );
    //     }
    // };
    const handleCheckboxChange1 = (event, subCategory) => {
        if (event.target.checked) {
            // Add the entire subcategory object if not already present
            setSelectedSubCategories((prevSelected) => [
                ...prevSelected,
                subCategory,
            ]);
        } else {
            // Remove the subcategory object based on matching `_id`
            setSelectedSubCategories((prevSelected) =>
                prevSelected.filter((item) => item._id !== subCategory._id),
            );
        }
    };

    //IDEA: navigate to sub category
    // const handleSubCategory = (categoryId, categoryName) => {
    //     navigate(`sub-category/${categoryId}`, { state: { categoryName } });
    // };

    //IDEA: Delete Brand
    const deleteBrand = async (brandId) => {
        try {
            const response = await axios.post(
                `${API_URL}/brand/delete`,
                { brandId: brandId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setBrands((prevBrands) =>
                prevBrands.filter((brand) => brandId !== brand._id),
            );
            //console.log('response in delete brand: ', response);
        } catch (error) {
            //console.log('Error: ', error);
        }
    };

    //IDEA: Edit category
    const handleCloseEditPopup = () => {
        setShowEditPopup(false);
        setSelectedFile(null);
        setShowlistPopup(true);
    };

    const handleOpenEditPopup = (
        brandId,
        brandName,
        categoryId,
        subCategories,
        colors,
        brandImage,
    ) => {
        setEditBrandId(brandId);
        setShowEditPopup(true);
        setBrandName(brandName);
        setShowlistPopup(false);
        //console.log(colors, '::::', subCategories);
        setSelectedCategory(categoryId);
        setSelectedSubCategories(subCategories);
        setShowingColors(colors.map((color) => color.hexCode));
        setSelectedColors(colors.map((color) => color._id));

        const transformedColors = colors.map((color) => ({
            value: color._id, // _id as value
            color: color.hexCode,
            label: color.name,
            ncsCode: color.ncsCode, // ncsCode as name
        }));

        setSelectedColorObjects(transformedColors);
        setSelectedFile(brandImage);
        // //console.log('++++', selectedCategory);
        // //console.log(categoryName);
        // setDuplicateCategory(false);
    };
    const handleEditBrand = async () => {
        setLoading(true);
        const colorValue = selectedColorObjects.map((color) => color.value);
        const formattedSubCategories = JSON.stringify(selectedSubCategories);
        const formattedColorValue = JSON.stringify(colorValue);
        try {
            const formData = new FormData();
            formData.append('brandId', editBrandId);
            formData.append('name', brandName);
            formData.append('category', selectedCategory);
            formData.append('subCategories', formattedSubCategories);
            formData.append('colors', formattedColorValue);
            if (selectedFile !== null) {
                formData.append('image', selectedFile);
            }
            //console.log('brand Id: ', editBrandId);
            //console.log('brandName: ', brandName);
            //console.log('category: ', selectedCategory);
            //console.log('selectedSubCategories: ', formattedSubCategories);
            //console.log('selectedColorObjects: ', formattedColorValue);
            // //console.log('selectedFile: ', selectedFile);

            const response = await axios.post(
                `${API_URL}/brand/add`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            //console.log('edit response: ', response);
            // setBrands((prevCategories) =>
            //     prevCategories.map((category) =>
            //         category._id === editBrandId
            //             ? {
            //                   ...category,
            //                   name: response.data.data.name || brandName,
            //                   image: response.data.data.image || selectedFile,
            //               }
            //             : category,
            //     ),
            // );
            setShowEditPopup(false);
        } catch (error) {
            //console.log('Error: ', error);
        }
        setLoading(true);
        setSelectedFile(null);
        fetchBrand();
        setShowlistPopup(true);
        setShowPopup(false);
        setSelectedCategory(null);
        setSelectedSubCategories([]);
        setSelectedColorObjects([]);
    };
    const setUpdateOnEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    const setEditOnEnter = (e) => {
        if (e.key === 'Enter') {
            handleEditBrand();
        }
    };

    //IDEA: Add Brand
    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedFile(null);
        setSelectedCategory(null);
        setSelectedSubCategories([]);
        setShowlistPopup(true);
    };
    const handleOpenPopup = () => {
        setShowPopup(true);
        setBrandName('');
        setSelectedFile(null);
        setSelectedCategory(null);
        setSelectedSubCategories([]);
        setSelectedColorObjects([]);
        setDuplicateCategory(false);
        setShowlistPopup(false);
    };
    const handleInputChange = (e) => {
        setBrandName(e.target.value);
    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleSubmit = async () => {
        setLoading(true);

        const colorValue = selectedColorObjects.map((color) => color.value);
        const formattedSubCategories = JSON.stringify(selectedSubCategories);
        const formattedColorValue = JSON.stringify(colorValue);
        try {
            const formData = new FormData();
            formData.append('name', brandName);
            formData.append('category', selectedCategory);
            formData.append('subCategories', formattedSubCategories);
            formData.append('colors', formattedColorValue);
            // if (selectedSubCategories.length > 0) {
            // }
            // if (colorValue.length > 0) {
            // }
            if (selectedFile !== null) {
                formData.append('image', selectedFile);
            }
            //console.log('brandName: ', brandName);
            //console.log('name: ', selectedCategory);
            //console.log('selectedSubCategories: ', formattedSubCategories);
            //console.log('selectedColorObjects: ', colorValue);
            //console.log('selectedFile: ', selectedFile);
            //console.log('name::: ', brandName);

            const response = await axios.post(
                `${API_URL}/brand/add`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    // maxBodyLength: Infinity,
                },
            );
            //console.log('Add brand response: ', response);

            const addedBrand = response.data.data;
            if (addedBrand) {
                // //console.log("Added Category: ", addedCategory);
                // setBrands((prevCategories) => [...prevCategories, addedBrand]);
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
        fetchBrand();
        setShowlistPopup(true);
        setShowPopup(false);
        setSelectedCategory(null);
        setSelectedSubCategories([]);
        setSelectedColorObjects([]);
    };

    //IDEA: colors selection logic/code

    const [displayColors, setDisplayColors] = useState([]);
    const [colorss, setColorss] = useState([]);
    const [allColors, setAllColors] = useState([]);
    const [allFilteredColors, setAllFilteredColors] = useState([]);
    const [showingColors, setShowingColors] = useState([]);
    const [selectedColorObjects, setSelectedColorObjects] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [currentColorPage, setCurrentColorPage] = useState(1);
    const [pageNumberForColors, setPageNumberForColors] = useState(null);
    const [filteredColors, setFilteredColors] = useState([]);
    const [colorPopupLoading, setColorPopupLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [colourOptions, setColourOptions] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [clearSelectedPopUp, setClearSelectedPopUp] = useState(false);
    useEffect(() => {
        const fetchAllColors = async () => {
            try {
                const headers = {
                    Authorization: localStorage.getItem('admin-token'),
                };

                let reqOptions = {
                    url: `${API_URL}/admin/colorList`,
                    method: 'POST',
                    headers: headers,
                    data: {
                        page: 1,
                        limit: 2000,
                    },
                };

                const response = await axios.request(reqOptions);
                // //console.log("all colors are fetched", response);

                const colorData = response.data.data.products.map((color) => ({
                    value: color._id,
                    label: color.name, // Name of the color
                    color: color.hexCode,
                    ncsCode: color.ncsCode, // The hex color code
                }));

                setAllColors(colorData);
                setAllFilteredColors(colorData);
                // //console.log("colorData", colorData);

                // setFilteredColors(response.data.data); // Initially, show all colors
            } catch (error) {
                //console.log('error', error);
            }
        };

        fetchAllColors();
    }, []);

    const [fetchColorsLoading, setFetchColorsLoading] = useState(false);
    const fetchColorData = async (currentColorPage, limit) => {
        setFetchColorsLoading(true);
        try {
            const headers = {
                Authorization: localStorage.getItem('admin-token'),
            };

            let reqOptions = {
                url: `${API_URL}/admin/colorList`,
                method: 'POST',
                headers: headers,
                data: {
                    page: currentColorPage,
                    limit: limit,
                },
            };

            const response = await axios.request(reqOptions);
            // //console.log(response);

            const colorData = response.data.data.products.map((color) => ({
                value: color._id, // Store the color's ID
                label: color.name, // Name of the color
                color: color.hexCode,
                ncsCode: color.ncsCode, // The hex color code
            }));

            setColorss(response.data.data);
            // //console.log("ccolor-data",colorData);
            setFilteredColors(colorData);
            setColourOptions(colorData);
            setFetchColorsLoading(false);
        } catch (error) {
            console.error('Error fetching color data:', error);
            setFetchColorsLoading(false);
        }
    };
    //  //console.log(colourOptions)

    useEffect(() => {
        fetchColorData(currentColorPage, 10);
    }, [currentColorPage]);

    useEffect(() => {
        const displayData = isSearching
            ? paginatedSearchResults
            : filteredColors;
        setDisplayColors(displayData);
    }, [isSearching, fetchColorData, currentColorPage]);

    const togglePopup = (e) => {
        setColorPopupLoading(true);
        e.preventDefault();
        setIsOpen(!isOpen);

        // if (!isOpen) {
        //     // only reset if opening the popup
        //     setSelectedColors([]); // Clear selected colors
        //     setShowingColors([]); // Clear showing colors
        //     setSelectedColorObjects([]); // Clear selected color objects
        //     // setClearSelectedPopUp(true); // Set any other necessary flags here
        // }

        setColorPopupLoading(false);
    };

    const handelCandle = (e) => {
        e.preventDefault();
        setSelectedColors([]);
        setShowingColors([]);
        setIsOpen(false);
        // setFieldValue('colour', []);
        setSelectedColorObjects([]);
        setClearSelectedPopUp(false);
    };
    // //console.log(colorss);
    // const filteredColors = colourOptions.filter((color) =>
    //   color?.name?.toLowerCase().includes(search.toLowerCase())
    // );

    const [currentSearchPage, setCurrentSearchPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate the items to display for the current search page
    const paginatedSearchResults = useMemo(() => {
        const start = (currentSearchPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return allFilteredColors?.slice(start, end);
    }, [currentSearchPage, allFilteredColors]);

    const handleSearchPageChange = (pageNumber) => {
        setCurrentSearchPage(pageNumber);
    };

    const handleSearchColors = (e) => {
        const query = e.target.value;
        setSearch(query);
        // setIsSearching(true);
        setIsSearching(true);
        if (query.trim() === '') {
            // If the search query is empty, show all products
            setFilteredColors(colourOptions);
            setIsSearching(false);
        } else {
            // Otherwise, filter the products based on the query
            // setAllColors(colorData);
            // setAllFilteredColors(colorData);
            setAllFilteredColors(
                allColors.filter(
                    (color) =>
                        color.value
                            .toLowerCase()
                            .includes(query.toLowerCase()) ||
                        color.label
                            .toLowerCase()
                            .includes(query.toLowerCase()) ||
                        color.color
                            .toLowerCase()
                            .includes(query.toLowerCase()) ||
                        color.ncsCode
                            .toLowerCase()
                            .includes(query.toLowerCase()),
                ),
            );
        }
        // setIsSearching(false);
    };

    // //console.log("isSearching is --", isSearching);
    // //console.log("paginated data", paginatedSearchResults);
    // //console.log("display colors -----", displayColors);

    // const handleCheckboxChange = (colorObj) => {
    //   const { value, color } = colorObj;

    //   // Check if the color is already selected
    //   const isColorSelected = selectedColorObjects?.some(
    //     (colorItem) => colorItem.value === value
    //   );

    //   if (isColorSelected) {
    //     // Remove the color from selectedColorObjects
    //     setSelectedColorObjects((prevColors) =>
    //       prevColors.filter((colorItem) => colorItem.value !== value)
    //     );

    //     // Update showingColors and selectedColors
    //     setShowingColors((prevShowing) =>
    //       prevShowing.filter((code) => code !== color)
    //     );

    //     setSelectedColors((prevSelected) => {
    //       const updatedSelected = prevSelected.filter((id) => id !== value);
    //       setFieldValue("colour", updatedSelected); // Use the updated array
    //       return updatedSelected;
    //     });
    //   } else {
    //     // Add the color to selectedColorObjects
    //     setSelectedColorObjects((prevColors) => [...prevColors, colorObj]);
    //     setShowingColors((prevShowing) => [...prevShowing, color]);

    //     // Use the callback form to ensure you work with the updated array
    //     setSelectedColors((prevSelected) => {
    //       const updatedSelected = [...prevSelected, value];
    //       setFieldValue("colour", updatedSelected); // Use the updated array
    //       return updatedSelected;
    //     });
    //   }
    // };

    // const handleCheckboxChange = (colorObj) => {
    //     // console.error("colorObj: ", colorObj);
    //     const { value, color } = colorObj;

    //     // Check if the color is already selected
    //     const isColorSelected = selectedColorObjects?.some(
    //         (color) => color.value === value,
    //     );

    //     if (isColorSelected) {
    //         // Remove the color from selectedColorObjects
    //         setSelectedColorObjects((prevColors) =>
    //             prevColors.filter((color) => color.value !== value),
    //         );
    //         setShowingColors((prevShowing) =>
    //             prevShowing.filter((code) => code !== color),
    //         );
    //         setSelectedColors((prevSelected) =>
    //             prevSelected.filter((id) => id !== value),
    //         );
    //         // setFieldValue(
    //         //     'colour',
    //         //     selectedColors.filter((id) => id !== value),
    //         // );
    //         console.error('Selected Colours', selectedColors);
    //     } else {
    //         // Add the color to selectedColorObjects
    //         setSelectedColorObjects((prevColors) => [...prevColors, colorObj]);
    //         setShowingColors((prevShowing) => [...prevShowing, color]);
    //         setSelectedColors((prevSelected) => [...prevSelected, value]);
    //         // setFieldValue('colour', [...selectedColors, value]);
    //     }
    // };
    const handleCheckboxChange = (colorObj) => {
        // console.error("colorObj: ", colorObj);
        const { value, color } = colorObj;

        // Check if the color is already selected
        const isColorSelected = selectedColorObjects?.some(
            (color) => color.value === value,
        );

        //console.log('+++++Selected Colours0000', selectedColors);
        if (isColorSelected) {
            // Remove the color from selectedColorObjects
            setSelectedColorObjects((prevColors) =>
                prevColors.filter((color) => color.value !== value),
            );
            setShowingColors((prevShowing) =>
                prevShowing.filter((code) => code !== color),
            );
            setSelectedColors((prevSelected) =>
                prevSelected.filter((id) => id !== value),
            );
            // setFieldValue(
            //     'colour',
            //     selectedColors.filter((id) => id !== value),
            // );
            //console.log('+++++Selected Colours', selectedColors);
        } else {
            // Add the color to selectedColorObjects
            setSelectedColorObjects((prevColors) => [...prevColors, colorObj]);
            setShowingColors((prevShowing) => [...prevShowing, color]);
            setSelectedColors((prevSelected) => [...prevSelected, value]);
            // setFieldValue('colour', [...selectedColors, value]);
        }
    };

    // const handleCheckboxChange = (colorId, hexCode) => {
    //   if (selectedColors.includes(colorId) && showingColors.includes(hexCode)) {
    //     setShowingColors(showingColors.filter((value) => value !== hexCode));
    //     setSelectedColors(selectedColors.filter((value) => value !== colorId));
    //     setFieldValue(
    //       "colour",
    //       selectedColors.filter((value) => value !== colorId)
    //     );
    //   } else {
    //     setSelectedColors([...selectedColors, colorId]);
    //     setShowingColors([...showingColors, hexCode]);
    //     setFieldValue("colour", [...selectedColors, colorId]);
    //   }
    // };

    const removeSelectedColors = (colorObj) => {
        const { value, color } = colorObj;

        // Remove the color object from selectedColorObjects
        setSelectedColorObjects((prevColors) =>
            prevColors.filter((colorItem) => colorItem.value !== value),
        );

        // Remove from the showingColors array (based on color hex code)
        setShowingColors((prevShowing) =>
            prevShowing.filter((hexCode) => hexCode !== color),
        );

        // Remove from the selectedColors array (based on value)
        setSelectedColors((prevSelected) =>
            prevSelected.filter((id) => id !== value),
        );

        // Update Formik field value for "colour"
        // setFieldValue(
        //     'colour',
        //     selectedColors.filter((id) => id !== value),
        // );
    };
    const removeShowingColors = (hexCode) => {
        setSelectedColorObjects((prevColors) =>
            prevColors.filter(
                (colorItem) =>
                    chroma(colorItem.color).hex() !== chroma(hexCode).hex(),
            ),
        );

        setShowingColors((prevShowing) =>
            prevShowing.filter((color) => color !== hexCode),
        );

        setSelectedColors((prevSelected) =>
            prevSelected.filter((color) => color !== hexCode),
        );
        //console.log('selectedColors: ', selectedColors);

        // setFieldValue(
        //     'colour',
        //     selectedColors.filter((color) => color !== hexCode),
        // );
    };

    // //console.log("selected colors hexCode", showingColors);
    // const handleCheckboxChange = (color) => {
    //   if (selectedColors.some((selected) => selected.id === color.id)) {
    //     // Remove the color object if it is already selected
    //     setSelectedColors(selectedColors.filter((selected) => selected.id !== color.id));
    //   } else {
    //     // Add the color object to the selected colors
    //     setSelectedColors([...selectedColors, color]);
    //   }
    // };
    // //console.log('form-values after adding new dealer',values)
    // //console.log("selected Colors IDs ", selectedColors);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            // Get selected color IDs and color codes from the current page
            const newSelectedColorIds = filteredColors.map(
                (color) => color.value,
            );
            const newShowingColors = filteredColors.map((color) => color.color);

            // Merge new selected colors with previously selected colors
            setSelectedColors((prevSelectedColors) => {
                const updatedSelectedColors = [
                    ...new Set([...prevSelectedColors, ...newSelectedColorIds]),
                ];
                return updatedSelectedColors;
            });

            setShowingColors((prevShowingColors) => {
                const updatedShowingColors = [
                    ...new Set([...prevShowingColors, ...newShowingColors]),
                ];
                return updatedShowingColors;
            });
        } else {
            // If deselecting, remove the colors from the current page only
            const currentPageColorIds = displayColors.map(
                (color) => color.value,
            );

            setSelectedColors((prevSelectedColors) =>
                prevSelectedColors.filter(
                    (id) => !currentPageColorIds.includes(id),
                ),
            );

            setShowingColors((prevShowingColors) =>
                prevShowingColors.filter(
                    (color) =>
                        !filteredColors.some((item) => item.color === color),
                ),
            );
        }
    };

    /////////////rect-select///////////////////////////
    const handleColorChange = (selectedOptions) => {
        setSelectedColors(selectedOptions); // Store the selected options
        const selectedColorIds = selectedOptions.map((option) => option.value); // Extract the selected IDs
        // //console.log("Selected Color IDs:", selectedColorIds); // Log or use these IDs as needed
    };

    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const hex = data.color;
            const color = chroma(hex);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                    ? data.color
                    : isFocused
                    ? color.alpha(1).css()
                    : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                    ? chroma.contrast(color, 'white') > 2
                        ? 'white'
                        : 'black'
                    : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',
                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(1).css()
                        : undefined,
                },
            };
        },
        multiValue: (styles, { data }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: color.alpha(1).css(),
            };
        },
        multiValueLabel: (styles, { data }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                color: color.alpha(1).css(),
            };
        },
        multiValueRemove: (styles, { data }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                color: color.alpha(1).css(),
                ':hover': {
                    backgroundColor: color.alpha(1).css(),
                    color: 'white',
                },
            };
        },
    };
    ///////////////setting---colorr--list--end/////////////////////////////////////

    const handlePageChangeForColors = async (pageNumber) => {
        setCurrentColorPage(pageNumber);
        await fetchColorData(pageNumber);
    };

    return (
        <div className="ml-[20rem] p-3 pl-6 pr-3 font-custom bg-[#F0F0F0] min-h-svh">
            {showlistPopup && (
                <div>
                    <div className="flex justify-between mb-8 mt-2">
                        <h2 className="text-2xl font-medium mb-0">
                            All Brands
                        </h2>
                        <button
                            className="bg-[#A70024] text-white px-4 py-2 rounded-lg hover:bg-red-800"
                            onClick={handleOpenPopup}
                        >
                            Add Brand
                        </button>
                    </div>
                    <div className="w-full rounded-lg">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="overflow-x-auto rounded-lg shadow">
                                <table className="min-w-full bg-white rounded-lg">
                                    <thead className="bg-[#5C5C5C]">
                                        <tr className="text-left ">
                                            <th className="px-2 py-3 text-xs font-bold tracking-wider text-left text-white">
                                                Name
                                            </th>
                                            <th className="px-0 py-3 text-xs font-bold tracking-wider text-center text-white border-b w-40">
                                                Image
                                            </th>
                                            <th className="px-0 py-3 text-xs font-bold tracking-wider text-center text-white">
                                                Category
                                            </th>
                                            <th className="px-0 py-3 text-xs font-bold tracking-wider text-center text-white">
                                                Sub-Category
                                            </th>
                                            <th className="px-0 py-3 text-xs font-bold tracking-wider text-center text-white">
                                                Colors
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
                                        {brands?.map((brand, index) => (
                                            <tr
                                                key={brand?._id}
                                                className={
                                                    index % 2 === 0
                                                        ? ''
                                                        : 'bg-[#F0F0F0]'
                                                }
                                            >
                                                <td
                                                    className="py-2 px-4"
                                                    // onClick={() =>
                                                    //     handleSubCategory(
                                                    //         brand?._id,
                                                    //         brand?.name,
                                                    //     )
                                                    // }
                                                >
                                                    {brand?.name}
                                                </td>
                                                <td
                                                    className="py-2 text-center"
                                                    // onClick={() =>
                                                    //     handleSubCategory(
                                                    //         brand?._id,
                                                    //         brand?.name,
                                                    //     )
                                                    // }
                                                >
                                                    <div className="flex justify-center lg:justify-center ">
                                                        <img
                                                            src={`${IMAGE_URL}${brand?.image}`}
                                                            // src={category?.image}
                                                            className="w-10 h-10 mx-auto lg:mx-auto rounded-md mb-0"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>
                                                <td className="py-2 px- text-center">
                                                    {brand?.category}
                                                </td>
                                                <td className="py-2 px-4 text-center">
                                                    <ul>
                                                        {brand?.subCategories
                                                            .slice(0, 2)
                                                            .map(
                                                                (
                                                                    subCat,
                                                                    index,
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            subCat?.name
                                                                        }
                                                                    </li>
                                                                ),
                                                            )}
                                                        {brand?.subCategories
                                                            .length > 2 && (
                                                            <li>...</li>
                                                        )}
                                                    </ul>
                                                </td>
                                                <td className="py-2 px-4 text-center">
                                                    <ul>
                                                        {brand?.colors
                                                            .slice(0, 2)
                                                            .map(
                                                                (
                                                                    color,
                                                                    index,
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            color?.hexCode
                                                                        }
                                                                    </li>
                                                                ),
                                                            )}
                                                        {brand?.colors.length >
                                                            2 && <li>...</li>}
                                                    </ul>
                                                </td>
                                                <td
                                                    className="py-2 text-center hover:bg-blue-600"
                                                    onClick={() =>
                                                        handleOpenEditPopup(
                                                            brand?._id,
                                                            brand?.name,
                                                            brand?.categoryId,
                                                            brand?.subCategories,
                                                            brand?.colors,
                                                            brand?.image,
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
                                                        deleteBrand(brand?._id)
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
            )}

            {/* //IDEA:Color selection */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-custom ">
                    <div className="relative w-11/12 h-screen max-w-4xl p-6 mt-4 overflow-y-auto bg-white rounded-lg shadow-lg">
                        {/* Popup header with close button */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-600 font-custom">
                                Select Colours
                            </h2>
                            <button
                                onClick={(e) => togglePopup(e)}
                                className="absolute text-lg text-gray-600 top-4 right-4 "
                            >
                                &times;
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="flex justify-between gap-4">
                            <input
                                type="text"
                                // placeholder="Search for Colours...   By ColourName , HexCode , NcsCode ..."
                                placeholder="Search"
                                className="w-full p-2 px-4 mb-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                                value={search}
                                onChange={handleSearchColors}
                            />
                            {/* Action buttons */}
                            <div className="flex h-10">
                                <button
                                    onClick={(e) => togglePopup(e)}
                                    // className="px-4 py-2 mr-2 text-white bg-gray-400 rounded-full hover:bg-gray-500"
                                    className="px-4 py-2 mr-2 text-red-700 rounded-md hover:text-red-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={(e) => togglePopup(e)}
                                    className="px-4 py-2 text-white bg-blue-900 rounded-md font-custom hover:bg-blue-900"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                        {/************showing-colors********************/}
                        {!fetchColorsLoading ? (
                            <div className="mb-4">
                                {selectedColors.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedColorObjects.map((color) => (
                                            <div className="flex flex-col w-32 h-32 bg-gray-100 rounded shadow ">
                                                <div
                                                    key={color.value}
                                                    className="relative flex flex-row w-full h-full "
                                                    style={{
                                                        backgroundColor: chroma(
                                                            color.color,
                                                        )
                                                            .alpha(1)
                                                            .css(),
                                                    }}
                                                >
                                                    {/* <div
                          className="w-10 h-6"
                          style={{
                            backgroundColor: chroma(color).alpha(1).css(),
                          }}
                        ></div> */}
                                                    <button
                                                        className="absolute top-0 text-white cursor-pointer right-1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            removeSelectedColors(
                                                                color,
                                                            );
                                                        }}
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                                <div className="mt-1 text-center text-zinc-400">
                                                    {color.color}
                                                </div>
                                                <div className="text-center text-zinc-400">
                                                    {color.ncsCode}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                {/* <div className=""><Loader1/></div> */}
                                <p className="w-full mb-2 text-lg text-center text-zinc-400 font-custom">
                                    loading...
                                </p>
                            </>
                        )}
                        {/* Color Table */}
                        <table className="w-full table-auto font-custom">
                            <thead>
                                <tr className="bg-[#5C5C5C] text-left text-white">
                                    <th className="p-2">
                                        {/* <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        filteredColors.length > 0 &&
                        filteredColors.every((color) =>
                          selectedColors.includes(color.value)
                        )
                      }
                      className="form-checkbox"
                    /> */}
                                    </th>
                                    <th className="p-2 text-base font-semibold text-white">
                                        Color Name
                                    </th>
                                    <th className="p-2 text-base font-semibold text-white">
                                        NCS Code
                                    </th>
                                    <th className="p-2 text-base font-semibold text-white">
                                        Hex
                                    </th>
                                    <th className="p-2 text-base font-semibold text-white">
                                        Colour
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayColors.map((color) => (
                                    <tr
                                        key={color.value}
                                        className={`border-b hover:bg-gray-50 ${
                                            selectedColors.includes(color.value)
                                                ? 'bg-gray-100'
                                                : ''
                                        }`}
                                    >
                                        <td className="p-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedColors.includes(
                                                    color.value,
                                                )}
                                                onChange={() =>
                                                    handleCheckboxChange(color)
                                                }
                                                className="form-checkbox"
                                            />
                                        </td>
                                        <td className="p-2">{color.label}</td>
                                        <td className="p-2">{color.ncsCode}</td>
                                        <td className="p-2">{color.color}</td>
                                        <td className="p-2">
                                            <div
                                                style={{
                                                    backgroundColor: chroma(
                                                        color.color,
                                                    )
                                                        .alpha(1)
                                                        .css(),
                                                }}
                                                className="w-full h-12 rounded-sm"
                                            ></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* <Pagination
              totalProducts={colorss.total}
              productsPerPage={colorss.limit}
              onPageChange={handlePageChangeForColors}
              currentPage={currentColorPage}
            /> */}
                        {isSearching ? (
                            <Pagination
                                currentPage={currentSearchPage}
                                totalProducts={allFilteredColors.length}
                                onPageChange={handleSearchPageChange}
                                productsPerPage={10}
                            />
                        ) : (
                            <Pagination
                                totalProducts={colorss.total}
                                productsPerPage={colorss.limit}
                                onPageChange={handlePageChangeForColors}
                                currentPage={currentColorPage}
                            />
                        )}
                    </div>
                </div>
            )}

            {clearSelectedPopUp && selectedColors.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="max-w-md p-6 mx-2 rounded-lg bg-zinc-200 font-custom ">
                        <h2 className="mb-3 text-xl font-semibold text-center">
                            Are you sure{' '}
                        </h2>
                        <h2 className="mb-3 text-sm text-center">
                            You want to clear colour selection?{' '}
                        </h2>

                        <div className="flex justify-between">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setClearSelectedPopUp(!clearSelectedPopUp);
                                }}
                                className="px-6 py-2 text-black rounded-md cursor-pointer bg-zinc-300 hover:bg-zinc-400"
                            >
                                No
                            </button>
                            <button
                                onClick={(e) => handelCandle(e)}
                                className="px-6 py-2 text-white bg-red-800 rounded-md cursor-pointer hover:bg-red-700"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showEditPopup && (
                <div className="">
                    <div className="">
                        <h2 className="text-xl font-bold mb-4 text-gray-700">
                            Edit Brand
                        </h2>
                        <input
                            type="text"
                            value={brandName}
                            onChange={handleInputChange}
                            onKeyDown={(e) => setEditOnEnter(e)}
                            placeholder="Enter Brand"
                            className="border border-gray-500 p-2 rounded-md w-[60%] mb-5 text-gray-800 bg-gray-200 outline-none"
                        />

                        <select
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                            className="border border-gray-500 p-2 rounded-md w-[60%] mb-3 text-gray-800 bg-gray-200 outline-none"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option
                                    key={category._id}
                                    value={category._id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {/* //IDEA: sub categories code */}
                        <div>
                            <div className="mt-3">
                                <h3 className="text-gray-700 font-semibold mb-3">
                                    Select Subcategories:
                                </h3>
                                {subCategories.map((subCategory) => (
                                    <div
                                        key={subCategory._id}
                                        className="flex items-center mb-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`subCategory-${subCategory._id}`}
                                            checked={selectedSubCategories.some(
                                                (item) =>
                                                    item._id ===
                                                    subCategory._id,
                                            )}
                                            onChange={(event) =>
                                                handleCheckboxChange1(
                                                    event,
                                                    subCategory,
                                                )
                                            }
                                            className="mr-2"
                                        />
                                        <label
                                            htmlFor={`subCategory-${subCategory._id}`}
                                            className="text-gray-800"
                                        >
                                            {subCategory.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <h3 className="text-gray-700 font-semibold">
                                    Selected Subcategories:
                                </h3>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedSubCategories.map(
                                        (subCategory) => (
                                            <div
                                                key={subCategory._id}
                                                className="bg-blue-200 px-3 py-1 rounded-full flex items-center"
                                            >
                                                {subCategory.name}
                                                <button
                                                    onClick={() =>
                                                        setSelectedSubCategories(
                                                            selectedSubCategories.filter(
                                                                (item) =>
                                                                    item._id !==
                                                                    subCategory._id,
                                                            ),
                                                        )
                                                    }
                                                    className="ml-2 text-red-600 font-bold"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* //IDEA: colors selection */}
                        <div className="grid grid-cols-2 gap-4 ">
                            <div>
                                <label className="block mt-6 text-lg font-medium text-zinc-600">
                                    Select Colours:{' '}
                                </label>
                            </div>
                            <div className="mt-5 font-custom">
                                <button
                                    onClick={(e) => togglePopup(e)}
                                    className="px-4 py-2 text-white bg-blue-900 rounded-full hover:bg-blue-700"
                                >
                                    Add Colours
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setClearSelectedPopUp(
                                            !clearSelectedPopUp,
                                        );
                                    }}
                                    className="px-4 py-2 ml-2 text-white bg-red-700 rounded-full hover:bg-red-800"
                                >
                                    Clear Selection
                                </button>
                            </div>

                            <div>
                                {/* Color cards and remove functionality */}
                            </div>
                        </div>
                        <div className="mb-4">
                            {selectedColors.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {selectedColorObjects.map((color) => (
                                        <div className="flex flex-col w-32 h-32 bg-gray-100 rounded shadow ">
                                            <div
                                                key={color.value}
                                                className="relative flex flex-row w-full h-full "
                                                style={{
                                                    backgroundColor: chroma(
                                                        color.color,
                                                    )
                                                        .alpha(1)
                                                        .css(),
                                                }}
                                            >
                                                {/* <div
                          className="w-10 h-6"
                          style={{
                            backgroundColor: chroma(color).alpha(1).css(),
                          }}
                        ></div> */}
                                                <button
                                                    className="absolute top-0 text-white cursor-pointer right-1"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        removeSelectedColors(
                                                            color,
                                                        );
                                                    }}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                            <div className="mt-1 text-center text-zinc-400">
                                                {color.color}
                                            </div>
                                            <div className="text-center text-zinc-400">
                                                {color.ncsCode}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex mt-10">
                            {selectedFile && (
                                <img
                                    // src={URL.createObjectURL(selectedFile)}
                                    src={
                                        selectedFile.slice(0, 5) === 'brand'
                                            ? `${IMAGE_URL}${selectedFile}`
                                            : URL?.createObjectURL(selectedFile)
                                    }
                                    alt={selectedFile}
                                    className="mt-2"
                                    style={{
                                        maxWidth: '150px',
                                        maxHeight: '150px',
                                    }}
                                />
                            )}
                            <label
                                htmlFor="profile-picture"
                                className="cursor-pointer px-3 py-2 focus:outline-none mt-3 ml-3 text-blue-600"
                            >
                                Upload Image
                                {/* {selectedFile.slice(0, 5)} */}
                            </label>
                            <input
                                id="profile-picture"
                                name="profile-picture"
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={handleCloseEditPopup}
                                className="hover:bg-red-600 bg-red-700 text-white px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleEditBrand}
                                disabled={
                                    !brandName.trim() ||
                                    !selectedCategory ||
                                    !selectedSubCategories
                                }
                                className={`px-5 py-2 rounded-md mr-2 text-white ${
                                    !brandName.trim() ||
                                    !selectedCategory ||
                                    !selectedSubCategories
                                        ? 'bg-blue-300 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-700'
                                }`}
                            >
                                {loading ? 'Editing...' : 'Edit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showPopup && (
                <div className="">
                    <div className="">
                        <h2 className="text-xl font-bold mb-10 text-gray-700">
                            Add Brand
                        </h2>
                        <input
                            type="text"
                            value={brandName}
                            onChange={handleInputChange}
                            onKeyDown={(e) => setUpdateOnEnter(e)}
                            placeholder="Enter Brand Name   "
                            className="border border-gray-500 p-2 rounded-md w-[60%] mb-5 text-gray-800 bg-gray-200 outline-none"
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                            className="border border-gray-500 p-2 rounded-md w-[60%] mb-3 text-gray-800 bg-gray-200 outline-none"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option
                                    key={category._id}
                                    value={category._id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {/* //IDEA: sub categories code */}
                        <div>
                            <div className="mt-3">
                                <h3 className="text-gray-700 font-semibold mb-3">
                                    Select Subcategories:
                                </h3>
                                {subCategories.map((subCategory) => (
                                    <div
                                        key={subCategory._id}
                                        className="flex items-center mb-2"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`subCategory-${subCategory._id}`}
                                            checked={selectedSubCategories.includes(
                                                subCategory._id,
                                            )}
                                            onChange={(event) =>
                                                handleCheckboxChange1(
                                                    event,
                                                    subCategory._id,
                                                )
                                            }
                                            className="mr-2"
                                        />
                                        <label
                                            htmlFor={`subCategory-${subCategory.id}`}
                                            className="text-gray-800"
                                        >
                                            {subCategory.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <h3 className="text-gray-700 font-semibold">
                                    Selected Subcategories:
                                </h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedSubCategories.map(
                                        (subCategoryId) => {
                                            const subCategory =
                                                subCategories.find(
                                                    (sub) =>
                                                        sub._id ===
                                                        subCategoryId,
                                                );

                                            return (
                                                <div
                                                    key={subCategoryId}
                                                    className="bg-blue-200 px-3 py-1 rounded-full flex items-center"
                                                >
                                                    {subCategory?.name}
                                                    <button
                                                        onnClick={() =>
                                                            setSelectedSubCategories(
                                                                selectedSubCategories.filter(
                                                                    (id) =>
                                                                        id !==
                                                                        subCategoryId,
                                                                ),
                                                            )
                                                        }
                                                        className="ml-2 text-red-600 font-bold"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* //IDEA: colors selection */}
                        <div className="grid grid-cols-2 gap-4 ">
                            <div>
                                <label className="block mt-6 text-lg font-medium text-zinc-600">
                                    Select Colours:{' '}
                                </label>
                            </div>
                            <div className="mt-5 font-custom">
                                <button
                                    onClick={(e) => togglePopup(e)}
                                    className="px-4 py-2 text-white bg-blue-900 rounded-full hover:bg-blue-700"
                                >
                                    Add Colours
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setClearSelectedPopUp(
                                            !clearSelectedPopUp,
                                        );
                                    }}
                                    className="px-4 py-2 ml-2 text-white bg-red-700 rounded-full hover:bg-red-800"
                                >
                                    Clear Selection
                                </button>
                            </div>

                            <div>
                                {/* Color cards and remove functionality */}
                            </div>
                        </div>
                        <div className="mb-4">
                            {selectedColors.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {selectedColorObjects.map((color) => (
                                        <div className="flex flex-col w-32 h-32 bg-gray-100 rounded shadow ">
                                            <div
                                                key={color.value}
                                                className="relative flex flex-row w-full h-full "
                                                style={{
                                                    backgroundColor: chroma(
                                                        color.color,
                                                    )
                                                        .alpha(1)
                                                        .css(),
                                                }}
                                            >
                                                {/* <div
                          className="w-10 h-6"
                          style={{
                            backgroundColor: chroma(color).alpha(1).css(),
                          }}
                        ></div> */}
                                                <button
                                                    className="absolute top-0 text-white cursor-pointer right-1"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        removeSelectedColors(
                                                            color,
                                                        );
                                                    }}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                            <div className="mt-1 text-center text-zinc-400">
                                                {color.color}
                                            </div>
                                            <div className="text-center text-zinc-400">
                                                {color.ncsCode}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex mt-8">
                            {selectedFile && (
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="Preview"
                                    className="mt-2"
                                    style={{
                                        maxWidth: '150px',
                                        maxHeight: '150px',
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
                        <div className="mt-10 flex justify-end gap-4">
                            <button
                                onClick={handleClosePopup}
                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={
                                    !brandName.trim() ||
                                    !selectedCategory ||
                                    !selectedSubCategories
                                }
                                className={`px-5 py-2 rounded-md mr-2 text-white ${
                                    !brandName.trim() ||
                                    !selectedCategory ||
                                    !selectedSubCategories
                                        ? 'bg-blue-300 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-700'
                                }`}
                            >
                                {loading ? 'Adding...' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Brand;
