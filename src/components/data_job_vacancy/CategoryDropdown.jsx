import React from 'react';

const CategoryDropdown = ({category}) => {
    return (
        <option value={category.id_category}>{category.category}</option>
    )
}

export default CategoryDropdown