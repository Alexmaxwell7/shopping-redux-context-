import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Card, Row, Col, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { CartState } from "../context/context";
const {  Content } = Layout;
const Cart = () => {
  const navigate = useNavigate();
  const {
    state: { cart },
    dispatchcart,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce(
        (total, currentValue) => (total = total + currentValue.price),
        0
      )
    );
  }, [cart]);
  console.log("item", cart);
  console.log("total", total);
  return (
    <Layout className="layout">
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <h1>Cart Details</h1>
          </Breadcrumb.Item>
        </Breadcrumb>
        {cart.length === 0 ? (
          <div>....No Item Added</div>
        ) : (
          <Row gutter={10}>
            <Col xs={24} sm={24} md={18}>
              {cart.map((item) => (
                <Card hoverable style={{ marginBottom: "1%" }}>
                  <Row gutter={10}>
                    <Col xs={24} md={8} lg={6}>
                      <div className="product-details-box__left pdbl">
                        <figure>
                          <img
                            style={{ width: "30%" }}
                            src={item.image}
                            alt=""
                          />
                        </figure>
                      </div>
                    </Col>
                    <Col xs={24} md={8} lg={8}>
                      <p>
                        <span>
                          <strong>Title:</strong>
                        </span>
                        <span>{item.title}</span>
                      </p>
                      <p>
                        <span>
                          <strong>Description:</strong>
                        </span>
                        {item.description}
                      </p>
                    </Col>
                    <Col xs={24} md={8} lg={8}>
                      <Space size="middle">
                        <Button
                          type="danger"
                          onClick={() =>
                            dispatchcart({
                              type: "REMOVE_FROM_CART",
                              payload: item,
                            })
                          }
                        >
                          Remove Cart
                        </Button>
                        <Button
                          onClick={() => navigate("/", { replace: true })}
                          style={{ backgroundColor: "#28a745", color: "white" }}
                        >
                          Shopping
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Col>

            <Col xs={24} sm={24} md={6}>
              <Card
                hoverable
                title="Total Items Details"
                extra={
                  <Button
                    onClick={() => navigate("/", { replace: true })}
                    style={{ backgroundColor: "#17a2b8", color: "white" }}
                  >
                    Place to Order
                  </Button>
                }
              >
                <p>
                  <strong>Total Items:</strong>
                  <span>{cart.length}</span>
                </p>
                <p>
                  <strong>Total Amount:</strong>
                  <span>{total}</span>
                </p>
              </Card>
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default Cart;
