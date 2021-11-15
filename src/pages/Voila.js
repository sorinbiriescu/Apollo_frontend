import React from "react";

export default function Voila() {
    let iframe_doc = document.createElement("iframe");
    iframe_doc.src = `http://localhost:3000/voila`;
    iframe_doc.id = "iframe";
    iframe_doc.style.position = "absolute";
    iframe_doc.style.width = "100%";
    iframe_doc.style.height = "100%";
    iframe_doc.style.top = "52px";
    iframe_doc.style.border = "none";
    document.body.prepend(iframe_doc);
    // document.body.style.overflow = "hidden";

    return (<iframe_doc/>)
}