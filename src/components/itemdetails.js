import React, { useEffect } from "react";
import axios from "axios";
import { Layout, Breadcrumb, Card, Row, Col,Button, Divider } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { itemdetails } from "../redux/actions/actions";
import {useNavigate} from "react-router-dom";
import { CartState } from "../context/context";
const {Content } = Layout;
const ItemDetails = () => {
  //context data
  const {
    state: { cart },
    dispatchcart
  } = CartState();
  console.log("cart",cart);
  //params id for product
  const { id } = useParams();
  const navigate = useNavigate();
  //redux data
  const item = useSelector((state) => state.selecteditem.items);
  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(itemdetails(response.data));
  };

  useEffect(() => {
    fetchProductDetail(id);
  }, [id]);
  console.log("selecteditem", item);
  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item><h1>Item Details <span><strong>Cart Items:{cart.length}</strong></span></h1></Breadcrumb.Item>
        </Breadcrumb>
          <Card hoverable>
            {item.length===0 ? (
              <div>....Loading</div>
            ):
            <Row gutter={16}>
              <Col xs={24} lg={12}>
                <div className="product-details-box__left pdbl">
                  <figure>
                    <img
                      style={{ width: "70%" }}
                      src={item.image}
                      alt=""
                    />
                  </figure>
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <Row gutter={10} style={{marginTop:'50px'}}>
                  <Col xs={24} sm={24} md={24}>
                     <span><strong>{item.title}</strong></span>
                  </Col><Divider/>
                  <Col xs={24} md={24}>
                  <Button type="primary">
                    <span>{item.price}</span>
                  </Button>
                  </Col>
                  <Row gutter={20} style={{marginTop:"4%"}}>
                  <Col xs={24} md={8}>
                    <p><strong>Category</strong></p>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <p>{item.category}</p>
                  </Col>
                  <Col xs={24} md={8}>
                    <p><strong>Description</strong></p>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <p>{item.description}</p>
                  </Col>
                  <Col xs={24} md={8}>
                    <p><strong>Rating</strong></p>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <p>{item.rating.rate}</p>
                  </Col>
                  <Col xs={24} md={8}>
                    <p><strong>Count</strong></p>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <p>{item.rating.count}</p>
                  </Col>
                  </Row>
                  <Divider/>
                  <Col xs={24} md={8}>
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
                  <Col xs={24} md={8}>
                  <Button  style={{backgroundColor:'#17a2b8',color:'white'}} onClick={()=>navigate('/cart', { replace: true })}>
                   Check Out
                  </Button>
                  </Col>
                  <Col xs={24} md={8}>
                  <Button  onClick={()=>navigate('/', { replace: true })} style={{backgroundColor:"#28a745",color:"white"}}>
                    Shopping
                  </Button>
                  </Col>
                </Row>
              </Col><Divider/>
              <Col xs={24} sm={24} md={24} style={{textAlign:'center'}}>
                <p>REVIEWS</p>
              </Col><Divider/>
            </Row>

          }    
          </Card>
      </Content>
    </Layout>
  );
};

export default ItemDetails;
