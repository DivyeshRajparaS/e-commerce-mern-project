import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [range, setRange] = useState(0);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
      console.log(category);
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t dark:border-gray-500'>
        {/* Filter Options */}
        <div className='min-w-60'>
          <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 dark:text-gray-300'>FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>
          {/* Category Filter */}
          <div className={`border border-gray-300 dark:border-gray-500 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium dark:text-white'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2 dark:text-gray-300'>
                <input className='w-3' type="checkbox" value={'Mobile'} onChange={toggleCategory} /> Mobile
              </p>
              <p className='flex gap-2 dark:text-gray-300'>
                <input className='w-3' type="checkbox" value={'Leptop'} onChange={toggleCategory} /> Leptop
              </p>
              <p className='flex gap-2 dark:text-gray-300'>
                <input className='w-3' type="checkbox" value={'Accessroies'} onChange={toggleCategory} /> Accessroies
              </p>
            </div>
          </div>
          {/* SubCategory Filter */}
          <div className={`border border-gray-300 dark:border-gray-500 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium dark:text-white'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2 dark:text-gray-300'>
                <input className='w-3' type="checkbox" value={'<10000'} onChange={toggleSubCategory} /> &lt;10000
              </p>
              <p className='flex gap-2 dark:text-gray-300'>
                <input className='w-3' type="checkbox" value={'10000-20000'} onChange={toggleSubCategory} /> 10000-20000
              </p>
              <p className='flex gap-2 dark:text-gray-300'>
                <input className='w-3' type="checkbox" value={'20000-30000'} onChange={toggleSubCategory} /> 20000-30000
              </p>
              <p className='flex gap-2 dark:text-gray-300'>
                <input className='w-3' type="checkbox" value={'30000-40000'} onChange={toggleSubCategory} /> 30000-40000
              </p>
              <p className='flex gap-2 dark:text-gray-300'>
                <input className='w-3' type="checkbox" value={'40000+'} onChange={toggleSubCategory} /> 40000+
              </p>
            </div>
            {/* <div>
              <input type="range" min='0' value={range} max='200' onChange={(e) => setRange(e.target.value)} />
              <p>{range}</p>
            </div> */}
          </div>
        </div>

        {/* Right Side */}
        <div className='flex-1'>
          <div className='flex flex-wrap justify-between text-base sm:text-2xl mb-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            {/* Porduct Sort */}
            <select onChange={(e) => setSortType(e.target.value)} className='border-2 h-11 border-gray-300 text-sm px-2'>
              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          {/* Map Products */}
          {
            products.length === 0
              ?
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6 animate-pulse">
                <div>
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-2 h-6 bg-gray-200 rounded"></div>
                </div>
                <div>
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-2 h-6 bg-gray-200 rounded"></div>
                </div>
                <div>
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-2 h-6 bg-gray-200 rounded"></div>
                </div>
                <div>
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-2 h-6 bg-gray-200 rounded"></div>
                </div>
                <div>
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="mt-2 h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="mt-2 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
              :
              <div className='w-auto h-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 overflow-auto'>
                {
                  filterProducts.map((item, index) => (
                    <>
                      <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                      <div className='md:hidden max-sm:h-[2px] max-sm:w-full max-sm:bg-gray-400'></div>
                    </>
                  ))
                }
              </div>
          }
        </div>
      </div>
    </>
  )
}

export default Collection
