import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useToast } from "@/hooks/use-toast";

function UserCartContent({ handleCartProductItemDelete, handleUpdateProductQuantity, cartItem }) {
    const {toast} = useToast()
    function handleUpdateProductItemQuantity(previousCartItem, operation_type) {
        
        let quantity = previousCartItem.quantity;
          if(operation_type !== 'minus'){
            if(quantity+1>previousCartItem.totalStock){
                console.log('innnnnnnnnnnnnnnn')
                toast({
                    title:`Only ${previousCartItem.totalStock} quantity can be available for product ${previousCartItem.title}`
                })
                return true
            }
          }
        if (operation_type === "minus") {
            quantity = quantity - 1;
        } else {
            quantity = quantity + 1;
        }

        if (quantity === 0) {
            handleCartProductItemDelete(previousCartItem.productId);
        } else {
            handleUpdateProductQuantity(previousCartItem.productId, quantity);
        }
    }
console.log(cartItem,'cartContent')
    return (
        <div className="flex items-center space-x-4">
            <img
                src={cartItem.imageUrl}
                alt={cartItem.title}
                className="w-20 h-20 rounded object-cover"
            />

            <div className="flex-1">
                <h3 className="font-bold">{cartItem.title}</h3>

                <div className="flex items-center gap-2 mt-1">
                    
                    {/* Minus */}
                    <Button
                        variant="outline"
                        className="h-8 w-8 rounded-full"
                        size="icon"
                        onClick={() => handleUpdateProductItemQuantity(cartItem, "minus")}
                        disabled={cartItem.quantity===1}
                    >
                        <Minus className="w-4 h-4" />
                    </Button>

                    <span className="font-semibold">{cartItem.quantity}</span>

                    {/* Plus */}
                    <Button
                        variant="outline"
                        className="h-8 w-8 rounded-full"
                        size="icon"
                        onClick={() => handleUpdateProductItemQuantity(cartItem, "plus")}
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    ₹{((cartItem.salesPrice ? cartItem.salesPrice : cartItem.price) * cartItem.quantity).toFixed(2)}
                </p>

                <Trash
                    onClick={() => handleCartProductItemDelete(cartItem.productId)}
                    className="cursor-pointer mt-1"
                    size={20}
                />
            </div>
        </div>
    );
}

export default UserCartContent;
