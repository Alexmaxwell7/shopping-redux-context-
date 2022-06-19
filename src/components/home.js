import React, { useEffect } from "react";
import { Layout, Card, Row, Col,Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getitems } from "../redux/actions/actions";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartState } from "../context/context";
const { Content } = Layout;
const { Meta } = Card;

const Home = () => {
  const navigate = useNavigate();
  //get context  data
  const {
    state: { cart },
    dispatchcart
  } = CartState();
  console.log("cart",cart);
  //get redux state values
  const items = useSelector((state) => state.allitems.items);
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await axios
      .get('https://fakestoreapi.com/products')
      .catch((err) => {
        console.log("Err: ", err);
      });
      //dispatch redux
    dispatch(getitems(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log("items", items);
  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
          <Row gutter={20} style={{marginTop:'1%',padding:'5px'}}>
            <Col md={22}>
              <h1>Shopping</h1>
            </Col>
            <Col md={2}>
            <Button type="primary"  onClick={()=>navigate('/cart', { replace: true })}>
            <FontAwesomeIcon
            icon={faShoppingCart}
            style={{ fontSize: 15, }}
          /> &nbsp;  {cart.length}
                  </Button>
            </Col>

          </Row>
       
        <div className="site-layout-content" >
          <Row gutter={16}>
              {items.map((item)=>(
                <Col xs={24} sm={24} md={8} lg={6} key={item.id} >
                    <Card
                  hoverable
                  style={{width:'300px',margin:'5px',textAlign:'center'}}
                  cover={
                    <Link to={`/selecteditem/${item.id}`}>
                       <img
                      alt="example"
                      src={item.image}
                      style={{width:'293px',height:'162px'}}
                    />
                    </Link>
                   
                  }
                >   
                    <div style={{width:'270px',height:"60px"}}>
                    <Link to={`/selecteditem/${item.id}`}>
                        <p>{item.title}</p>
                        </Link>
                    </div>
                  <Meta
                    title={<Row gutter={20} justify="center" style={{marginTop:"10px"}}>
                      
                      <Col xs={24} sm={24} md={12}>
                      <span>Rate:{item.rating.rate}</span>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                      <span>Count:{item.rating.count}</span>
                      </Col>
                     
                    </Row>}
                    description={<Row gutter={20}>
                    <Col xs={24} sm={24} md={12}>
                      {cart.some((p) => p.id === item.id) ?(
                       <Button type="danger"
                       onClick={() =>
                        dispatchcart({
                          type: "REMOVE_FROM_CART",
                          payload: item,
                        })
                      }
                       >
                       Remove Cart
                     </Button> 
                      )
                      :
                      (
                        <Button type="primary"
                        onClick={() =>
                          dispatchcart({
                            type: "ADD_TO_CART",
                            payload: item,
                          })
                        }
                        >
                       Add Cart
                     </Button> 
                      )
                      }
                    
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                    <Button style={{backgroundColor:'#28a745',color:'white'}}>
                    <span>price: {item.price}</span>
                  </Button>
                      </Col>
                   </Row>}
                  />
                </Card>
              </Col>
              ))}
          
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
