import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)
  const [loader, setLoader] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setstock] = useState("");    // create a stock box
  const [category, setCategory] = useState("Mobile");
  const [subCategory, setSubCategory] = useState("<10000");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    setLoader(true);
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("stock", stock)    //  stock data
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token }, withCredentials: true })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setLoader(false);
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (price <= 10000) {
      setSubCategory("<10000");
    } else if (price > 10000 && price <= 20000) {
      setSubCategory("10000-20000");
    } else if (price > 20000 && price <= 30000) {
      setSubCategory("20000-30000");
    } else if (price > 30000 && price <= 40000) {
      setSubCategory("30000-40000");
    } else {
      setSubCategory("40000+");
    }
  }, [price]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>

        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Mobile">Mobile</option>
            <option value="Leptop">Leptop</option>
            <option value="Accessroies">Accessroies</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>category Price range</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2' disabled>
            <option value="<10000">&lt;10000</option>
            <option value="10000-20000">10000-20000</option>
            <option value="20000-30000">20000-30000</option>
            <option value="30000-40000">30000-40000</option>
            <option value="40000+">40000+</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" min="1" placeholder='₹ 0.00' />
        </div>

        {/* stock box create */}
        <div>
          <p className='mb-2'>stock</p>
          <input onChange={(e) => setstock(e.target.value)} value={stock} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='1-500' min="1" max="500" required="true" message="you can give score 1 to 500 only"></input>
        </div>

      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {
            category === "Mobile" ?
              <>
                <div onClick={() => setSizes(prev => prev.includes("64GB") ? prev.filter(item => item !== "64GB") : [...prev, "64GB"])}>
                  <p className={`${sizes.includes("64GB") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>64GB</p>
                </div>

                <div onClick={() => setSizes(prev => prev.includes("128GB") ? prev.filter(item => item !== "128GB") : [...prev, "128GB"])}>
                  <p className={`${sizes.includes("128GB") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>128GB</p>
                </div>

                <div onClick={() => setSizes(prev => prev.includes("256GB") ? prev.filter(item => item !== "256GB") : [...prev, "256GB"])}>
                  <p className={`${sizes.includes("256GB") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>256GB</p>
                </div>

                <div onClick={() => setSizes(prev => prev.includes("512GB") ? prev.filter(item => item !== "512GB") : [...prev, "512GB"])}>
                  <p className={`${sizes.includes("512GB") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>512GB</p>
                </div>

                <div onClick={() => setSizes(prev => prev.includes("1TB") ? prev.filter(item => item !== "1TB") : [...prev, "1TB"])}>
                  <p className={`${sizes.includes("1TB") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>1TB</p>
                </div>
              </>
              : category === "Leptop" ?
                <>
                  <div onClick={() => setSizes(prev => prev.includes("128GB") ? prev.filter(item => item !== "128GB") : [...prev, "128GB"])}>
                    <p className={`${sizes.includes("128GB") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>128GB</p>
                  </div>

                  <div onClick={() => setSizes(prev => prev.includes("256GB") ? prev.filter(item => item !== "256GB") : [...prev, "256GB"])}>
                    <p className={`${sizes.includes("256GB") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>256GB</p>
                  </div>

                  <div onClick={() => setSizes(prev => prev.includes("512GB") ? prev.filter(item => item !== "512GB") : [...prev, "512GB"])}>
                    <p className={`${sizes.includes("512GB") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>512GB</p>
                  </div>

                  <div onClick={() => setSizes(prev => prev.includes("1TB") ? prev.filter(item => item !== "1TB") : [...prev, "1TB"])}>
                    <p className={`${sizes.includes("1TB") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>1TB</p>
                  </div>
                </>
                : category === "Accessroies" ?
                  <>
                    <div onClick={() => setSizes(prev => prev.includes("65 Wh") ? prev.filter(item => item !== "65 Wh") : [...prev, "65 Wh"])}>
                      <p className={`${sizes.includes("65 Wh") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>65 Wh</p>
                    </div>

                    <div onClick={() => setSizes(prev => prev.includes("90 WH") ? prev.filter(item => item !== "90 WH") : [...prev, "90 WH"])}>
                      <p className={`${sizes.includes("90 WH") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>90 WH</p>
                    </div>
                  </>
                  : ''
          }
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className='w-28 py-[14px] mt-4 bg-black text-white' disabled={loader}>{
        loader ?
          <div className="flex items-center justify-center flex-row gap-2 py-1">
            <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
            <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
            <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
            <div className="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
          </div> : 'ADD'
      }
      </button>
    </form>
  )
}

export default Add;