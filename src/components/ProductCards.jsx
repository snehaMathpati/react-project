import { useEffect, useState } from "react";
import { PRODUCT_API } from "../constant/apiConstant";
import axios from "axios";
import "../css/ProductCards.css";
import { Link } from "react-router-dom";

const ProductCards = () => {
  const imageSize = { width: "150px", height: "150px" };
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setOnFocused] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(PRODUCT_API);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error(`Error in fetching product list`, error);
    }
  };

  const handleSearch = (searchText) => {
    setOnFocused(true);
    const normalizedSearchText = searchText.toLowerCase();
    setSearchText(normalizedSearchText);

    const filteredData = products.filter((product) =>
      product.title.toLowerCase().includes(normalizedSearchText)
    );
    setFilteredProducts(filteredData);

    const suggestedData = products.filter((product) =>
      product.title.toLowerCase().startsWith(normalizedSearchText)
    );
    console.log(suggestedData, "suggestedData");
    setSuggestions(suggestedData.slice(0, 5));
  };

  const handleSuggestionClick = (productTitle) => {
    setSearchText(productTitle);
    handleSearch(productTitle);
  };

  const handleToggle = () => {
    setOnFocused(true);
  };

  const handleToggleBlur = () => {
    setOnFocused(false);
  };

  return (
    <div onClick={handleToggleBlur} style={{ textAlign: "center" }}>
      <input
        type="text"
        className="search-input"
        value={searchText}
        placeholder="Search Products...."
        // onChange={(e) => setSearchText(e.target.value)}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {/* <button onClick={handleSearch}>Search</button> */}
      <div className="suggestions">
        {focused &&
          suggestions.length > 0 &&
          suggestions?.map((product, index) => (
            <div
              key={index}
              style={{ border: "1px solid grey" }}
              onClick={() => handleSuggestionClick(product.title)}
              onFocus={handleToggle}
              // onBlur={}
            >
              {product.title}
            </div>
          ))}
      </div>

      <div className="cardWrapper">
        {filteredProducts.length === 0 ? (
          <h1>No Products found</h1>
        ) : (
          filteredProducts?.map((product, index) => {
            return (
              <Link
                key={index}
                to={`/product/${product.id}`}
                className="mainCard"
              >
                <div>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={imageSize}
                  />
                  <h6> {product.title} </h6>
                  <h4> {product?.price} </h4>
                  <div>
                    <span> {product?.rating.rate} </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}

        {/* {products?.map((product, index) => {
          return (
            <div key={index} className="mainCard">
              <img src={product.image} alt={product.title} style={imageSize} />
              <h6> {product.title} </h6>
              <h4> {product?.price} </h4>
              <div>
                <span> {product?.rating.rate} </span>
              </div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default ProductCards;
