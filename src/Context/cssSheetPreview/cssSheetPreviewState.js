import { useState } from "react";
import { cssSheetPreview } from "../contexts";

const CssSheetPreviewState = (props) => {


    const [cssSheet, setCssSheet] = useState("");


    return (
        <cssSheetPreview.Provider value={{ cssSheet, setCssSheet }}>
            {props.children}
        </cssSheetPreview.Provider>
    )
}


export default CssSheetPreviewState;
