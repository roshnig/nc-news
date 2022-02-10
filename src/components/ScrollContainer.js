const ScrollContainer = (props) => {
    return (
        <div className="scroll-bg">
            <div className="scroll-div">
                {props.children}
            </div>
        </div>
    )
}

export default ScrollContainer;