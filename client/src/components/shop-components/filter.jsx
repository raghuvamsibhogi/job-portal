import { filterOptions } from "@/config"
import { Checkbox } from "../ui/checkbox"
import { Fragment } from "react"
import { Separator } from "../ui/separator"

function ProductFilter({filters,handleFilters}){
    return (
    <div className="bg-background rounded-lg shadow-sm">
        <div className="p-4 border-b">
           <h2 className="text-lg font-extrabold">Filters</h2>
        </div>
        <div>
            {Object.keys(filterOptions).map((keyItem)=>
             (
             <Fragment key={keyItem}>
             <div>
                <h3 className="text-base font-bold">
                 {keyItem}
                </h3>
                <div className="grid gap-2 mt-2">
                    {
                        filterOptions[keyItem].map(option=>
                            <label className="flex items-center gap-2 font-normal" key={option.id}>
                                <Checkbox checked={(filters && Object.keys(filters).length > 0 && filters[keyItem] && filters[keyItem].indexOf(option.id)!==-1)?true:false} onCheckedChange={()=>handleFilters(keyItem,option.id)}/> {option.label}
                            </label>
                        )
                    }

                </div>
             </div>
             <Separator />
             </Fragment>
             )
            )}
        </div>

    </div>
    )
}
export default ProductFilter