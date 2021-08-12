import { useState } from "react"

const Collapse = ({component,buttonClassName, buttonComponent, headerButtonStyles}) => {
    const [isOpen,setIsOpen] = useState(false);
    return (
    <div className="collapse">
        <div className="collapse-header">
            <div className={isOpen ? `${buttonClassName} ${buttonClassName}-lightened` : `${buttonClassName}`} onClick={() => setIsOpen(!isOpen)}>
                {buttonComponent}
            </div>
        </div>
        <div className={isOpen ? "collapse-body" : "collapse-body close"}>
            {component}
        </div>
    </div>
    )
}


export default Collapse