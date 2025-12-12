import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import accountImage from "../../assets/account.jpg"
import { TabsContent } from "@radix-ui/react-tabs"
import Orders from "@/components/shop-components/orders"
import Address from "@/components/shop-components/address"
import ShoppingOrders from "@/components/shop-components/orders"
function ShopAccounts(){
    return(
        <div className="flex flex-col">
            <div className="relative h-[300px] w-full overflow-hidden">
                <img
                src={accountImage}
                className="w-full h-full object-cover object-center"
                />

            </div>
            <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
                <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
                    <Tabs defaultValue="orders">
                        <TabsList>
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                            <TabsTrigger value="address">Addresses</TabsTrigger>
                        </TabsList>
                        <TabsContent value="orders">
                            <ShoppingOrders/>
                        </TabsContent>
                         <TabsContent value="address">
                            <Address/>
                        </TabsContent>
                    </Tabs>

                </div>

            </div>
        </div>
    )
}
export default ShopAccounts