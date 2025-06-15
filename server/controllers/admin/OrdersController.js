import Order from "../../models/Order.js";

export const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log("ERROR IN getAllOrdersByUse - OrderController.js: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log("ERROR IN getOrderDetails - OrderController.js: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const UpdateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    // console.log(id);

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Order status is updated successfuly!",
    });
  } catch (error) {
    console.log("ERROR IN updateOrderStatus - OrderController.js: ", error);
    res.status(500).json({
      success: false,
      message: `Some error occured: ${error.message}`,
    });
  }
};
