export const CategoryBadge = ({category}) => {
    if (!category) return null; //if category is not provided, we return null to avoid rendering an empty badge
    return (
        <span 
            className="category-badge"
            style={{
                backgroundColor: category.color,
                color: '#fff'
            }}
        >
            {category.name}
        </span>
    )
}