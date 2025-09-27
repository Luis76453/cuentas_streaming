package com.lzconsorcio2.test2.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseRequestDTO {
    private Integer user_id;
    private Double total;
    private List<CartItemDTO> items;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CartItemDTO {
        private Integer cuenta_id;
        private Integer quantity;
        private Double precio_unitario;
        
        // Campos adicionales que podrían venir del frontend
        private String plan;
        private String servicio;
        private String calidad;
    }
}