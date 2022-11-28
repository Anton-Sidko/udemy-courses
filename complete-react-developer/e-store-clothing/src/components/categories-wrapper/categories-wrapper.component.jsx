import CategoryItem from '../category-item/category-item.component';
import './categories.styles.scss';

const categories = [
  {
    id: 1,
    title: 'hats',
    imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
  },
  {
    id: 2,
    title: 'jackets',
    imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
  },
  {
    id: 3,
    title: 'sneakers',
    imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
  },
  {
    id: 4,
    title: 'womens',
    imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
  },
  {
    id: 5,
    title: 'mens',
    imageUrl:
      'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

const CategoriesWrapper = () => {
  return (
    <div className="categories-container">
      {categories.map(category => (
        <CategoryItem
          key={category.id}
          category={category}
        />
      ))}
    </div>
  );
};

export default CategoriesWrapper;
