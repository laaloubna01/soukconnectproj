package Ecom.ModelDTO;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class OrderItemDTO {

	    private int productId;
    	private String productName;
	    private int quantity;
	    private BigDecimal price;
	    private String imageUrl;
	    
}
