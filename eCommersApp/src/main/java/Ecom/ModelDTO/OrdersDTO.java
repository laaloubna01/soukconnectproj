package Ecom.ModelDTO;

import java.util.List;

import lombok.Data;

@Data
public class OrdersDTO {

    private Integer orderId;
    private String status;
    private String orderDate;
    private Double orderAmount;
    private String paymentStatus;
    private List<OrderItemDTO> orderItems;

}
