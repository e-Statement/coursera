import { useState } from "react"

const Accordion = ({component,buttonClassName, buttonComponent, headerButtonStyles}) => {
    const [isOpen,setIsOpen] = useState(false);
    return (
    <div className="collapse">
        <div className="collapse-header">
            <div style={headerButtonStyles} className={isOpen ? `${buttonClassName} ${buttonClassName}-lightened` : `${buttonClassName}`} 
            onClick={() => {
                if (!buttonClassName.includes("disabled"))
                    setIsOpen(!isOpen)
            }}>
                {buttonComponent}
            </div>
        </div>
        <div className={isOpen ? "collapse-body" : "collapse-body close"}>
            {component}
        </div>
    </div>
    )
}

export default Accordion;