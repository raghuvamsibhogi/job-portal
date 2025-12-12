import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea";
import { Select,  SelectContent,  SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
function CommonForm({formControls,formData,setFormData,onSubmit,buttonText,disabled}){
    console.log(formData)
    function renderInputsByComponentTyep(getcontrolItem){
         let element=null
         const value = formData[getcontrolItem.name]||''
         switch(getcontrolItem.componentType){
            case 'input':
                element = <Input 
                                    id={getcontrolItem.name} 
                                    name={getcontrolItem.name} 
                                    placeholder={getcontrolItem.placeholder} 
                                    type={getcontrolItem.type}
                                    value={value}
                                    onChange={event=>setFormData({
                                        ...formData,
                                        [getcontrolItem.name] : event.target.value
                                    }

                                    )
                                    }
                         />
                break;
            case 'textarea':
               element =    <Textarea
                                     id={getcontrolItem.name} 
                                    name={getcontrolItem.name} 
                                    placeholder={getcontrolItem.placeholder} 
                                    type={getcontrolItem.type}
                                    value={value}
                                    onChange={event=>setFormData({
                                        ...formData,
                                        [getcontrolItem.name] : event.target.value
                                    }

                                    )
                                    }
                   />
                   break;
            case 'select':
               element =    <Select onValueChange={(value)=>setFormData({
                    ...formData,
                    [getcontrolItem.name] : value
                   })} value={value}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getcontrolItem.placeholder} />
                            <SelectContent>
                                {
                                    getcontrolItem.options && getcontrolItem.options.length>0 ? getcontrolItem.options.map(optionItem=><SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>):null
                                }
                            </SelectContent>
                        </SelectTrigger>           
                   </Select>
                   break;       
            default:
                element = <Input 
                                    id={getcontrolItem.name} 
                                    name={getcontrolItem.name} 
                                    placeholder={getcontrolItem.placeholder} 
                                    type={getcontrolItem.type}
                                    value={value}
                                    onChange={event=>setFormData({
                                        ...formData,
                                        [getcontrolItem.name] : event.target.value
                                    }

                                    )
                                    }
                         />
                break;    
         }
         return element;
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col grap-3">
                    {
                      formControls.map(controlItem=><div className="grid w-full gap-1.5" key={controlItem.name}>
                        <Label className="mb-1">{controlItem.lable}</Label>
                        {
                            renderInputsByComponentTyep(controlItem)
                        }
                        </div>)
                    }
                </div>
                <Button type="submit" disabled={disabled} className="mt-2 w-full">{buttonText || 'Submit'}</Button>
            </form>
        </div>
    )
}
export default CommonForm